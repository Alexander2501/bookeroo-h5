import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h2>Bookeroo</h2>
          
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search"/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
        </form>
        </header>
      </div>
    );
  }
}

export default Header;
