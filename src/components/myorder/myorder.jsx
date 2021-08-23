import React, { Component } from 'react';

class MyOrder extends Component {
    render() {
        return (
            <div>
                <p>
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-sort-by-attributes"></span>
                    </button>
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-sort-by-attributes-alt"></span>
                    </button>
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-sort-by-order"></span>
                    </button>
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-sort-by-order-alt"></span>
                    </button>
                </p>
            </div>
        );
    }
}

export default MyOrder;