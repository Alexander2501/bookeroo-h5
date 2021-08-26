import React, { Component } from "react";
import BookItem from "./bookitem";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Detail from "./detail/detail";


class BookList extends Component {
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
        status: 0,
        bookUrl: "https://web.tootz.cn/api/book/publicList"
    };

    componentDidMount() {

        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;
        let userType = localStorage.getItem("type");
        if (userType == 3) {//Admin
            this.state.bookUrl = "https://web.tootz.cn/api/book/globalList";
        } else if (userType == 2) {
            this.state.bookUrl = "https://web.tootz.cn/api/book/personalList";

        } else {
            this.state.bookUrl = "https://web.tootz.cn/api/book/publicList";
        }
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
                // console.log(res.data.data.entity);
                this.setState({
                    books: res.data.data.entity
                });
            }
        ).catch(err => {
            localStorage.clear();
            console.log(err);
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

    getBookStatus = (e) => {
        let statusVal = e.target.value;
        console.log(statusVal);
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
        const { books } = this.state;
        // books.unshift(book);
        // this.setState({ books });
        // console.log(this.state.status);
        debugger
        let addNBookUrl = "https://web.tootz.cn/api/book/addNew";
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
            status

        }
        debugger

        axios.post(addNBookUrl, data).then(res => {
            // console.log(res);
            // console.log(data);
            if (res.data.code = "1000000") {
                alert("图书添加成功");
                this.getBookList();
            } else {
                alert(res.message);
            }
        }).catch(err => {
            // console.log(err);
            this.setState({
                uploadflag: true
            });

        });


    }
    deleteBook = (index) => {
        console.log(index);
        const { books } = this.state;

        let bookId = books[index].bookId;
        if (window.confirm("Confirm Delete?")) {
            let delBookUrl = "https://web.tootz.cn/api/book/delete";
            axios.post(delBookUrl, { bookId }).then(res => {
                if (res.data.code == "1000000") {
                    books.splice(index, 1);
                    this.setState({ books });
                    alert("删除成功");
                }
            }).catch();

        }


    }

    openEditModal = (index) => {
        console.log(this.state.books);
        this.setState({
            bookId: this.state.books[index].bookId,
            bookName: this.state.books[index].bookName,
            bookDesc: this.state.books[index].bookDesc,
            author: this.state.books[index].author,
            price: this.state.books[index].price,
            isbn: this.state.books[index].isbn,
            publishingHouse: this.state.books[index].publishingHouse,
            publishingTime: this.state.books[index].publishingTime,
            language: this.state.books[index].language,
            stock: this.state.books[index].stock,
            status: this.state.books[index].status,
            picUrl: this.state.books[index].picUrl
        });
    }

    editInputChange = (e) => {
        console.log(e.target.name);
        switch (e.target.name) {
            case 'bookName':
                this.setState({
                    bookName: e.target.value
                });
                break;
            case 'bookDesc':
                this.setState({
                    bookDesc: e.target.value.toString()
                });
                break;
            case 'picUrl':
                this.setState({
                    picUrl: e.target.value.toString()
                });
                break;
            case 'author':
                this.setState({
                    author: e.target.value.toString()
                });
                break;
            case 'price':

                this.setState({
                    price: e.target.value
                });
                console.log(e.target.value);
                break;
            case 'isbn':
                this.setState({
                    isbn: e.target.value
                });
                break;
            case 'publishingHouse':
                this.setState({
                    publishingHouse: e.target.value
                });
                break;
            case 'publishingTime':
                this.setState({
                    publishingTime: e.target.value
                });
                break;
            case 'language':
                this.setState({
                    language: e.target.value
                });
                break;
            case 'stock':
                this.setState({
                    stock: e.target.value
                });

                break;
            case 'status':
                this.setState({
                    status: e.target.value
                });
                break;
            default:
                break;
        }
    }
    editBook = () => {
        const { bookId, bookName, bookDesc, picUrl, author, price, isbn, publishingHouse, publishingTime, language, stock, status } = this.state;
        let data = {
            bookId: bookId,
            bookName: bookName,
            bookDesc: bookDesc,
            picUrl: picUrl,
            author: author,
            price: parseFloat(price),
            isbn: isbn,
            publishingHouse: publishingHouse,
            publishingTime: publishingTime,
            language: language,
            stock: parseInt(stock),
            status: parseInt(status)
        };
        let editUrl = "https://web.tootz.cn/api/book/update";
        axios.post(editUrl, data).then(res => {
            console.log(res);
            this.getBookList();
        }).catch(err => {
            console.log(err);
        });
    }
    handleToDetail = (index) => {
        // console.log(index);
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        if (userId != null && token != null) {
            this.props.history.push('/detail');
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        let textShow = this.state.uploadflag ? 'block' : 'none';
        let userType = localStorage.getItem("type");
        // console.log('userType', userType);
        if (userType == 1 || userType == null) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        {
                            this.state.books.map((item, index) => (
                                <BookItem bookInfo={item} key={index} index={index}
                                    handleToDetail={this.handleToDetail} />
                            )
                            )
                        }
                    </div>
                </div>

            )
        } else {
            return (
                <div className="container-fluid">
                    <div style={{ backgroundColor: '#f5f5f5', padding: '10px 0' }}>
                        <h2 style={{ display: 'inline-block', margin: '0' }}>Book At Bookeroo</h2>
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                            data-target="#bookAddModal"
                            style={{ float: "right" }}
                            onClick={this.handleAddOpen}>
                            Add
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Index</th>
                                    <th>Image</th>
                                    <th>BookName</th>
                                    <th>BookDesc</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>ISBN</th>
                                    <th>PublishHouse</th>
                                    <th>PublishTime</th>
                                    <th>Language</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th width="15%">Control</th>
                                </tr>
                                {
                                    this.state.books.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={item.picUrl} alt="" style={{ width: '50px', height: '30px' }} /></td>
                                            <td>{item.bookName}</td>
                                            <td>{item.bookDesc}</td>
                                            <td>{item.author}</td>
                                            <td>{item.price}</td>

                                            <td>{item.isbn}</td>
                                            <td>{item.publishingHouse}</td>
                                            <td>{item.publishingTime}</td>
                                            <td>{item.language}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.status}</td>
                                            <td width="15%">
                                                <button
                                                    className="btn btn-primary"
                                                    data-toggle="modal"
                                                    data-target="#bookEditModal"
                                                    onClick={() => {
                                                        this.openEditModal(index)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn btn-danger"
                                                    onClick={() => {
                                                        this.deleteBook(index);
                                                    }}
                                                    style={{ marginLeft: "5px" }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>

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
                                            <label className=" col-sm-3 control-label">Status</label>
                                            <div className="col-sm-6">
                                                <select className="form-control" onChange={(e) => { this.getBookStatus(e) }}>
                                                    <option value="offline">Offline</option>
                                                    <option value="online">Online</option>
                                                </select>
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

                    {/* Edit Book Modal */}
                    <div className="modal fade" id="bookEditModal" role="dialog" aria-labelledby="myModalLabel"
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
                                                <input type="text" className="form-control" name="bookName"
                                                    value={this.state.bookName} onChange={this.editInputChange}
                                                    placeholder="BookName" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">BookDesc</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" name="bookDesc"
                                                    value={this.state.bookDesc} onChange={this.editInputChange}
                                                    placeholder="BookDesc" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">PicUrl</label>
                                            <div className="col-sm-6">
                                                <label>File input</label>
                                                <input type="file" id="file" accept="image/*" onChange={this.changPic} />
                                                <img src={this.state.picUrl} id="show" width="200" />
                                                <span style={{ display: this.state.uploadflag, color: 'red' }}>Please choose image less than 1M in size </span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">Author</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" name="author"
                                                    value={this.state.author} onChange={this.editInputChange}
                                                    placeholder="Author" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">Price</label>
                                            <div className="col-sm-6">
                                                <input type="number" className="form-control" name="price"
                                                    value={this.state.price} onChange={this.editInputChange}
                                                    placeholder="Price" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">ISBN</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" name="isbn"
                                                    value={this.state.isbn} onChange={this.editInputChange}
                                                    placeholder="ISBN" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">PublishingHouse</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" name="publishingHouse"
                                                    value={this.state.publishingHouse}
                                                    onChange={this.editInputChange} placeholder="PublishingHouse" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">PublishingTime</label>
                                            <div className="col-sm-6">
                                                <input type="date" className="form-control" name="publishingTime"
                                                    value={this.state.publishingTime} onChange={this.editInputChange}
                                                    placeholder="PublishingTime" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">Language</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" name="language"
                                                    value={this.state.language} onChange={this.editInputChange}
                                                    placeholder="Language" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">Stock</label>
                                            <div className="col-sm-6">
                                                <input type="number" className="form-control" name="stock"
                                                    value={this.state.stock} onChange={this.editInputChange}
                                                    placeholder="Stock" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className=" col-sm-3 control-label">Status</label>
                                            <div className="col-sm-6">
                                                <input type="number" min="10" max="1" className="form-control"
                                                    name="status" value={this.state.status}
                                                    onChange={this.editInputChange} placeholder="Status" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.editBook}>Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            );
        }

    }
}


export default BookList;
