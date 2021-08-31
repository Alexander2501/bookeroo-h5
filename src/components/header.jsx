import axios from "axios";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import PubSub from 'pubsub-js'

let userId = localStorage.getItem("userId");
let token = localStorage.getItem("token");
//设置请求头
axios.defaults.headers.common["token"] = token;
axios.defaults.headers.common["userId"] = userId;

class Header extends Component {

  state = {
    searchType: ['Name', 'Author', 'ISBN', 'UserId']
  }

  search = () => {
    //Issue message
    let searchObj = {
      searchType: this.state.searchType,
      searchStr: this.searchStr.value
    }
    PubSub.publish('search', searchObj);
  }

  logout = () => {
    this.props.handleLogout();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className='row App-header' style={{}}>
          <div className='col-xs-6 col-md-2'>
            <div>
              <h2>Bookeroo</h2>
            </div>
          </div>


          <div className='col-xs-0 col-md-6 hidden-md' >
            {/* <div className="input-group">
              <div className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Department <span className="caret"></span></button>
                <select onChange={(e) => { this.selectSeaType(e) }}>
                  {
                    this.state.searchType.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))
                  }
                </select>
              </div>
              <input type="text" className="form-control" aria-label="..." ref={value => { this.searchStr = value }} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.search}>Search</button>
              </span>
            </div> */}
          </div>


          <div className='col-xs-6 col-md-4'>
            <div className="btn-group pull-right" role="group" style={{ marginTop: '20px' }}>

              {/* <button type="button" className="btn btn-default"><Link to='/orders'>My Order</Link></button> */}

              <div className="btn-group" role="group" style={{ marginRight: '60px' }}>
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
