import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';

class Home extends Component {

    state = {
        bookClasses: ["All", "", "", ""]
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-2">
                        <Header />
                        {/*导航路由链接*/}
                        <div className="panel panel-default">
                            <div className="panel-heading">Book Classification</div>
                            <div className="panel-body">
                                <NavLink className="list-group-item" to='/user'>UserManage</NavLink>
                                <NavLink className="list-group-item" to='/book'>BookManage</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-10">
                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/user' component={UserList} />
                            <Route path='/book' component={BookList} />
                            <Route path='/'>
                                <Redirect to='/user'></Redirect>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
