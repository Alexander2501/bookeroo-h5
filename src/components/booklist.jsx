import React, { Component } from "react";
import BookItem from "./bookitem";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Detail from "./detail/detail";


class BookList extends Component {
    state = {
        picUrl: '',
        tocPicUrl: '',
        isUpload1: false,
        isUpload2: false,
        isUpload3: false,
        pageNum: 1,
        pageSize: 1000,
        isShow: true,
        books: [],
        editBookMes: {},
        bookName: '',
        bookDesc: '',
        category: '',
        author: '',
        price: '',
        isbn: '',
        publishingHouse: '',
        publishingTime: '',
        language: '',
        stock: '',
        status: 0,
        bookUrl: "https://web.tootz.cn/api/book/globalList",
        newOld: false,
        searchTypeArr: ['Author', 'ISBN', 'Name'],
        searchType: 'name',
        searchValue: '',
        searchData: {
            pageNum: 1,
            pageSize: 1000,
            bookName: '',
            author: '',
            isbn: ''
        },
        searchBookName:'',
        searchBookIsbn:'',
        searchBookAuthor:'',
        searchBookCate:''
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
        }
        if (userType == 1 || userType == 2) {//Custom or Seller
            this.state.bookUrl = "https://web.tootz.cn/api/book/personalList";
        }

        if (userType == 1) {
            this.setState({
                newOld: true
            });
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
                console.log(res);
                if (res.data.code == '1000000') {
                    this.setState({
                        books: res.data.data.entity
                    });
                } else {
                    alert(res.data.message);
                }
                if (res.data.code == '1000001') {
                    //    alert(res.data.message);
                    this.props.history.push('/login');
                }
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
                        picUrl: imgUrl,
                        isUpload1: true
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    changPic1 = () => {
        // let reads = new FileReader();
        let f = document.getElementById('file1').files[0];
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
                        tocPicUrl: imgUrl,
                        isUpload2: true
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    changPic2 = () => {
        // let reads = new FileReader();
        let f = document.getElementById('file2').files[0];
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
                        tocPicUrl: imgUrl,
                        isUpload3: true
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
            status: 0,
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

    selectNewOld = (e) => {
        console.log(e);
        let newOldStr = e.target.value;
        // console.log(newOldStr);
        if (newOldStr == "new") {
            this.setState({
                newOld: false
            });
        }
        if (newOldStr == "old") {
            this.setState({
                newOld: true
            });
        }
    }

    addBook = (book) => {
        const { books } = this.state;
        // books.unshift(book);
        // this.setState({ books });
        // console.log(this.state.status);
        // debugger
        let addNBookUrl;
        if (this.state.newOld) {//true未添加旧书
            addNBookUrl = "https://web.tootz.cn/api/book/addOld";
        } else {
            addNBookUrl = "https://web.tootz.cn/api/book/addNew";
        }

        let bookName = this.bookName.value.toString();
        let bookDesc = this.bookDesc.value.toString();
        let category = this.category.value.toString();
        let picUrl = this.state.picUrl;
        let tocPicUrl = this.state.tocPicUrl;
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
            category,
            picUrl,
            tocPicUrl,
            author,
            price,
            isbn,
            publishingHouse,
            publishingTime,
            language,
            stock,
            status
        }
        // debugger?

        if (!this.state.isUpload1) {
            alert("The image was not uploaded successfully");
            return;
        } else {
            axios.post(addNBookUrl, data).then(res => {
                console.log(res);
                // console.log(data);
                if (res.data.code == "1000000") {
                    this.getBookList();
                    alert("The Book add successfully");
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
            case 'category':
                this.setState({
                    category: e.target.value.toString()
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
        const { bookId, bookName, bookDesc, category, picUrl, tocPicUrl, author, price, isbn, publishingHouse, publishingTime, language, stock, status } = this.state;
        let data = {
            bookId: bookId,
            bookName: bookName,
            bookDesc: bookDesc,
            category: category,
            picUrl: picUrl,
            tocPicUrl: tocPicUrl,
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

        if (!this.state.isUpload3) {
            alert("The image was not uploaded successfully");
            return;
        } else {
            axios.post(editUrl, data).then(res => {
                console.log(res);
                if (res.data.code == "1000000") {
                    alert("Edit successfully")
                    this.getBookList();
                }
            }).catch(err => {
                console.log(err);
            });
        }
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

    selectType = (e) => {
        // console.log(e.target.value);
        this.setState({
            searchType: e.target.value
        });


    }
    inputSearchVal = (e) => {
        // console.log(e.target.value);       
        this.setState({
            searchValue: e.target.value.trim()
        });

        
    }
    search = () => {
        let data;
        let selStr = this.state.searchType;       
      
        if (selStr == "name") {
            console.log(1);
            data = {
                pageNum: 1,
                pageSize: 1000,
                bookName: this.state.searchValue
            }
           
        }
        if (selStr == 'author') {
            data = {
                pageNum: 1,
                pageSize: 1000,
                author: this.state.searchValue             
            }
          
        }
        if (selStr == 'isbn') {
            data = {
                pageNum: 1,
                pageSize: 1000,                
                isbn: this.state.searchValue
            }
           
        }
        if (selStr == 'category') {
            data = {
                pageNum: 1,
                pageSize: 1000,
                category:this.state.searchValue
            }
        }
        // console.log(data);
        // console.log(this.state.searchType);
        // let tempArr;
        // if (this.state.searchType == 'name') {
        //     let value = this.state.searchValue.trim().toLowerCase();
        //     tempArr = this.state.books.filter(function (item) {
        //         // console.log(item);             
        //         return item.bookName.toLowerCase().indexOf(value) != -1
        //     });
        //     this.setState({
        //         books: tempArr
        //     });
        //     // console.log(tempArr);
        // }
        // if (this.state.searchType == 'author') {

        //     let value = this.state.searchValue.trim().toLowerCase();
        //     tempArr = this.state.books.filter(function (item) {
        //         // console.log(item);                 
        //         // return item.author == value
        //         return item.author.toLowerCase().indexOf(value) != -1;
        //     });
        //     this.setState({
        //         books: tempArr
        //     });
        //     console.log(tempArr);

        // }
        // if (this.state.searchType == 'isbn') {
        //     let value = this.state.searchValue.trim().toLowerCase();
        //     tempArr = this.state.books.filter(function (item) {
        //         // return item.isbn == value
        //         return item.isbn.toLowerCase().indexOf(value) != -1;
        //     });
        //     this.setState({
        //         books: tempArr
        //     });
        //     console.log(tempArr);
        // }
        // if (this.state.searchType == 'category') {
        //     let value = this.state.searchValue.trim().toLowerCase();
        //     tempArr = this.state.books.filter(function (item) {
        //         // return item.category == value
        //         return item.category.toLowerCase().indexOf(value) != -1;
        //     });
        //     this.setState({
        //         books: tempArr
        //     });
        //     console.log(tempArr);
        // }

        // if (tempArr.length == 0) {
        //     alert("The book you searched was not found!")
        //     this.getBookList();
        // }
        // console.log(data);
        axios.post(this.state.bookUrl, data).then(
            res => {
                // console.log(res);
                if (res.data.code == '1000000') {
                    this.setState({
                        books: res.data.data.entity
                    });
                    // console.log(res);
                } else {
                    alert(res.data.message);
                }
                if (res.data.code == '1000001') {
                    //    alert(res.data.message);
                    this.props.history.push('/login');
                }
            }
        ).catch(err => {
            localStorage.clear();
            console.log(err);
        });
    }
    reset = () => {
        this.getBookList();
    }

    render() {
        let textShow = this.state.uploadflag ? 'block' : 'none';
        let newOldShow = this.state.newOld || localStorage.getItem('type') == 1 ? 'block' : 'none';//
        let userType = localStorage.getItem("type");
        // console.log('userType', userType);
        // if (userType == 1 || userType == null) {
        //     return (
        //         <div className="container-fluid">
        //             <div className="row">
        //                 {
        //                     this.state.books.map((item, index) => (
        //                         <BookItem bookInfo={item} key={index} index={index}
        //                             handleToDetail={this.handleToDetail} />
        //                     )
        //                     )
        //                 }
        //             </div>
        //         </div>
        //     )
        // } 
        // else {
        return (
            <div className="container-fluid">
                <div style={{ backgroundColor: '#f5f5f5', padding: '10px 0' }}>
                    <div className='row'>
                        <div className='col-md-3'>
                            {/* <h2 style={{ display: 'inline-block', margin: '0' }}>Book At Bookeroo</h2> */}
                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#bookAddModal"

                                onClick={this.handleAddOpen}>
                                Add
                            </button>
                        </div>
                        <div className='col-md-6'>
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
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Index</th>
                                <th>Image</th>
                                <th>BookName</th>
                                <th>BookDesc</th>
                                <th>Category</th>
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
                                        <td>{item.category}</td>
                                        <td>{item.author}</td>
                                        <td>{item.price}</td>
                                        <td>{item.isbn}</td>
                                        <td>{item.publishingHouse}</td>
                                        <td>{item.publishingTime}</td>
                                        <td>{item.language}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.status == 1 ? "online" : "offline"}</td>
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
                                        <label className=" col-sm-3 control-label">Category</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control"
                                                ref={value => this.category = value} placeholder="Category" />
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
                                        <label className=" col-sm-3 control-label">TocPicUrl</label>
                                        <div className="col-sm-6">
                                            <label>TocFile input</label>
                                            <input type="file" id="file1" accept="image/*" onChange={this.changPic1} />
                                            <img src={this.state.tocPicUrl} id="show" width="200" />
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
                                            <input type="number" className="form-control"
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

                                    <div className="form-group">
                                        <label className=" col-sm-3 control-label">NewOrOld</label>
                                        <div className="col-sm-6">
                                            <select onChange={(e) => { this.selectNewOld(e) }}>
                                                <option value="new" disabled={userType == 1 ? true : false}>NewBook</option>
                                                <option value="old">OldBook</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ display: newOldShow }}>
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
                                {/* data-dismiss="modal" */}
                                <button type="button" className="btn btn-primary"
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
                                        <label className=" col-sm-3 control-label">Category</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" name="category"
                                                value={this.state.category} onChange={this.editInputChange}
                                                placeholder="BookCategory" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className=" col-sm-3 control-label">PicUrl</label>
                                        <div className="col-sm-6">
                                            <label>File input</label>
                                            <input type="file" id="file" accept="image/*" onChange={this.changPic} />
                                            <img src={this.state.picUrl} id="show" width="200" />
                                            {/* <span style={{ display: this.state.uploadflag, color: 'red' }}>Please choose image less than 1M in size </span> */}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className=" col-sm-3 control-label">TocPicUrl</label>
                                        <div className="col-sm-6">
                                            <label>TocFile input</label>
                                            <input type="file" id="file2" accept="image/*" onChange={this.changPic2} />
                                            <img src={this.state.tocPicUrl} id="show" width="200" />
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
                                <button type="button" className="btn btn-primary"
                                    onClick={this.editBook}>Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
        // }

    }
}


export default BookList;
