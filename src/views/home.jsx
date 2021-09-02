import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import IndexList from '../components/indexlist';
// import MineList from '../components/mine/minelist';
import Header from "../components/header"
import UserList from '../components/userlist';
import BookList from '../components/booklist';
import Detail from '../components/detail/detail';
import MyOrder from '../components/myorder/myorder';
// import SwipperBoot from '../components/bswipper/swipperboot';
import PaySuccess from './paysuccess';
import PayCancel from './paycancel';
import AboutUs from '../components/aboutus/aboutus';
import ContactUS from '../components/contactus/contactus';
import SeachResult from '../components/search/seach';
import Personal from '../components/personal/personal'
class Home extends Component {

    state = {
        bookClasses: ["All", "", "", ""],
        type: localStorage.getItem("type")
    }
    componentDidMount() {
        // this.props.history.push('/booklist');
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        //设置请求头
        axios.defaults.headers.common["token"] = token;
        axios.defaults.headers.common["userId"] = userId;
        let url = "https://web.tootz.cn/api/book/publicList";
        let data = {
            pageNum: 1,
            pageSize: 1
        }
        axios.post(url, data).then(
            res => {
                //    console.log(res);
                if (res.data.code == '1000000') {

                } else {
                    alert(res.data.message);
                }
                if (res.data.code == '1000001') {
                    localStorage.clear();
                    this.props.history.push('/login');
                }
            }
        ).catch(err => {
            localStorage.clear();
            console.log(err);
        });
    }
    logout = () => {
        const url = "https://web.tootz.cn/api/open/user/logout";
        axios.post(url, {}).then(res => {

        }).catch(err => {
            console.log(err);
        })
        this.props.history.push('/login');
        localStorage.clear();
    }
    render() {
        let linkShow = this.state.type == 3 ? 'block' : 'none';
        let topShow = localStorage.getItem('token') ? "block" : "none";
        let topHide = localStorage.getItem('token') ? "none" : "block";
        return (
            <div className="container-fluid">
                <div className='hidden-xs' style={{ textAlign: 'right', fontWeight: '10px', paddingRight: '30px' }}>
                    <span style={{ display: topShow, fontWeight: 'bold' }}>Welcome!</span>
                    <h4 style={{ display: topHide, fontWeight: 'bold' }}><Link to='/login'>Please Login</Link></h4>
                </div>

                <Header handleLogout={this.logout} />

                {/* function area */}
                <div className='row' style={{ padding: '10px 0' }}>
                    <div className='col-xs-12 col-md-8 col-md-offset-2'>
                        <ul className="nav nav-tabs funitem" style={{ display: 'flex', flexWrap: 'nowrap', overflow: 'scroll' }}>
                            <li role="presentation" className=""><NavLink to='/booklist'>All</NavLink></li>
                            {/* <li role="presentation" className=""><NavLink to='/mine'>Mine</NavLink></li> */}
                            {/* <li role="presentation"><a href="#">Comments</a></li> */}
                            <li role="presentation"><Link to='/orders'>Orders</Link></li>
                            <li role="presentation" style={{ display: linkShow }}>
                                <NavLink to='/user'>UserManage</NavLink>
                            </li>
                            <li role="presentation">
                                <NavLink to='/book'>BookManage</NavLink>
                            </li>
                            {/* <li role="presentation">
                                <NavLink to='/aboutus'>AboutUs</NavLink>
                            </li>
                            <li role="presentation">
                                <NavLink to='/contactus'>ContactUS</NavLink>
                            </li> */}
                        </ul>
                    </div>

                </div>
                {/* Swipper area  */}
                {/* <SwipperBoot></SwipperBoot> */}
                {/* main content */}
                <div className="row">

                    <div className="col-xs-12 col-md-8 col-md-offset-2">

                        {/*可切换的路由组件*/}
                        <Switch>
                            <Route path='/booklist' component={IndexList} />
                            {/* <Route path='/mine' component={MineList} /> */}
                            <Route path='/book' component={BookList} />
                            <Route path='/user' component={UserList} />
                            <Route path='/detail' component={Detail} />
                            <Route path='/orders' component={MyOrder}></Route>
                            <Route path='/aboutus' component={AboutUs}></Route>
                            <Route path='/contactus' component={ContactUS}></Route>

                            <Route path='/search' component={SeachResult}></Route>

                            <Route path='/paysuccess' component={PaySuccess}></Route>
                            <Route path='/paycancel' component={PayCancel}></Route>
                            <Route path='/personal' component={Personal}></Route>


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
