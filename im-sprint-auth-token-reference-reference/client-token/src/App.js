import React, { Component } from "react";

import Login from "./components/Login";
import Mypage from "./components/Mypage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
  }

  loginHandler(data) {
    this.setState({ isLogin: true });
    this.issueAccessToken(data.data.accessToken);
  }

  issueAccessToken(token) {
    this.setState({ accessToken: token });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className='App'>
        {isLogin ? (
          <Mypage accessToken={this.state.accessToken} issueAccessToken={this.issueAccessToken} />
        ) : (
          <Login loginHandler={this.loginHandler} />
        )}
      </div>
    );
  }
}

export default App;
