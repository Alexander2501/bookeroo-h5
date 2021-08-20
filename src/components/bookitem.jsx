import React, { Component } from "react";
import PropTypes from "prop-types";

class BookItem extends Component {
  static prop;
  state = {
    src: '',
    name: "",
    price: "",
    author: "",
  };
  render() {   
    const { src,name,price,author } = this.props.bookInfo;
    return (
      <div>
        <div style={{ width: '200px', height: '230px', border: '1px solid #e6e6e6', textAlign: 'center', display: 'inline-block', padding: '5px 10px' }}>
          <img src="https://avatars.githubusercontent.com/u/23626?v=4" alt="" />
          <p>{name}</p>
          <p style={{ fontWeight: 'bold', color: 'red' }}>{price}</p>
        </div>
      </div>
    );
  }
}
BookItem.propTypes = {
  bookInfo: PropTypes.object.isRequired
}
export default BookItem;
