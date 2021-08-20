import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Register extends Component {

    componentDidMount() {

    }

    handleRegister = ()=>{
     let mail = this.mail.value.toString();
     let password = this.password.value.toString();
     let name = this.name.value.toString();
     let phoneNumber = this.phoneNumber.value.toString();
      console.log(mail)

      const url = "https://web.tootz.cn/api/open/user/register";
      axios
          .post(url, {
            mail: mail,
            password:password,
            type: 1,
            name: name,
            nickName: "lisa",
            phoneNumber: phoneNumber,
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
                                                placeholder="enter your name here"
                                                ref={inputValue=>this.name=inputValue}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input type="email" className="form-control" ref={value=>this.mail=value}
                                                   placeholder="enter your email here"/>
                                        </div>
                                      <div className="form-group">
                                        <input type="email" className="form-control" ref={value=>this.phoneNumber=value}
                                               placeholder="enter your phonenumber here"/>
                                      </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                               ref={value=>this.password=value}
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                ref={value=>this.pwd=value}
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
                                                <label>
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
                                    <button type="button" className="btn signin_btn" onClick={this.handleRegister}>
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
