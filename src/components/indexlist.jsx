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
    bookUrl: "https://web.tootz.cn/api/book/publicList",
    searchType: 'name',
    searchValue: ''
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
    // } else {
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/publicList";//未登录
    // }

    // if (userType == 1 || userType == 2) {//Custom or Seller
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/personalList";
    // } else {
    //   this.state.bookUrl = "https://web.tootz.cn/api/book/publicList";//未登录
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
        if (res.data.code == '1000001') {
          // alert(res.data.message);
          this.props.history.push('/login');
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
  selectType = (e) => {
    // console.log(e.target.value);
    this.setState({
      searchType: e.target.value
    });
  }
  inputSearchVal = (e) => {
    // console.log(e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  }
  search = () => {
    let data = null;
    // console.log(this.state.searchType);
    let tempArr;
    if (this.state.searchType == 'name') {
      let value = this.state.searchValue;
      tempArr = this.state.books.filter(function (item) {
        console.log(item);
        return item.bookName == value
      });
      this.setState({
        books: tempArr
      });
      console.log(tempArr);

    }
    if (this.state.searchType == 'author') {

      let value = this.state.searchValue;
      tempArr = this.state.books.filter(function (item) {
        // console.log(item);                 
        return item.author == value
      });
      this.setState({
        books: tempArr
      });
      console.log(tempArr);

    }
    if (this.state.searchType == 'isbn') {
      let value = this.state.searchValue;
      tempArr = this.state.books.filter(function (item) {
        return item.isbn == value
      });
      this.setState({
        books: tempArr
      });
      console.log(tempArr);
    }
    if (this.state.searchType == 'category') {
      let value = this.state.searchValue;
      tempArr = this.state.books.filter(function (item) {
        return item.category == value
      });
      this.setState({
        books: tempArr
      });
      console.log(tempArr);
    }

    if (tempArr.length == 0) {
      alert("The book you searched was not found!")
      this.getBookList();
    }

  }
  reset = () => {
    this.getBookList();
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <form className="form-inline">
              <select className="form-control" style={{ width: '100px' }} onChange={(e) => { this.selectType(e) }}>
                <option value="name">Name</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
                <option value="category">Category</option>
              </select>

              <input type="text" className="form-control" onChange={this.inputSearchVal} placeholder="Search for..." />

              <button className="btn btn-default" type="button" onClick={this.search}>Search!</button>

            </form>
          </div>
          <div className='col-md-3'>
            <button type="button" className="btn btn-success pull-right"

              onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="row" style={{marginTop:'15px'}}>
          {
            this.state.books.map((item, index) => (
              <BookItem bookInfo={item} key={index} index={index} handleToDetail={this.handleToDetail} />
            )

            )
          }
        </div>
      </div>

    )


  }

}


export default withRouter(IndexList);
