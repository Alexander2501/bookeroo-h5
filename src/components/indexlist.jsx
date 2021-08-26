import React, { Component } from "react";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
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
    bookUrl: "https://web.tootz.cn/api/book/publicList"
  };
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    // this.props.history.listen(() => {
    //    console.log(this.props.history.pathname);
    // })

    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;
    let userType = localStorage.getItem("type");
    // if (userType == 3) {//Admin
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/globalList";
    // } else if (userType == 2) {
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/personalList";
    // } else {
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/publicList";
    // }
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
        if (res.data.code == '1000000') {
          this.setState({
            books: res.data.data.entity
          });
        } else {
          alert(res.data.message);
        }

      }
    ).catch(err => {
      alert(err);
      this.props.history.push('/login');
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


export default withRouter(IndexList);
