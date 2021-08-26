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
    const { picUrl, bookName, bookDesc, price, author, stock } = this.props.bookInfo;

    return (
      <div className="col-sm-4 col-md-4" onClick={this.handleBuy}>
        <div className="thumbnail">
          <img src={picUrl} alt="" style={{ width: '150px', height: '200px' }} />
          <div className="caption">
            <h4 style={{ height: '40px' }}>{bookName}</h4>
            <p style={{ height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bookDesc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: "black", paddingLeft: '10px' }}><span>Price:</span><span style={{ fontWeight: 'bold', color: 'red' }}>${price}</span></p>
              <p style={{ color: "black", paddingRight: '10px' }}><span>Stock:</span><span>{stock}</span></p>
            </div>
            <p className='clearfix'>
              <button
                style={{ float: "right" }}
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
