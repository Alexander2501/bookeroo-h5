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
        console.log(res);
        if (res.data.code = '1000000') {
          this.setState({
            books: res.data.data.entity
          });
        } else {
          alert(res.data.message);
        }
        if (res.data.code == '1000001') {
          //  alert(res.data.message);
          this.props.history.push('/login');
        }

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

  //clear add modal
  handleAddOpen = () => {
    this.setState({
      picUrl: '',
      pageNum: '',
      pageSize: '',
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
    });
  }
  changPic = () => {
    let reads = new FileReader();
    let f = document.getElementById('file').files[0];
    let fileSize = f.size;
    // console.log(fileSize);
    let param = new FormData()  // 创建form对象
    param.append('file', f)  // 通过append向form对象添加数据
    let upImgUrl = "https://web.tootz.cn/api/open/upload";
    // reads.readAsDataURL(f);

    // reads.onload = function (e) {

    //   document.getElementById('show').src = this.result;
    //   this.setState({
    //     picUrl: this.result
    //   });
    // };
    if (fileSize >= 1024 * 1024) {
      alert('The picture can not be larger than 1M');
    } else {
      axios.post(upImgUrl, param).then(res => {
        if (res.data.code == "1000000") {
          let imgUrl = res.data.data;
          this.setState({
            picUrl: imgUrl
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
  getBookStatus = (e) => {
    let statusVal = e.target.value;
    // console.log(statusVal);
    if (statusVal == 'offline') {
      this.setState({
        status: 0
      });
    }
    if (statusVal == 'online') {
      this.setState({
        status: 1
      });
    }
  }

  addBook = (book) => {
    // const { books } = this.state;
    // books.unshift(book);
    // this.setState({ books });
    // console.log(this.state.status);

    let userType = localStorage.getItem('type');
    let addNBookUrl;
    if (userType != 1) {
      addNBookUrl = "https://web.tootz.cn/api/book/addNew";
    } else {
      addNBookUrl = "https://web.tootz.cn/api/book/addOld";
    }
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
    let status = this.state.status;
    let percent = parseInt(this.percent.value);

    let data = {
      bookName,
      bookDesc,
      picUrl,
      author,
      price,
      isbn,
      publishingHouse,
      publishingTime,
      language,
      stock,
      status,
      percent
    }
    axios.post(addNBookUrl, data).then(res => {
      // console.log(res);
      // console.log(data);
      if (res.data.code == "1000000") {
        alert("图书添加成功");
        this.getBookList();
      } else {
        alert(res.data.message);
      }
    }).catch(err => {
      // console.log(err);
      this.setState({
        uploadflag: true
      });

    });
  }



  render() {
    let type = localStorage.getItem('type');
    let isShow = type > 1 ? { display: 'block' } : { display: 'none' }
    return (
      <div>
        <div className="btn-group" role="group" style={{ marginBottom: '10px' }}>
          <button type="button" className="btn btn-default" data-toggle="modal" data-target="#bookAddModal" style={isShow} onClick={this.handleAddOpen}>AddNewBook</button>
          <button type="button" className="btn btn-default" data-toggle="modal" data-target="#bookAddModal" onClick={this.handleAddOpen}>AddOldBook</button>
        </div>

        <div className="row">
          {
            this.state.books.map((item, index) => (
              <BookItem bookInfo={item} key={index} index={index} handleToDetail={this.handleToDetail} />
            ))
          }
        </div>


        {/* Add Book Modal*/}
        <div className="modal fade" id="bookAddModal" role="dialog" aria-labelledby="myModalLabel"
          style={{ display: this.state.isShow }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Add Book</h4>
              </div>
              <div className="modal-body">

                <form className="form-horizontal">
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">BookName</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.bookName = value} placeholder="BookName" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">BookDesc</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.bookDesc = value} placeholder="BookDesc" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">PicUrl</label>
                    <div className="col-sm-6">
                      <label>File input</label>
                      <input type="file" id="file" accept="image/*" onChange={this.changPic} />
                      <img src={this.state.picUrl} id="show" width="200" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">Author</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.author = value} placeholder="Author" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">Price</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.price = value} placeholder="Price" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">ISBN</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.isbn = value} placeholder="ISBN" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">PublishingHouse</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.publishingHouse = value}
                        placeholder="PublishingHouse" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">PublishingTime</label>
                    <div className="col-sm-6">
                      <input type="date" className="form-control"
                        ref={value => this.publishingTime = value}
                        placeholder="PublishingTime" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">Language</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"
                        ref={value => this.language = value} placeholder="Language" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">Stock</label>
                    <div className="col-sm-6">
                      <input type="number" className="form-control"
                        ref={value => this.stock = value} placeholder="Stock" />
                    </div>
                  </div>
                 
                 
                  <div className="form-group">
                    <label className=" col-sm-3 control-label">Percent</label>
                    <div className="col-sm-6">
                      <input type="number" className="form-control" placeholder='1-99'
                        ref={value => this.percent = value} />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                  onClick={this.addBook}>Add
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    )


  }

}


export default MineList;
