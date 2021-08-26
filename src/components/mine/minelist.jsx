import React, { Component } from "react";
import PropTypes from 'prop-types'

import BookItem from "../bookitem";
import axios from "axios";



class MineList extends Component {
  state = {
    picUrl: '',
    pageNum: 1,
    pageSize: 1000,
    isShow: true,
    books: [],
    editBookMes: {},
    bookName: '',
    bookDesc: '',
    author: '',
    price: '',
    isbn: '',
    publishingHouse: '',
    publishingTime: '',
    language: '',
    stock: '',
    status: '',
    bookUrl: "https://web.tootz.cn/api/book/personalList"
  };
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {   
   
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;
    
    this.getBookList();
  }

  getBookList = () => {
    //   const url = `https://api.github.com/search/users?q=js`
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    axios.post(this.state.bookUrl, data).then(
      res => {
        console.log(res.data.data.entity);
        this.setState({
          books: res.data.data.entity
        });

      }
    ).catch(err => {
      console.log(err);
    });

  }

  handleToDetail = (bookindex) => {

    let bookMes = this.state.books[bookindex];
    localStorage.setItem('bookMes', JSON.stringify(bookMes));

    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    if (userId != null && token != null) {
      this.props.history.push({ pathname: '/detail' });
    } else {
      this.props.history.push('/login');
    }
  }



  render() {
    return (
      <div className="row">
        {
          this.state.books.map((item, index) => (
            <BookItem bookInfo={item} key={index} index={index} handleToDetail={this.handleToDetail} />
          )

          )
        }
      </div>
    )


  }

}


export default  MineList;
