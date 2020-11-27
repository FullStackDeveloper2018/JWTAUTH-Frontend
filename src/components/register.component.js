import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import InputMask from 'react-input-mask';
import TextField from "@material-ui/core/TextField"

import AuthService from "../services/auth.service";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vfullname = value => {
  if (value.length < 5 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 5 and 30 characters.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      fullname: "",
      username: "",
      birthday:"1996-01-15",
      phonenumber:"",
      email: "",
      password: "",
      confirmpassword:"",
      successful: false,
      signupaction: true,
      message: ""
    };
  }
  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeBirthday(e) {
    console.log(this.state.birthday)
    this.setState({
      birthday: e.target.value
    });
  }

  onChangePhonenumber(e) {
    this.setState({
      phonenumber: e.target.value
    });
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value
    });
    if(this.state.password===this.state.confirmpassword){
      this.setState({
        signupaction:false
      })
    }
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.fullname,
        this.state.username,
        this.state.birthday,
        this.state.phonenumber,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={this.state.fullname}
                    onChange={this.onChangeFullname}
                    validations={[required, vfullname]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <TextField
                   id="date"
                   type="date"
                    className="form-control"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChangeBirthday} 
                    InputLabelProps={{
                    shrink: true,
                   }}
                  />
                 </div>


                <div className="form-group">
                  <label htmlFor="phonenumber">Phonenumber</label>
                  <InputMask className = "form-control" 
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.onChangePhonenumber}
                    mask="999-999-9999" />
                </div>
                     
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmpassword">ConfirmPassword</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmpassword"
                    value={this.state.confirmpassword}
                    onChange={this.onChangeConfirmPassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" disabled={this.state.signupaction}>Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
