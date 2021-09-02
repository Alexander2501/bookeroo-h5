import React, { Component } from 'react';
import './personal.css'
class Personal extends Component {
    state={
        userInfo:{
            mobile:localStorage.getItem("mobile"),
            address:localStorage.getItem("address"),
            nickName:localStorage.getItem("nickName"),
        },
        username:localStorage.getItem("name")
    };
    render() {
        return (
            <div>
                {/* 详情页面 */}
                <h3>{this.state.username}</h3>
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