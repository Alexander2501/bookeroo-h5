import React, { Component } from "react";
import BookItem from "./bookitem";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Detail from "./detail/detail";


class IndexList extends Component {
  state = {
    picUrl: '',
    pageNum: 1,
    pageSize: 10,
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
    bookUrl: ""
  };

  componentDidMount() {

    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;
    this.getBookList();


  }


  getBookList = () => {
    let userType = sessionStorage.getItem("type");
    if (userType == 3) {//Admin
      this.state.bookUrl = "https://web.tootz.cn/api/book/globalList";
    } else if (userType == 2) {
      this.state.bookUrl = "https://web.tootz.cn/api/book/personalList";

    } else {
      this.state.bookUrl = "https://web.tootz.cn/api/book/publicList";

    }
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
    sessionStorage.setItem('bookMes', JSON.stringify(bookMes));

    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    if (userId != null && token != null) {
      this.props.history.push({ pathname: '/detail' });
    } else {
      this.props.history.push('/login');
    }
  }



  render() {

    let userType = sessionStorage.getItem("type");
    console.log('userType', userType);
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


export default IndexList;
