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
        orders: [],
        orderListUrl: '',
        orderUrl: ''
    }
    componentDidMount() {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;
        let userType = localStorage.getItem('type');
        if (userType == 3) {//Admin
            this.state.orderListUrl = "https://web.tootz.cn/api/order/globalList";
        } else if (userType == 2) {
            this.state.orderListUrl = "https://web.tootz.cn/api/order/sellList";
        } else {
            this.state.orderListUrl = "https://web.tootz.cn/api/order/buyList";
        }
        this.getOrdlerList();
    }

    getOrdlerList = () => {
        let url = this.state.orderListUrl;
        let data = { pageSize: 10, pageNum: 1 }
        axios.post(url, data).then(res => {
            console.log(res);
            if (res.data.code == "1000000") {
                this.setState({
                    orderList: res.data.data.entity
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        const { orders, orderList } = this.state;

        if (orderList.length == 0) {
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
                                        <span style={{ fontWeight: 'bold' }}>CreateTime:{item.createTime}</span>
                                        <span style={{ marginLeft: '10px' }}>OrderId:{item.orderId}</span>
                                        <span className="pull-right text-danger" style={{ cursor: 'pointer' }} >Delete Order</span>
                                    </div>
                                </div>
                                <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='col-md-6'>
                                        <div className='col-md-3'><img src={item.picUrl} style={{ height: '100px' }} /></div>
                                        <div className='col-md-9'>
                                            BookName:<h4>{item.bookName}</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <h5>Price:{item.price}</h5>
                                                <h5> Number:{item.num}</h5><br />
                                                <h5>Total:{item.price * item.num}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        {item.orderStatus == 0 ? <h4 className='text-primary'>Waiting For Pay</h4> : ''}
                                        {item.orderStatus == 1 ? <h4 className='text-success'>Success</h4> : ''}
                                        {item.orderStatus == 2 ? <h4 className='text-danger'>Failed</h4> : ''}
                                        {item.orderStatus == 3 ? <h4 className='text-info'>Refund</h4> : ''}
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