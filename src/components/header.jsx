import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

let userId = sessionStorage.getItem("userId");
let token = sessionStorage.getItem("token");
//设置请求头
axios.defaults.headers.common["token"] = token;
axios.defaults.headers.common["userId"] = userId;

class Header extends Component {

  state = {}

  logout = () => {
    this.props.handleLogout();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className='row App-header' style={{}}>
          <div className='col-xs-12 col-md-2'>
            <div>
              <h2>Bookeroo</h2>
            </div>
          </div>


          <div className='col-xs-12 col-md-6'>
            <div className="input-group">
              <div className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Department <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a href="#">Books</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                </ul>
              </div>
              <input type="text" className="form-control" aria-label="..." />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Search</button>
              </span>
            </div>
          </div>


          <div className='col-xs-12 col-md-4'>
            <div className="btn-group pull-right" role="group" style={{ marginRight: '30px' }}>

              <button type="button" className="btn btn-default"><Link to='/cart'>My Cart</Link></button>

              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Drop
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Person Setting</a></li>
                  <li onClick={this.logout}><a href="#">LogOut</a></li>
                </ul>
              </div>
            </div>


          </div>


        </div>
      </div >
    );
  }
}
Header.protoTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default Header;
