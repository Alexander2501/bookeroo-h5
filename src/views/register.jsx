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
        type: 0,
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
                    <div className="form-col">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="signin_form"
                          placeholder="first name"
                        />
                      </div>
                    </div>
                    <div className="form-col1">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="signin_form"
                          placeholder="last name"
                        />
                      </div>
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
                  <button
                    type="button"
                    className="btn signin_btn"
                    data-toggle="modal"
                    data-target=".signin_modal"
                  >
                    sign up
                  </button>
                  <p>
                    <Link to="/login">already member ?</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade signin_modal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="sign-content">
                  <div className="modal-header">
                    <h2>sign up</h2>
                  </div>

                  <div className="modal-body">
                    <div className="signin-form">
                      <div className=" ">
                        <div className=" ">
                          <form action="signin.html">
                            <div className="form-col">
                              <div className="form-group">
                                <label for="signin_form">first name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="signin_form"
                                  placeholder="UserName"
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label for="signin_form">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="signin_form"
                                placeholder="enter your email here"
                              />
                            </div>
                            <div className="form-group">
                              <label for="signin_form">password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="signin_form"
                                placeholder="Password"
                              />
                            </div>
                            <div className="form-group">
                              <label for="signin_form">retype password</label>
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

                    <div className="signin-password">
                      <div className="awesome-checkbox-list">
                        <ul className="unstyled centered">
                          <li>
                            <input
                              className="styled-checkbox"
                              id="styled-checkbox-3"
                              type="checkbox"
                              value="value3"
                            />
                            <label for="styled-checkbox-3">
                              accept our terms & condition
                            </label>
                          </li>

                          <li></li>
                        </ul>
                      </div>
                    </div>

                    <div className="signin-footer">
                      <button
                        type="button"
                        className="btn signin_btn"
                        data-toggle="modal"
                        data-target=".signin_modal"
                      >
                        sign up
                      </button>
                      <p>
                        already member ?<a href="signin.html">sign in</a>
                      </p>
                    </div>
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
