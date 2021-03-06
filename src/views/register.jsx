import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {

    state = {
        pwd: '',
        password: '',
        abnShow: false,
        type: 1
    }
    judgeSame = (e) => {

        this.setState({
            pwd: e.target.value
        })
    }
    judgeSame2 = (e) => {

        this.setState({
            password: e.target.value
        })
    }

    selectUserType = (e) => {
        console.log(e.target.value);
        let userType = e.target.value;
        if (userType == 'business') {
            this.setState({
                type: 2,
                abnShow: true
            });
        }
        if (userType == 'customer') {
            this.setState({
                type: 1,
                abnShow: false
            });
           
        }
        // console.log(this.state.type);
    }

    handleRegister = () => {
        let mail = this.mail.value.toString();

        // let password = this.password.value.toString();
        let name = this.name.value.toString();

        let nickName = this.address.value.toString();
        let phoneNumber = this.phoneNumber.value.toString();

        let clientId = this.clientId.value.toString();
        let secret = this.secret.value.toString();

        let address = this.address.value.toString();

        let abn = this.abn.value.toString();

        if (mail == '' || name == '' || nickName == '' || phoneNumber == '' || this.state.password == '' || clientId == '' || secret == '' || address == '') {
            alert('Fields can not be null');
            return
        }

        //validate mail
        if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(mail))) {
            alert("Please input correct email format");
            return;
        }
        //validate phonenumber
        if (!(/^(61)[0-9]{9}$/.test(phoneNumber))) {
            alert("Please Enter eleven digits stating with 61.");
            return;
        }
        // console.log(this.state.password);
        // console.log(this.state.pwd);
        if (this.state.password != this.state.pwd) {
            alert('THe two passwords you typed do not match');
        }

        const url = "https://web.tootz.cn/api/open/user/register";
        axios
            .post(url, {
                mail: mail,
                password: this.state.password,
                type: this.state.type,
                name: name,
                nickName: address,
                phoneNumber: phoneNumber,
                clientId: clientId,
                secret: secret,
                abn: abn
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
        let abnShowHidden = this.state.abnShow ? 'block' : 'none';
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
                                                placeholder="Enter your name here"
                                                ref={inputValue => this.name = inputValue
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Address here"
                                                ref={inputValue => this.address = inputValue}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input type="email" className="form-control"
                                                ref={value => this.mail = value}
                                                placeholder="Enter your email here" />
                                        </div>

                                        <div className="form-group">
                                            <select  className="form-control" onChange={(e) => { this.selectUserType(e) }} style={{ padding: '0 18px', color: '#a69999' }}>
                                               
                                                <option value="customer">Customer</option>
                                                <option value="business">Business</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                ref={value => this.abn = value}
                                                placeholder="Enter your abn here"
                                                style={{ display: abnShowHidden }} />
                                        </div>

                                        <div className="form-group">
                                            <input type="number" className="form-control"
                                                ref={value => this.phoneNumber = value}
                                                placeholder="Enter your phonenumber here"
                                                style={{ padding: '0 18px', color: '#a69999' }} />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={value => this.clientId = value}
                                                placeholder="Enter your PayPal clientId"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={value => this.secret = value}
                                                placeholder="Enter your PayPal secret"
                                            />
                                        </div>

                                        {/* <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={value => this.address = value}
                                                placeholder="Enter your Address"
                                            />
                                        </div> */}

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
