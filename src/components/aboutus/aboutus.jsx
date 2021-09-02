import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";
import './aboutus.css'
export default class AboutUs extends Component {
    render() {
        return (
            <div>
                <h1>About US</h1>
                {/* <h1>Contact</h1> */}
                <h4 className="hrefStyle"><Link to="/booklist">Home</Link></h4>
                <p className="descStyle">Bookroo is a book trading platform for enterprises and individuals，you can find all kinds of high-quality and affordable books here,enjoy!</p>            </div>
        )
    }
}
