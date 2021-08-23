import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import IndexList from '../components/indexlist';
import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';
import Detail from '../components/detail/detail';
import MyOrder from '../components/myorder/myorder';
import SwipperBoot from '../components/swipperboot';

class Home extends Component {

    state = {
        bookClasses: ["All", "", "", ""],
        type: sessionStorage.getItem("type")
    }


    logout = () => {
        const url = "https://web.tootz.cn/api/open/user/logout";
        axios.post(url, {}).then(res => {

        }).catch(err => {
            console.log(err);
        })
        this.props.history.push('/login');
        sessionStorage.clear();
    }

    render() {
        let leftPanelShow = this.state.type == 1 || !sessionStorage.getItem('token') ? "none" : "block"
        let linkShow = this.state.type == 3 ? 'block' : 'none';
        let topShow = sessionStorage.getItem('token') ? "block" : "none";
        let topHide = sessionStorage.getItem('token') ? "none" : "block";
        return (
            <div className="container-fluid">
                <div style={{ textAlign: 'right', fontWeight: '10px', paddingRight: '30px' }}>
                    <span style={{ display: topShow, fontWeight: 'bold' }}>Welcom!</span>
                    <h4 style={{ display: topHide, fontWeight: 'bold' }}><Link to='/login'>Please Login</Link></h4>
                </div>

                <Header handleLogout={this.logout} />



                {/* function area */}
                <div className='row' style={{ padding: '10px 0' }}>

                    <div className='col-md-8 col-md-offset-2'>
                        <ul className="nav nav-tabs">

                            <li role="presentation" className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                    All <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to='/booklist' style={{ display: linkShow }}>All Books</NavLink></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>

                            <li role="presentation" className=""><a href="#">My Bookeroo</a></li>
                            <li role="presentation"><a href="#">My Comments</a></li>

                            <li role="presentation"><Link to='/orders'>My Orders</Link></li>
                            <li role="presentation">
                                <NavLink to='/user' style={{ display: linkShow }}>UserManage</NavLink>
                            </li>
                            <li role="presentation">
                                <NavLink to='/book'>BookManage</NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
                {/* Swipper area  */}
                {/* <div className='row'>
                    <div className='col-md-12'>
                        <SwipperBoot></SwipperBoot>
                    </div>
                </div> */}
                {/* main content */}
                <div className="row">
                    {/* <div className="col-md-2" style={{ paddingRight: '0px', display: leftPanelShow }}>

                        导航路由链接
                        <div className="panel panel-default">
                            <div className="panel-heading">Book Classification</div>
                            <div className="panel-body">
                               
                               <NavLink to='/booklist' style={{ display: linkShow }}>All Books</NavLink>
                                <NavLink className="list-group-item" to='/book'>BookManage</NavLink>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xs-12 col-md-10 col-md-offset-2">

                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/booklist' component={IndexList} />
                            <Route path='/book' component={BookList} />
                            <Route path='/user' component={UserList} />
                            <Route path='/detail' component={Detail} />
                            <Route path='/orders' component={MyOrder}></Route>
                            <Route path='/'>
                                <Redirect to='/booklist'></Redirect>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
