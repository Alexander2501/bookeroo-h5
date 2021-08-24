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
import PaySuccess from './paysuccess';
import PayCancel from './paycancel';

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
        let linkShow = this.state.type == 3 ? 'block' : 'none';
        let topShow = sessionStorage.getItem('token') ? "block" : "none";
        let topHide = sessionStorage.getItem('token') ? "none" : "block";
        return (
            <div className="container-fluid">
                <div className='hidden-xs' style={{ textAlign: 'right', fontWeight: '10px', paddingRight: '30px' }}>
                    <span style={{ display: topShow, fontWeight: 'bold' }}>Welcom!</span>
                    <h4 style={{ display: topHide, fontWeight: 'bold' }}><Link to='/login'>Please Login</Link></h4>
                </div>

                <Header handleLogout={this.logout} />

                {/* function area */}
                <div className='row' style={{ padding: '10px 0' }}>
                    <div className='col-xs-12 col-md-8 col-md-offset-2'>
                        <ul className="nav nav-tabs funitem" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            <li role="presentation" className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                    All <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to='/booklist'>All Books</NavLink></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>

                            <li role="presentation" className=""><a href="#">Bookeroo</a></li>
                            <li role="presentation"><a href="#">Comments</a></li>

                            <li role="presentation"><Link to='/orders'>Orders</Link></li>
                            <li role="presentation" style={{ display: linkShow }}>
                                <NavLink to='/user'>UserManage</NavLink>
                            </li>
                            <li role="presentation" style={{ display: linkShow }}>
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

                    <div className="col-xs-12 col-md-10 col-md-offset-2">

                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/booklist' component={IndexList} />
                            <Route path='/book' component={BookList} />
                            <Route path='/user' component={UserList} />
                            <Route path='/detail' component={Detail} />
                            <Route path='/orders' component={MyOrder}></Route>

                            <Route path='/paysuccess' component={PaySuccess}></Route>
                            <Route path='/paycancel' component={PayCancel}></Route>

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
