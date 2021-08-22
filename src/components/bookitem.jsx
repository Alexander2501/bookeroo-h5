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
  componentDidMount() {
    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;

  }
  handleBuy = () => {
    this.props.handleToDetail();
  }



  render() {
    const { picUrl, bookName, price, author } = this.props.bookInfo;

    return (
      <div className="col-sm-4 col-md-3" onClick={this.handleBuy}>
        <div className="thumbnail">
          <img src={picUrl} alt="" />
          <div className="caption">
            <h3>{bookName}</h3>
            <p>{author}</p>
            <p> <button
              className="btn btn-default"
              data-toggle="modal"
              data-target="#bookEditModal"
              onClick={this.handleBuy}
            >
              Buy
            </button> </p>
          </div>
        </div>
      </div>

    );
  }
}
BookItem.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleToDetail: PropTypes.func.isRequired

}
export default BookItem;