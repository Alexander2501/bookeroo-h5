import React, { Component } from 'react';
import axios from 'axios';

class PayCancel extends Component {
    componentDidMount() {
        let payId = this.props.location.search.split('=')[1];//?tokenId=xxx
        console.log('payId', payId);
        console.log('location Search:', this.props.location.search);
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;
        let url = 'https://web.tootz.cn/api/order/payCancel';
        axios.post(url, { payId }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <p>Paycancel</p>
            </div>
        );
    }
}

export default PayCancel
    ;