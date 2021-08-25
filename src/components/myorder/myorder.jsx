import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import './myorder.css'
class MyOrder extends Component {
    state = {
        orderList: [{
            orderName: '',
            orderId: '1234532356',
            picUrl: 'https://i.loli.net/2021/08/22/7r1uPlpTyMhDBk5.png',
            price: '12',
            num: '1',
            status: 'complete transaction',
            orderDesc: '',
            time: '2021-08-22'

        }, {
            orderName: '',
            orderId: '1234532356',
            picUrl: 'https://i.loli.net/2021/08/22/7r1uPlpTyMhDBk5.png',
            price: '12',
            num: '1',
            status: 'complete transaction',
            orderDesc: '',
            time: '2021-08-22'

        }],
        orders: []
    }
    componentDidMount() {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;


    }
    render() {
        const { orders, orderList } = this.state;

        console.log(orders);
        if (orders.length != 0) {
            return (
                <div className='row orderrow'>
                    <div className='col-xs-12 col-md-4'>
                        <div className='emptyImg'></div>
                    </div>
                    <div className='col-xs-12 col-md-4'>
                        <p>Your Cart is Empty,You can:</p>
                        <button className='btn btn-default'><Link to='/'>Shopping</Link></button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='panel panel-default orderheader' style={{ border: 'none' }}>
                        <div className='col-md-6 panel-heading'>Order Detail</div>
                        <div className='col-md-3 panel-heading'>Order Status</div>
                        <div className='col-md-3 panel-heading'>Order Control</div>
                    </div>
                    {
                        this.state.orderList.map((item, index) => (
                            <div key={index}>
                                <div className='panel panel-default'>
                                    <div className='col-md-12 panel-heading' style={{ backgroundColor: '#eaf8ff' }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.time}</span>
                                        <span style={{ marginLeft: '10px' }}>OrderId:{item.orderId}</span>
                                        <span className="pull-right text-danger" style={{cursor:'pointer'}} >Delete Order</span>
                                    </div>
                                </div>
                                <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='col-md-6'>
                                        <div className='col-md-3'><img src={item.picUrl} style={{ height: '100px' }} /></div>
                                        <div className='col-md-9'>{item.orderDesc}</div>
                                    </div>
                                    <div className='col-md-3'>
                                        {item.status}
                                    </div>
                                    <div className='col-md-3 ordercontrol'>
                                        <p className="bg-success">Confirm Order</p>
                                        <p className="bg-danger">Cancel Order</p>
                                        <p className="bg-primary">Add Comment</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }


                </div>
            );
        }

    }
}

export default MyOrder;