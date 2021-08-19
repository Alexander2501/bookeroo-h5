import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';

class Home extends Component {

    state = {
        bookClasses: ["All","","",""]
    }

    render() {
        return (
            <div>
                <Header />

                <div className="row">

                    <div className="col-xs-6 col-md-offset-2">
                        <ul className="nav nav-pills  nav-justified">
                            <li role="presentation" className="active"><a href="#">Books</a></li>
                            <li role="presentation"><a href="#">Cart</a></li>
                            <li role="presentation"><a href="#">Buy Again</a></li>
                            <li role="presentation"><a href="#">About</a></li>
                            <li role="presentation"><a href="#">Contact-us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-2">
                        {/*导航路由链接*/}
                        <div className="panel panel-default">
                            <div class="panel-heading">Book Classification</div>
                            <div className="panel-body">
                                <NavLink className="list-group-item" to='/page/user'>UserManage</NavLink>
                                <NavLink className="list-group-item" to='/page/book'>BookManage</NavLink>
                            </div>

                        </div>

                    </div>
                    <div className="col-xs-9">
                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/page/user' component={UserList} />
                            <Route path='/page/book' component={BookList} />
                            <Route>
                                <Redirect to='/page/user' />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
