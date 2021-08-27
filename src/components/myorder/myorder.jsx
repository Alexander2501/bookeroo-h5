import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import './myorder.css'
class MyOrder extends Component {
    state = {
        tabs: ['All', 'Not Paid', 'Purchased', 'Sold'],
        currentIndex: 0,
        orderList: [
            //     {
            //     orderName: '',
            //     orderId: '1234532356',
            //     picUrl: 'https://i.loli.net/2021/08/22/7r1uPlpTyMhDBk5.png',
            //     price: '12',
            //     num: '1',
            //     status: 'complete transaction',
            //     orderDesc: '',
            //     time: '2021-08-22'

            // }, {
            //     orderName: '',
            //     orderId: '1234532356',
            //     picUrl: 'https://i.loli.net/2021/08/22/7r1uPlpTyMhDBk5.png',
            //     price: '12',
            //     num: '1',
            //     status: 'complete transaction',
            //     orderDesc: '',
            //     time: '2021-08-22'

            // }
        ],
        orders: [],
        orderListUrl: '',
        orderUrl: '',
        orderId: '',

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
        } else {
            this.state.orderListUrl = "https://web.tootz.cn/api/order/buyList";
        }
        // console.log(this.state.orderListUrl);
        this.getOrdlerList(this.state.orderListUrl);
    }


    getOrdlerList = (url) => {
        let data = { pageSize: 1000, pageNum: 1 }
        axios.post(url, data).then(res => {
            // console.log(res);
            if (res.data.code == "1000000") {
                this.setState({
                    orderList: res.data.data.entity
                })
            } else {
                alert(res.data.message);
            }
            if (res.data.code == '1000001') {
                // alert(res.data.message);
                this.props.history.push('/login');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    tabChoiced = (id) => {
        // console.log(id);
        this.setState({
            currentIndex: id
        });
        let tabStyle = id == this.state.currentIndex ? { backgroundColor: '#337ab7', padding: '5px 50px' } : {};
        this.setState({
            selStyle: tabStyle
        });
        if (id == 0) {//all
            let url = "https://web.tootz.cn/api/order/globalList";
            this.getOrdlerList(url);
        }
        if (id == 1) {//buy
            let url = 'https://web.tootz.cn/api/order/buyList';
            this.getOrdlerList(url);
        }
        if (id == 2) {//sell
            let url = 'https://web.tootz.cn/api/order/sellList';
            this.getOrdlerList(url);
        }
    }
    deleteOrder = (index) => {
        let orderId = this.state.orderList[index].orderId;
        let url = "https://web.tootz.cn/api/order/delete"
        axios.post(url, { orderId }).then(res => {
            console.log(res);
            if (res.data.code == '1000000') {
                alert(res.data.message);
                this.getOrdlerList();
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            alert(err.message);
        });
    }

    confirmOrder = (index) => {
        let orderId = this.state.orderList[index].orderId;
    }

    cancelOrder = (index) => {
        console.log(index);
        let orderId = this.state.orderList[index].orderId;
        let url = "https://web.tootz.cn/api/order/delete"
        axios.post(url, { orderId }).then(res => {
            console.log(res);
            if (res.data.code == '1000000') {
                alert(res.data.message);
            } else {
                alert(res.data.message)
            }
        }).catch(err => {
            alert(err.message);
        });
    }

    refundOrder = (index) => {
        let orderId = this.state.orderList[index].orderId;
        let url = 'https://web.tootz.cn/api/order/refund';
        console.log('refund', index);
        axios.post(url, { orderId }).then(res => {
            if (res.data.code == '1000000') {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            alert(err.message);
        });
    }

    handleAddComment = (index) => {
        let orderId = this.state.orderList[index].orderId;
        this.setState({
            orderId
        });
    }
    addComment = () => {
        // console.log(this.state.orderId);
        // console.log(this.myComment.value);
        // console.log(this.myStar.value);
        let orderId = this.state.orderId;
        let comment = this.myComment.value;
        let star = parseInt(this.myStar.value);
        let url = 'https://web.tootz.cn/api/order/comment';
        let data = { orderId, comment, star }
        axios.post(url, data).then(res => {
            console.log(res);
            if (res.data.code == "1000000") {
                alert('Successfully Added');
            } else {
                alert(res.data.message)
            }
        }).catch(err => {
            console.log(err);
        });
    }

    exportOrderList = () => {
        let url = 'https://web.tootz.cn/api/order/export';
        let data = {
            pageSize: 1000,
            pageNum: 1
        }
        axios.post(url, data, { responseType: 'arraybuffer' }).then(res => {
            console.log(res);
            let fileName = new Date().toLocaleDateString() + '-OrderList';
            if (res.status == '200') {
                this.downloadFile(res.data, fileName)

            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    /*
        *封装函数 downLoadFile.js
        *params:  
        *data:二进制文件
        *name:自定义文件名称
    */
    downloadFile = (data, name) => {
        if (!data) {
            this.$message.error('下载失败，解析数据为空！')
            return
        }
        // 创建一个新的url，此url指向新建的Blob对象
        let url = window.URL.createObjectURL(new Blob([data]))
        // 创建a标签，并隐藏改a标签
        let link = document.createElement('a')
        link.style.display = 'none'
        // a标签的href属性指定下载链接
        link.href = url
        //setAttribute() 方法添加指定的属性，并为其赋指定的值。
        link.setAttribute('download', name + '.csv')
        document.body.appendChild(link)
        link.click()
    }


    render() {
        const { orders, orderList } = this.state;
        let delShow = this.state.currentIndex == 2 || this.state.currentIndex == 0 ? { display: 'none' } : { display: 'block' };
        let tabShow = localStorage.getItem('type') == 3 ? { display: 'block', cursor: 'pointer' } : { display: 'none' }
        if (orderList.length == 0) {
            return (

                <div className='row orderrow'>
                    <div className='row'>
                        <ul style={{ display: 'flex', justifyContent: 'space-evenly' }} className="list-group">
                            <li style={tabShow} onClick={() => { this.tabChoiced(0) }} className="list-group-item">All</li>
                            <li onClick={() => { this.tabChoiced(1) }} className="list-group-item" style={{ cursor: 'pointer' }}>Buy</li>
                            <li onClick={() => { this.tabChoiced(2) }} className="list-group-item" style={{ cursor: 'pointer' }}>Sold</li>
                        </ul>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12 col-md-4'>
                            <div className='emptyImg'></div>
                        </div>
                        <div className='col-xs-12 col-md-4'>
                            <p>Your Cart is Empty,You can:</p>
                            <button className='btn btn-default'><Link to='/booklist'>Shopping</Link></button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'space-evenly' }} className="list-group">
                        <li style={tabShow} onClick={() => { this.tabChoiced(0) }} className="list-group-item">All</li>
                        <li onClick={() => { this.tabChoiced(1) }} className="list-group-item" style={{ cursor: 'pointer' }}>Buy</li>
                        <li onClick={() => { this.tabChoiced(2) }} className="list-group-item" style={{ cursor: 'pointer' }}>Sold</li>
                    </ul>
                    <div className='panel panel-default orderheader' style={{ border: 'none' }}>
                        <div className='col-md-6 panel-heading'>Order Detail</div>
                        <div className='col-md-3 panel-heading'>Order Status</div>
                        <div className='col-md-3 panel-heading'>Order Control</div>
                    </div>
                    {
                        this.state.orderList.map((item, index) => {
                            let isAbled = item.refundButton == 0 ? true : false;
                            return <div key={index} style={{ marginTop: '10px' }}>
                                <div className='panel panel-default'>
                                    <div className='col-md-12 panel-heading' style={{ backgroundColor: '#eaf8ff' }}>
                                        <span style={{ fontWeight: 'bold' }}>CreateTime:{item.createTime}</span>
                                        <span style={{ marginLeft: '10px' }}>OrderId:{item.orderId}</span>
                                        <span className="pull-right text-danger" style={{ cursor: 'pointer' }, delShow} onClick={() => { this.deleteOrder(index) }}>Delete Order</span>
                                    </div>
                                </div>
                                <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='col-md-6'>
                                        <div className='col-md-3'><img src={item.picUrl} style={{ height: '100px' }} /></div>
                                        <div className='col-md-9'>
                                            BookName:<h4 style={{ display: 'inline-block' }}>{item.bookName}</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <h5>Price:{item.price}</h5>
                                                <h5> Number:{item.num}</h5><br />
                                                <h5>Total:{item.price * item.num}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        {item.orderStatus}
                                        {item.orderStatus == 0 ? <h4 className='text-primary'>Waiting For Pay</h4> : ''}
                                        {item.orderStatus == 1 ? <h4 className='text-success'>Success</h4> : ''}
                                        {item.orderStatus == 2 ? <h4 className='text-danger'>Failed</h4> : ''}
                                        {item.orderStatus == 3 ? <h4 className='text-info'>Cancel</h4> : ''}
                                        {item.orderStatus == 4 ? <h4 className='text-info'>Refund</h4> : ''}
                                    </div>
                                    <div className='col-md-3 ordercontrol' style={delShow}>
                                        {/* {item.orderStatus == '4' ? <button className='btn btn-info btn-sm' onClick={() => { this.refundOrder(index) }}>Refund</button> : <button type="button" className="btn btn-danger  btn-sm" onClick={() => { this.cancelOrder(index) }}>Cancel</button>} */}
                                        <button type="button" disabled={item.refundButton == 0 ? true : false} className="btn btn-danger  btn-sm" onClick={() => { this.refundOrder(index) }}>Refund</button>
                                        <button type="button" className="btn btn-primary  btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => { this.handleAddComment(index) }}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    <div style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClick={this.exportOrderList}>
                        <button className='btn btn-primary'>Export</button>
                    </div>

                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title" id="myModalLabel">Add Comment</h4>
                                </div>
                                <div className="modal-body">
                                    <textarea type="text" className="form-control" placeholder='Please input your comment' ref={value => this.myComment = value} />
                                    <input type="number" className="form-control" placeholder='Please input number less than five' ref={value => this.myStar = value} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addComment}>Commit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }

    }
}

export default MyOrder;