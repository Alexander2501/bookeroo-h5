import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PayCancel extends Component {
    componentDidMount() {
        console.log(this.props.location);
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
            if(res.data.code='1000000'){
                alert(res.data.message);
            }else{
                alert(res.data.message);
            }
        }).catch(err => {
            alert(err);
            console.log(err);
        });
    }
    render() {
        // let routeStr = `/orders?payId=${this.state.payId}`
        return (
            <div>
                <p className='bg-danger' style={{ textAlign: 'center' }}>Paycancel</p>
                <Link to='/orders'>Leave For My Order Page ...</Link>
                {/* <img src="./assets/paysuccess.jpg" alt="" /> */}
                {/* <Link to={routeStr}>Leave For My Order Page ...</Link> */}
            </div>
        );
    }
}

export default PayCancel;