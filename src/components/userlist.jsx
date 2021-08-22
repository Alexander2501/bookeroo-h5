import axios from "axios";
import React, { Component } from "react";

export default class UserList extends Component {
  state = {
    userList: [],
    mail: '',
    type: 1,
    name: '',
    nickName: '',
    phoneNumber: '',
    status: '',
    userId: '',
    modalField: ['mail', "type", 'name', 'nickName', 'phoneNumber', 'status']
  };

  componentDidMount() {
    const url = "https://web.tootz.cn/api/open/user/list";
    let userId = sessionStorage.getItem("userId");
    let token = sessionStorage.getItem("token");
    //设置请求头
    axios.defaults.headers.common["token"] = token;
    axios.defaults.headers.common["userId"] = userId;
    axios
      .post(url, {
        pageNum: 1,
        pageSize: 10
      })
      .then((res) => {
        let result = res.data.data;
        this.setState({
          userList: result.entity
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUser = () => {
    let mail = this.addMail.value.toString();
    let type = parseInt(this.addType.value);
    let name = this.addName.value.toString();
    let nickName = this.addNickName.value.toString();
    let phoneNumber = this.addPhoneNum.value.toString();
    let status = parseInt(this.addStatus.value);
    const url = "https://web.tootz.cn/api/open/user/set";
    let data = {
      mail,
      type,
      name,
      nickName,
      phoneNumber,
      status
    }
    axios.post(url, data).then(
      res => {
        console.log(res);
      }
    ).catch(err => {
      console.log(err);
    });

  };

  openEditModal = (index) => {
    console.log(index);
    let userMes = this.state.userList[index];
    console.log(userMes);
    let mail = userMes.mail;
    let type = parseInt(userMes.type);
    let name = userMes.name == null ? "null" : userMes.name;
    let nickName = userMes.nickName == null ? "null" : userMes.nickName;
    let phoneNumber = userMes.phoneNumber == null ? "null" : userMes.phoneNumber;
    let status = parseInt(userMes.status);
    let userId = userMes.userId;

    this.setState({
      mail,
      type,
      name,
      nickName,
      phoneNumber,
      status,
      userId
    });


  }
  //修改用户input值获取
  handleEditChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    switch (e.target.name) {
      case 'mail':
        this.setState({
          mail: e.target.value.toString()
        });
        break;
      case 'type':
        this.setState({
          type: e.target.value
        });
        break;
      case 'name':
        this.setState({
          name: e.target.value.toString()
        });
        break;
      case 'nickName':
        this.setState({
          nickName: e.target.value.toString()
        });
        break;
      case 'phoneNumber':
        this.setState({
          phoneNumber: e.target.value.toString()
        });
        break;
      case 'status':
        this.setState({
          status: e.target.value
        });
        break;
      default:
        break;
    }

  }
  //用户修改
  updateUser = () => {
    const url = "https://web.tootz.cn/api/open/user/set";
    console.log(this.state.nickName);
    // debugger
    let data = {
      mail: this.state.mail,
      type: this.state.type,
      name: this.state.name,
      nickName: this.state.nickName,
      phoneNumber: this.state.phoneNumber,
      status: this.state.status,
      userId: this.state.userId
    }
    axios.post(url, data).then(
      res => {
        console.log(res);
      }
    ).catch(err => {
      console.log(err);
    });

  };
  //用户删除
  deleteUser = (index) => {
    if (window.confirm("Confirm Delete？")) {
      const url = "https://web.tootz.cn/api/open/user/delete";
      let userId = this.state.userList[index].userId;

      let data = { userId };
      axios
        .post(url, data)
        .then((res) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { userList } = this.state;
    return (
      <div>
        <div className="page-header text-center">
          <h2>User Management</h2>
        </div>

        <div className='row'>
          <div className='col-xs-8'>
            <button className="btn btn-primary" data-toggle="modal" data-target="#addModal">
              Add
            </button>

          </div>
          <div className='col-xs-4'>
            <form className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail2"
                />
              </div>
              <button type="submit" className="btn btn-default">
                Search
              </button>
            </form>
          </div>

        </div>


        <div className='row'>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>UserName</td>
                  <td>NickName</td>
                  <td>Mail</td>
                  <td>Type</td>
                  <td>PhoneNumber</td>
                  <td>Status</td>
                  <td>Control</td>
                </tr>
                {userList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.nickName}</td>
                    <td>{item.mail}</td>
                    <td>{item.type}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#editModal"
                        onClick={() => { this.openEditModal(index) }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn btn-danger"
                        onClick={() => {
                          this.deleteUser(index);
                        }}
                        style={{ marginLeft: "5px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



        {/* EditModal */}
        <div
          className="modal fade"
          id="editModal"

          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Edit User
                </h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.mail}
                      name="mail"
                      onChange={this.handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <input
                      type="text"
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      placeholder="Type"
                      onChange={this.handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      placeholder="Name"
                      onChange={this.handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>NickName</label>
                    <input
                      type="text"
                      name="nickName"
                      className="form-control"
                      value={this.state.nickName}
                      placeholder="NickName"
                      onChange={this.handleEditChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>PhoneNumber</label>
                    <input
                      type="text"
                      name="pwd"
                      value={this.state.phoneNumber}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={this.handleEditChange}
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      placeholder="Status"
                      onChange={this.handleEditChange}
                    />
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.updateUser}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AddModal */}
        <div
          className="modal fade"
          id="addModal"
          role="dialog"
          aria-labelledby="myModalLabel1"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Add User
                </h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="mail"
                      ref={value => this.addMail = value}
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <input
                      type="text"
                      name="type"
                      className="form-control"
                      placeholder="Type"
                      ref={value => this.addType = value}
                    />
                  </div>
                  <div className="form-group">
                    <label>name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"

                      placeholder="Name"
                      ref={value => this.addName = value}
                    />
                  </div>
                  <div className="form-group">
                    <label>NickName</label>
                    <input
                      type="text"
                      name="nickname"
                      className="form-control"

                      placeholder="NickName"
                      ref={value => this.addNickName = value}
                    />
                  </div>
                  <div className="form-group">
                    <label>PhoneNumber</label>
                    <input
                      type="text"
                      name="pwd"

                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      ref={value => this.addPhoneNum = value}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      placeholder="Status"
                      ref={value => this.addStatus = value}
                    />
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
