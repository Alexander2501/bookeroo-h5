import React, { Component } from 'react';
import './detail.css'
class Detail extends Component {
    render() {


        return (

            <div className="row">
                <div className="col-xs-12 col-md-4 col-md-offset-2">
                    <div className="thumbnail">
                        <img src="https://i.loli.net/2021/08/22/7r1uPlpTyMhDBk5.png" alt="..." />
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="head">
                        <div className='bookname'>
                            <h2>A Journey to the Center of the Earth</h2>
                        </div>
                        <div className='bookdesc'>
                            <p>Gone with the wind is a romantic novel written by the famous American woman writer Margaret Michelle,
                                which reflects the theme of the civil war. The rebellious spirit and the spirit of hard work and self-improvement
                                shown by the protagonist Scarlett have always attracted readers.
                            </p>
                        </div>
                    </div>
                    <div className='bookinfo'>
                        <div className='infoitem'><span>Author:</span><span>Margaret Michelle</span></div>
                        <div className='infoitem'><span>Publishing&nbsp;House:</span><span>NJNU</span></div>
                        <div className='infoitem'><span>Publishing&nbsp;Time:</span><span>2018-08-20</span></div>
                    </div>
                    <div className='bookprice'>
                        <span>Price:</span><span>$25</span>
                    </div>
                    <div className="destination">
                        <form className="form-inline">
                            <div className="form-group">
                                <label style={{ color: 'gray', fontWeight: 'normal' }}>Deliver To:</label>
                                <input type="text" className="form-control" style={{ marginLeft: '10px' }} placeholder="Enter Address" />
                            </div>

                        </form>
                    </div>
                    <div className='purchase'>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">-</button>
                            </span>
                            <input type="text" className="form-control" placeholder="2" style={{ width: '50px' }} />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">+</button>
                            </span>
                        </div>
                        <p>
                            <button type="button" className="btn btn-primary">AddToCart</button>
                            <button type="button" className="btn btn-default">Parchase</button>
                        </p>
                    </div>

                </div>
            </div>

        );
    }
}

export default Detail;