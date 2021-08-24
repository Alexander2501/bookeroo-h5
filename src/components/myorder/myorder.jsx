import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './myorder.css'
class MyOrder extends Component {
    state = {
        orderList: [{
            orderName: '',
            orderId: '1234532356',
            picUrl: '',
            price: '',
            num: '',
            status: 'complete transaction'

        }],
        orders: []
    }
    componentDidMount() {

    }
    render() {
        const { orders, orderList } = this.state;

        console.log(orders);
        if (orders.length == 0) {
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
                <div className='row'>


                    <div className='table-responsive'>
                        <table className='table'>
                            <tr>
                                <th>Goods</th>
                                <th>Price</th>
                                <th>Number</th>
                                <th>Commodity Operate</th>
                                <th>TotalPrice</th>
                                <th>Status</th>
                                <th>Trade Operation</th>
                            </tr>
                            {
                                orderList.map((item, index) => (
                                    
                                    <tr>
                                        <td>{orderList.picUrl}</td>
                                        <td>{orderList.price}</td>
                                        <td>{orderList.num}</td>
                                        <td><span>Cancel Order</span></td>
                                        <td>{orderList.totalPrice}</td>
                                        <td>{orderList.status}</td>
                                        <td><span>Add Comment</span></td>
                                    </tr>

                                ))
                            }
                        </table>
                    </div>
                </div>
            );
        }

    }
}

export default MyOrder;