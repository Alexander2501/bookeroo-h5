import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

class BookItem extends Component {
  state = {
    src: '',
    name: "",
    price: "",
    author: "",
    type: sessionStorage.getItem('type')
  };
  openEditModal = (index) => {
    console.log(index);
  }
  handleDelete = (index) => {
    // console.log(index);
  if(window.confirm("Confirm Delete?")){
    this.props.deleteBook(index);//call father function
  }

    
  }
  render() {
    const { src, name, price, author } = this.props.bookInfo;
   
    return (
      <div style={{ width: '200px', height: '250px', border: '1px solid #e6e6e6', textAlign: 'center', display: 'inline-block', padding: '5px 10px' }}>
        <Link to='/detail'>
          <div>
            <img src="https://avatars.githubusercontent.com/u/23626?v=4" alt="" />
            <p>{name}</p>
            <p style={{ fontWeight: 'bold', color: 'red' }}>{price}</p>
          </div>
        </Link>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#editModal"
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
  editBook: PropTypes.func.isRequired
}
export default BookItem;