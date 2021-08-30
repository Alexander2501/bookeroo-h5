import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {

    state = {
        pwd: '',
        password: ''
    }
    judgeSame = (e) => {

        this.setState({
            pwd: e.target.value
        })
    }
    judgeSame = (e) => {

        this.setState({
            password: e.target.value
        })
    }

    componentDidMount() {

    }

    handleRegister = () => {
        let mail = this.mail.value.toString();
        // let password = this.password.value.toString();
        let name = this.name.value.toString();
        let nickName = this.nickName.value.toString();
        let phoneNumber = this.phoneNumber.value.toString();
        let clientId = this.clientId.value.toString();
        let secret = this.secret.value.toString();
        if (mail == '' || name == '' || nickName == '' || phoneNumber == '') {
            alert('Fields can not be null');
            return
        }

        const url = "https://web.tootz.cn/api/open/user/register";
        axios
            .post(url, {
                mail: mail,
                password: this.state.password,
                type: 1,
                name: name,
                nickName: nickName,
                phoneNumber: phoneNumber,
                clientId: clientId,
                secret: secret
            })
            .then((res) => {
                console.log(res);
                if (res.data.code == "1000000") {
                    alert(res.data.message);
                    this.props.history.push('/login');
                } else {
                    alert(res.data.message);
                }
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
                                                ref={inputValue => this.name = inputValue}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="enter your nickname here"
                                                ref={inputValue => this.nickName = inputValue}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input type="email" className="form-control"
                                                ref={value => this.mail = value}
                                                placeholder="enter your email here" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control"
                                                ref={value => this.phoneNumber = value}
                                                placeholder="enter your phonenumber here" />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={value => this.clientId = value}
                                                placeholder="ClientId"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={value => this.secret = value}
                                                placeholder="Secret"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={this.judgeSame2}
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={this.judgeSame}
                                                placeholder="Retype Password"
                                            />
                                            <span></span>
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
                                                    accept our terms & condition
                                                </label>
                                            </li>

                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}

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
