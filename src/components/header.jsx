import axios from "axios";
import React, { Component } from "react";

let userId = sessionStorage.getItem("userId");
let token = sessionStorage.getItem("token");
//设置请求头
axios.defaults.headers.common["token"] = token;
axios.defaults.headers.common["userId"] = userId;

class Header extends Component {

  state = {}
  logout = () => {
    const url = "https://web.tootz.cn/api/open/user/logout";
    axios.post(url, {}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <div className='row App-header' style={{}}>
          <div className='col-md-2'>
            <h2 style={{ marginLeft: '5px' }}>Bookeroo</h2>
          </div>


          <div className='col-md-8'>
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


          <div className='col-md-2'>
            <div className="btn-group" role="group" aria-label="...">

              <button type="button" className="btn btn-default">My Cart</button>
              <button type="button" className="btn btn-default">My Orders</button>

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

export default Header;
