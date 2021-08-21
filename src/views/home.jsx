import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';
import Detail from '../components/detail';
import MyOrder from '../components/myorder/myorder';

class Home extends Component {

    state = {
        bookClasses: ["All", "", "", ""],
        type: sessionStorage.getItem("type")
    }

    render() {
        let linkShow = this.state.type == 3 ? 'block' : 'none'
        return (

            <div>
                <div className="row">
                    <div className="col-xs-2" style={{ paddingRight: '0px' }}>
                        <div className="App-header">
                            <h2>Bookeroo</h2>
                        </div>
                        {/*导航路由链接*/}
                        <div className="panel panel-default">
                            <div className="panel-heading">Book Classification</div>
                            <div className="panel-body">
                                <NavLink className="list-group-item" to='/user' style={{ display: linkShow }}>UserManage</NavLink>
                                <NavLink className="list-group-item" to='/book'>BookManage</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-10">
                        <Header />
                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/book' component={BookList} />
                            <Route path='/user' component={UserList} />
                            <Route path='/detail' component={Detail} />
                            <Route path='/orders' component={MyOrder}></Route>
                            <Route path='/'>
                                <Redirect to='/book'></Redirect>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
