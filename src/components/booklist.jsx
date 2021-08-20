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
         <div className="panel panel-default">
          <div className="panel-heading">USER MANAGEMENT</div>
          <div className="panel-body">
            
          </div>
        </div>
      </div>
    );
  }
}

export default BookList;
