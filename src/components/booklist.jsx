import React, { Component } from "react";
import BookItem from "./bookitem";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Detail from "./detail";


class BookList extends Component {
  state = {
    picUrl: '',
    pageNum: 1,
    pageSize: 10,
    books: [
      {
        src: '',
        name: "小王子",
        price: "20",
        author: "test",
      },
      {
        src: '../imgs/book.jpg',
        name: "小王子",
        price: "20",
        author: "test",
      },
    ],
  };

  componentDidMount() {

    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;

    //   const url = `https://api.github.com/search/users?q=js`
    let globalBooksUrl = "https://web.tootz.cn/api/book/globalList";
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    axios.post(globalBooksUrl, data).then(
      res => {
        // console.log(res.data.data.entity);
        this.setState({
          books:res.data.data.entity
        });

      }
    ).catch(err => {
      console.log(err);
    });


  }

  changPic = () => {
    let reads = new FileReader();

    let f = document.getElementById('file').files[0];

    reads.readAsDataURL(f);

    reads.onload = function (e) {

      document.getElementById('show').src = this.result;
      this.setState({
        picUrl: this.result
      });

    };
  }

  addBook = (book) => {
    const { books } = this.state;
    books.unshift(book);
    this.setState({ books });

    let addNBookUrl = "https://web.tootz.cn/api/open/book/addNew";

    let bookName = this.bookName.value.toString();
    let bookDesc = this.bookDesc.value.toString();
    let picUrl = this.state.picUrl;
    let author = this.author.value.toString();
    let price = this.price.value;
    let isbn = this.isbn.value.toString();
    let publishingHouse = this.publishingHouse.value.toString();
    let publishingTime = this.publishingTime.value.toString();
    let language = this.language.value.toString();
    let stock = this.stock.value;
    let status = this.status.value;

    let data = { bookName, bookDesc, picUrl, author, price, isbn, publishingHouse, publishingTime, language, stock, status }

    axios.post(addNBookUrl, data).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });


  }
  deleteBook = (index) => {
    // console.log(index);
    const { books } = this.state;
    books.splice(index, 1);
    this.setState({ books });



  }
  editBook = (index) => {

  }

  render() {

    return (
      <div>
        <div className="page-header text-center">
          <h2>Book At Bookeroo</h2>
          <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#bookAddModal">
            Add
          </button>
        </div>

        <div>
          {
            this.state.books.map((item, index) => (
              <BookItem bookInfo={item} key={index} index={index} deleteBook={this.deleteBook} editBook={this.editBook} />
            )

            )
          }
        </div>


        <div className="modal fade" id="bookAddModal" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Add Book</h4>
              </div>
              <div className="modal-body">

                <form className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">BookName</label>
                    <div className="col-sm-6">
                      <input type="email" className="form-control" ref={value => this.bookName = value} placeholder="BookName" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">BookDesc</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.bookDesc = value} placeholder="BookDesc" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">PicUrl</label>
                    <div className="col-sm-6">
                      <label>File input</label>
                      <input type="file" id="file" accept="image/*" onChange={this.changPic} />
                      <img src="" id="show" width="200" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Author</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.author = value} placeholder="Author" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Price</label>
                    <div className="col-sm-6">
                      <input type="email" className="form-control" ref={value => this.price = value} placeholder="Price" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">ISBN</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.isbn = value} placeholder="ISBN" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">PublishingHouse</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.publishingHouse = value} placeholder="PublishingHouse" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">PublishingTime</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.publishingTime = value} placeholder="PublishingTime" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Language</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.language = value} placeholder="Language" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Stock</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.stock = value} placeholder="Stock" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Status</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" ref={value => this.status = value} placeholder="Status" />
                    </div>
                  </div>

                </form>







              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}


export default BookList;
