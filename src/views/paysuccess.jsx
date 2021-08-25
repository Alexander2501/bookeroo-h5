import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PaySuccess extends Component {
    state={
        payId:''
    }

    componentDidMount() {
        let payId = this.props.location.search.split('=')[1].split('&')[0];//?tokenId=xxx
        console.log('payId', payId);
        this.setState({
            payId:payId
        });
        console.log('location Search:', this.props.location.search);
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
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
        let routeStr =`/orders/${this.state.payId}`
        return (
            <div>
                <p className='bg-success' style={{textAlign:'center'}}>PaySuccess</p>
                {/* <img src="./assets/paysuccess.jpg" alt="" /> */}
                <Link to={routeStr}>Leave For My Order Page ...</Link>
            </div>
        );
    }
}

export default PaySuccess;