import axios from 'axios';
import React, { Component } from 'react';
import './detail.css'
class Detail extends Component {

    state = {

        bookName: '',
        bookNum: 0,
        bookId: '',
        picUrl: '',
        bookDesc: '',
        price: 0,
        publishingHouse: '',
        publishingTime: '',
        author: '',
        bookMes: {},
        tempNum: 0,
        commentList: []
    }

    componentDidMount() {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;

        this.setState({
            bookMes: JSON.parse(localStorage.getItem('bookMes'))
        });

        this.getCommentList();


    }

    getCommentList = () => {
        let commentUrl = 'https://web.tootz.cn/api/book/commentList';
        let bookId = this.state.bookMes.bookId;
        let data = { pageSize: 1, pageNum: 10, bookId: bookId }
        axios.post(commentUrl, data).then(res => {
            console.log(res);
            if (res.code == "1000000") {
                this.setState({
                    commentList: res.entity
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = () => {
        this.setState({
            bookNum: this.state.tempNum
        });
    }
    addOrder = () => {
        this.state.tempNum += 1;
        this.handleChange();
    }
    reduceOrder = () => {
        this.state.tempNum -= 1;
        this.handleChange();
    }
    buyBook = (e) => {
        
        let bookNum = parseInt(this.state.bookNum);
        let bookId = this.state.bookMes.bookId;
        if(bookNum>0){
            let data = { num: bookNum, bookId: bookId };
            let url = "https://web.tootz.cn/api/order/create";
            axios.post(url, data).then(res => {
                console.log(res);
                debugger
                if (res.code = "1000000") {
                    window.location.href = res.data.data;
                    debugger
                } else {
                    console.log(res.data.message);
                    alert(res.data.message)
                    debugger
                }
            }).catch(err => {
                alert(err);
                console.log(err);
            });
        }else{
            alert('Order quantity can not less than zero')
        }
        
        
    }


    render() {
        // console.log(this.state.bookMes);
        let { bookName, picUrl, bookDesc, price, publishingHouse, publishingTime, author } = this.state.bookMes;
        return (
            <div>
                <div className="row" style={{ marginLeft: '0', marginRight: '0' }}>
                    <div className="col-xs-12 col-md-4">
                        <div className="thumbnail">
                            <img src={picUrl} alt="..." />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="head">
                            <div className='bookname'>
                                <h2>{bookName}</h2>
                            </div>
                            <div className='bookdesc'>
                                <p>{bookDesc}</p>
                            </div>
                        </div>
                        <div className='bookinfo'>
                            <div className='infoitem'><span>Author:</span><span>{author}</span></div>
                            <div className='infoitem'><span>Publishing&nbsp;House:</span><span>{publishingHouse}</span></div>
                            <div className='infoitem'><span>Publishing&nbsp;Time:</span><span>{publishingTime}</span></div>
                        </div>
                        <div className='bookprice'>
                            <span>Price:</span><span>${price}</span>
                        </div>
                        {/* <div className="destination">
                        <form className="form-inline">
                            <div className="form-group">
                                <label style={{ color: 'gray', fontWeight: 'normal' }}>Deliver To:</label>
                                <input type="text" className="form-control" style={{ marginLeft: '10px' }} placeholder="Enter Address" />
                            </div>

                        </form>
                    </div> */}
                        <div className='purchase'>
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.reduceOrder}>-</button>
                                </span>
                                <input type="text" className="form-control" value={this.state.bookNum} onChange={this.handleChange} style={{ width: '50px' }} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.addOrder}>+</button>
                                </span>
                            </div>
                            <div>
                                {/* <button type="button" className="btn btn-primary">AddToCart</button> */}
                                <button type="button" className="btn btn-default" onClick={this.buyBook}>Parchase</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        {
                            this.state.commentList.map((item, index) => (
                                <div>commingt{index}</div>
                            ))
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default Detail;
