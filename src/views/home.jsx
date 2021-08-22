import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

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


    logout = () => {
        const url = "https://web.tootz.cn/api/open/user/logout";
        axios.post(url, {}).then(res => {
            if (res.data.code == "1000000") {
                if (window.confirm("Are You Sure To Logout?")) {

                    this.props.history.push('/login');
                    sessionStorage.clear();
                }

            }

        }).catch(err => {
            console.log(err);
        })

    }

    render() {
        let leftPanelShow = this.state.type == 1 || !sessionStorage.getItem('token') ? "none" : "block"
        let linkShow = this.state.type == 3 ? 'block' : 'none';
        let topShow = sessionStorage.getItem('token') ? "block" : "none";
        let topHide = sessionStorage.getItem('token') ? "none" : "block";
        return (
            <div>
                <div style={{ textAlign: 'right', fontWeight: '10px', paddingRight: '30px' }}>
                    <span style={{ display: topShow, fontWeight: 'bold' }}>Welcom!</span>
                    <h4 style={{ display: topHide, fontWeight: 'bold' }}><Link to='/login'>Please Login</Link></h4>
                </div>
                <Header handleLogout={this.logout} />
                <div className="row">
                    <div className="col-xs-2" style={{ paddingRight: '0px', display: leftPanelShow }}>

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
