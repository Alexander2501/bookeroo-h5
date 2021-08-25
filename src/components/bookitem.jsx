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
    type: localStorage.getItem('type')
  };
  componentDidMount() {
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;

  }
  handleBuy = () => {
    this.props.handleToDetail(this.props.index);
  }



  render() {
    const { picUrl, bookName, bookDesc, price, author } = this.props.bookInfo;

    return (
      <div className="col-sm-4 col-md-4" onClick={this.handleBuy}>
        <div className="thumbnail">
          <img src={picUrl} alt="" style={{ width: '150px', height: '200px' }} />
          <div className="caption">
            <h3 style={{height:'50px'}}>{bookName}</h3>
            <p style={{height:'50px',overflow:'hidden',textOverflow:'ellipsis'}}>{bookDesc}</p>
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
