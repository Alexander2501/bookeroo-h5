import React, { Component } from 'react';
import PropTypes from 'prop-types';



class BookItem extends Component {

    static  prop
  state={
      bookinfo:{}
  }
    render() {
        let container={width:'50vw',height:'70vh',border:'1px solid grey'};
        const {bookinfo} = this.props
        return (
            <div>
                <div className={}>
                    <img src="../../public/imgs/book.jpg" alt="" />
                </div>
            </div>
        );
    }
}

export default BookItem;