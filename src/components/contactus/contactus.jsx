import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";
import './contactus.css'
import callPic from "../../assets/imgs/call.png"
import addressPic from "../../assets/imgs/address.png";
import emailPic from "../../assets/imgs/email.png";

export default class ContactUS extends Component {
    render() {
        return (
            <div>
                <h1>Contact</h1>
                <h4 className="hrefStyle"><Link to="/booklist">Home</Link></h4>
                <p className="descStyle">
                    If you would like to contact CBD,you can either contact to us directly or complete the form below.Please be assured that as soon as possible.</p>
                <table class="table table-bordered" className="tableStyle">
                <tr className="trStyle">
                    <th className="thTitle">
                        <span>Head Office</span></th>
                    <th className="thValue">
                        <img src={callPic} className="iconStyle"/>
                        <span>+61 3 9925 5005</span></th>
                </tr>
                <tr className="trStyle">
                    <th className="thTitle">
                        <span>Online Store</span></th>
                    <th className="thValue">
                        <div>
                            <img src={emailPic} className="iconStyle" />
                            <a href="#"><span>s3719110@student.rmit.edu.au</span></a>
                        </div>
                        <div>
                            <img src={addressPic} className="iconStyle"/>
                            <span>115 Queensberry St, Carlton VIC 3053</span>
                        </div>
                    </th> 
                </tr>
                {/* <tr className="trStyle">
                    <td>January</td>
                    <td>$100</td>
                </tr> */}
                </table>
            </div>
        )
    }
}
