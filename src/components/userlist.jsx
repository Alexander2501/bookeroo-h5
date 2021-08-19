import axios from 'axios';
import React, { Component } from 'react'


export default class UserList extends Component {
    state = {
        userList: [{
            name: 'lifa',
            password: '123',
            phoneNumber: '11111111'
        }, {
            name: 'lifa222',
            password: '123222',
            phoneNumber: '2222222'
        }]
    }

    componentDidMount() {
        const url = "";
        let data = {}
        axios.post(url, data).then(res => {

        }).catch(err => {

        });
    }


    deleteUser = (index) => {
        if(window.confirm("Confirm Delete？")){
            console.log(index);
        }
    }

    render() {
        const { userList } = this.state;
        return (
            <div>
                <div className="panel panel-default">

                    <div className="panel-heading">USER MANAGEMENT</div>
                    <div className="panel-body">
                       <button>Add</button>
                    </div>

                    <table className="table">
                       <tbody>
                       <tr>
                            <td>ID</td>
                            <td>UserName</td>
                            <td>PassWord</td>
                            <td>PhoneNumber</td>
                            <td>Control</td>
                        </tr>
                        {
                        userList.map((item,index)=>
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                <button>修改</button>
                                <button onClick={()=>{this.deleteUser(index)}}>删除</button>
                                </td>
                            </tr>)
                        }
                       </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
