import React, { Component } from "react";
import BookItem from "./bookitem";

class BookList extends Component {
  state = {
    books: [
      {
        name: "小王子",
        price: "20",
        author: "test",
      },
      {
        name: "小王子",
        price: "20",
        author: "test",
      },
    ],
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <ul className="nav nav-pills  nav-justified">
              <li role="presentation" className="active">
                <a href="#">Books</a>
              </li>
              <li role="presentation">
                <a href="#">Cart</a>
              </li>
              <li role="presentation">
                <a href="#">Buy Again</a>
              </li>
              <li role="presentation">
                <a href="#">About</a>
              </li>
              <li role="presentation">
                <a href="#">Contact-us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
            {
                this.state.books.map((item,index)=>{
                    <BookItem bookInfo={item} key={index}/>
                })
            }
        </div>
      </div>
    );
  }
}

export default BookList;
