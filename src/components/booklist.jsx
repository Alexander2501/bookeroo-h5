import React, { Component } from "react";
import BookItem from "./bookitem";
import axios from "axios";
import { NavLink } from "react-router-dom";

class BookList extends Component {
  state = {
    books: [
      {
        src: '',
        name: "小王子",
        price: "20",
        author: "test",
      },
      {
        src: '../imgs/book.jpg',
        name: "小王子",
        price: "20",
        author: "test",
      },
    ],
  };

  componentDidMount() {
    const url = `https://api.github.com/search/users?q=js`

    // 使用axios库
    // axios.get(url)
    //   .then((response) => {
    //     console.log(response)

    //   })
    //   .catch((error) => {
    //     // debugger
    //     // console.log('error', error.response.data.message, error.message)

    //   })


  }


  render() {
    return (
      <div>
        <div className="page-header text-center">
          <h2>Book At Bookeroo</h2>
        </div>

        <div>
          {
            this.state.books.map((item, index) => (

              <NavLink to='/book'>
                <BookItem bookInfo={item} key={index} />
              </NavLink>
            )

            )
          }
        </div>
      </div>
    );
  }
}


export default BookList;
