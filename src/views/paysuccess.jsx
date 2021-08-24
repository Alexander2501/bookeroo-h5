import React, { Component } from 'react';
import axios from 'axios';

class PaySuccess extends Component {

    componentDidMount() {
        let payId = this.props.location.search.split('=')[1];//?tokenId=xxx
        console.log('payId',payId);
        console.log('location Search:',this.props.location.search);
        let userId = sessionStorage.getItem("userId");
        let token = sessionStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;
        let url = 'https://web.tootz.cn/api/order/payResult';
        axios.post(url, { payId }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <div>
                <p>PaySuccess</p>
            </div>
        );
    }
}

export default PaySuccess;