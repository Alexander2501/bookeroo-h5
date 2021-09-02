import React, { Component } from 'react';
import './personal.css'
class Personal extends Component {
    state={
        userInfo:{
            userName:"lyric",
            email:'1546356192@qq.com',
            mobile:'12345678901',
            job:'coder',
            age:27,
            sex:'male'
        },
        username:"lyric"
    };
    render() {
        return (
            <div>
                {/* 详情页面 */}
                <h3>{this.state.userInfo.username}</h3>
                {/* <div className="col-sm-4 col-md-4" onClick={this.handleBuy}> */}
                {/* <div className="col-sm-6 col-md-6 row">
                    <label className="labelSpan">email:</label>
                    <span>{this.state.userInfo.email}</span>
                </div> */}
                <div className="col-sm-4 col-md-4 col-md-offset-4">
                    {Object.keys(this.state.userInfo).map((obj, idx) => (
                        <div className="row">
                            <div key={idx} className="listItemTitle">{obj} : </div> 
                            <div className="listItemValue">{this.state.userInfo[obj]}</div>  
                        </div>
                              
                    ))}
                    <div>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Personal;