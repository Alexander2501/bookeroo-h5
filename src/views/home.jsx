import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />

                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        {/*导航路由链接*/}
                        <NavLink className="list-group-item" to='/user'>UserManage</NavLink>
                        <NavLink className="list-group-item" to='/book'>BookManage</NavLink>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/*可切换的路由组件*/}
                                <Switch>
                                    <Route path='/user' component={UserList} />
                                    <Route path='/book' component={BookList} />
                                    <Redirect to='/user' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
