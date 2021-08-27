import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Register from "./register";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  componentDidMount() { }

  nameChange = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };
  pwdInputChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleSubmit = () => {
    //收集数据
    // console.log(this.state.username);

    //更新状态
    // if(username!=null&&password!=null){

    // }
    const url = "https://web.tootz.cn/api/open/user/login";
    axios
      .post(url, {
        mail: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        let result = res.data.data;
        // console.log(res.data);
        if (res.data.code == '1000000') {
          localStorage.setItem("userId", result.userId);
          localStorage.setItem("token", result.token);
          localStorage.setItem("type", result.type);
          this.props.history.push("/home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {

        console.log(err);
      });
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.history.push("/api/register");
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="signin popup-in">
        <div className="container">
          <div className="sign-content popup-in-content">
            <div className="popup-in-txt">
              <h2>sign in</h2>
              <div className="row">
                <div className="col-sm-12">
                  <div className="signin-form">
                    <form action="signin.html">
                      <div className="form-group">
                        <input
                          type="text"
                          value={username}
                          className="form-control"
                          onChange={this.nameChange}
                          id="signin_form"
                          placeholder="enter your email here"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          value={password}
                          className="form-control"
                          onChange={this.pwdInputChange}
                          placeholder="Password"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-sm-12">
                  <div className="signin-password">
                    <div className="awesome-checkbox-list">
                      <ul className="unstyled centered">
                        <li>
                          <input
                            className="styled-checkbox"
                            id="styled-checkbox-2"
                            type="checkbox"
                            value="value2"
                          />
                          <label>
                            remember password
                          </label>
                        </li>

                        <li>
                          <a href="#">Forgot email or password ?</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col-sm-12">
                  <div className="signin-footer">
                    <button
                      type="button"
                      className="btn signin_btn"
                      onClick={this.handleSubmit}
                    >
                      sign in
                    </button>
                    <p>
                      Don’t have an Account ?
                      <Link to={"/register"}>Sign Up</Link>
                    </p>
                    <Route path="/register" component={Register} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
