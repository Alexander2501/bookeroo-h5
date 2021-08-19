import axios from "axios";
import React, { Component } from "react";

export default class UserList extends Component {
  state = {
    userList: [
      {
        mail: '1191376090@qq.com',
        type: 1,
        name: "lifa",
        nickName: 'alfa',
        phoneNumber: "11111111",
        status: 'blocked'
      },
      {
        mail: '1191376090@qq.com',
        type: 1,
        name: "lifa",
        nickName: 'alfa',
        phoneNumber: "11111111",
        status: 'blocked'
      },
    ],
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
          userList:result.entity
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUser = () => { };

  updateUser = () => {
    alert("click update");
  };

  deleteUser = (index) => {
    if (window.confirm("Confirm Delete？")) {
      const url = "https://web.tootz.cn/api/open/user/delete";
      let userId = sessionStorage.getItem("userId");
      let token = sessionStorage.getItem("token");
      let data = { userId };
      axios
        .post(url, data)
        .then((res) => {
          let result = res.data;
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
        <div className="panel panel-default">
          <div className="panel-heading">USER MANAGEMENT</div>
          <div className="panel-body">
            <div className="col-md-2">
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addModal"
              >
                Add
              </button>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-6">
              <form class="form-inline">
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

          <div
            className="modal fade"
            id="editModal"
            tabindex="-1"
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
                    Modal title
                  </h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div class="form-group">
                      <label>Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <label>PhoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
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

          <div
            className="modal fade"
            id="addModal"
            tabindex="-1"
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
                    Add User
                  </h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div class="form-group">
                      <label>Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <label>PhoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
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
        </div>
      </div>
    );
  }
}
