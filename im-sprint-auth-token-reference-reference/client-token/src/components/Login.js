import axios from "axios";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginRequestHandler() {
    const { userId, password } = this.state;

    axios
      .post(
        "https://localhost:4000/login",
        { userId, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then((res) => {
        this.props.loginHandler(res.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className='loginContainer'>
        <div className='inputField'>
          <div>Username</div>
          <input
            name='userId'
            onChange={(e) => this.inputHandler(e)}
            value={this.state.userId}
            type='text'
          />
        </div>
        <div className='inputField'>
          <div>Password</div>
          <input
            name='password'
            onChange={(e) => this.inputHandler(e)}
            value={this.state.password}
            type='password'
          />
        </div>
        <div className='loginBtnContainer'>
          <button onClick={this.loginRequestHandler} className='loginBtn'>
            JWT Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
