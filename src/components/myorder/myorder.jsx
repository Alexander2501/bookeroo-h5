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
            status: 'complete transaction',
            orderDesc: ''

        }],
        orders: []
    }
    componentDidMount() {

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
                    <div className='panel panel-default orderheader' style={{border:'none'}}>
                        <div className='col-md-4 panel-heading'>Order Detail</div>
                        <div className='col-md-3 panel-heading'>Order Status</div>
                        <div className='col-md-3 panel-heading'>Order Control</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            
                        </div>
                    </div>


                </div>
            );
        }

    }
}

export default MyOrder;