import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeFullName(event) {
    this.setState({
      fullName: event.target.value,
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const registered = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("Registered:", registered);
    fetch("http://localhost:4000/api/signup", {
      method: "POST",
      body: JSON.stringify(registered),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        this.props.setIsAuthenticated(true);
        window.location = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                onChange={this.changeFullName}
                value={this.state.fullName}
                className="form-control form-group"
              />

              <input
                type="email"
                placeholder="Email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />
              <input
                type="submit"
                className="btn btn-danger btn-block"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
