import React, { Component } from 'react';
import './personal.css'
import callPic from "../../assets/imgs/call.png"
import addressPic from "../../assets/imgs/address.png";
import nickName from "../../assets/imgs/nickname.png";
class Personal extends Component {
    state={
        userInfo:{
            mobile:localStorage.getItem("mobile"),
            address:localStorage.getItem("address"),
            nickName:localStorage.getItem("nickName"),//address
            name:localStorage.getItem('name')
        },
        username:localStorage.getItem("name")
    };
    render() {
        return (
            <div>
                {/* 详情页面 */}
                <h3>{this.state.username}</h3>
                <div>
                        <div className="infoRow">
                            <div className="listItemTitle">
                                <img src={callPic} className="iconStyle"/>  
                                <span>Mobile: </span></div> 
                            <div className="listItemValue">{this.state.userInfo.mobile}</div>  
                        </div>
                        <div className="infoRow">
                            <div className="listItemTitle">
                                <img src={addressPic} className="iconStyle"/>
                                <span>Address: </span>
                            </div> 
                            <div className="listItemValue">{this.state.userInfo.nickName}</div>  
                        </div>
                        {/* <div className="infoRow">
                            <div className="listItemTitle">
                                <img src={nickName} className="iconStyle"/>
                                <span>Nickname: </span>
                            </div> 
                            <div className="listItemValue">{this.state.userInfo.name}</div>  
                        </div> */}
                    {/* {Object.keys(this.state.userInfo).map((obj, idx) => (
                        <div className="infoRow">
                            <div key={idx} className="listItemTitle">{obj} : </div> 
                            <div className="listItemValue">{this.state.userInfo[obj]}</div>  
                        </div>
                              
                    ))} */}
                    <div>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Personal;