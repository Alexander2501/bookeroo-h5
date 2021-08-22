import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";
import axios from "axios";

class BookItem extends Component {
  state = {
    src: '',
    name: "",
    price: "",
    author: "",
    type: sessionStorage.getItem('type')
  };
  componentDidMount(){
    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;

  }
  openEditModal = (index) => {
    this.props.handleEditBook(index);
  }

  render() {
    const { picUrl, bookName, price, author } = this.props.bookInfo;
   
    return (
      <div style={{ width: '200px', height: '250px', border: '1px solid #e6e6e6', textAlign: 'center', display: 'inline-block', padding: '5px 10px' }}>
        <Link to='/detail'>
          <div>
            <img src={picUrl} alt="" />
            <p>{bookName}</p>
            <p style={{ fontWeight: 'bold', color: 'red' }}>{price}</p>
          </div>
        </Link>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#bookEditModal"
          onClick={() => { this.openEditModal(this.props.index) }}
        >
          Edit
        </button>
        <button
          className="btn btn btn-danger"
          onClick={() => {
            this.handleDelete(this.props.index);
          }}
          style={{ marginLeft: "5px" }}
        >
          Delete
        </button>
      </div>
    );
  }
}
BookItem.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteBook: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired
}
export default BookItem;