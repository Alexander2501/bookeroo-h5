import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  state = {
    mail: "",
    password: "",
    type: 0,
    name: "",
    nickName: "",
    phoneNumber: "",
  };

  componentDidMount() {
    const url = "https://web.tootz.cn/api/open/user/register";
    axios
      .post(url, {
        mail: "1191376090@qq.com",
        password: "123",
        type: 1,
        name: "zhangsan",
        nickName: "alfa",
        phoneNumber: "12345678",
      })
      .then((res) => {
        console.log(res.data);
        // this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="signin signup">
        <div className="container">
          <div className="sign-content">
            <h2>sign up</h2>
            <div className="row">
              <div className="col-sm-12">
                <div className="signin-form">
                  <form action="signin.html">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="signin_form"
                        placeholder="enter your name here"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="signin_form"
                        placeholder="enter your email here"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="signin_form"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="signin_form"
                        placeholder="Retype Password"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row">
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
                        <label for="styled-checkbox-2">
                          accept our terms & condition
                        </label>
                      </li>

                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="signin-footer">
                  <button type="button" className="btn signin_btn">
                    sign up
                  </button>
                  <p>
                    <Link to="/login">already member ?</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
