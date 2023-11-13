import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import "./UsersList.css";
import { toast } from "react-hot-toast";
import axios from "axios";

function UsersList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminKey");
    navigate("/admin");
  };

  const handleUserdelete = async (id) => {
    try {
      const response = await axios.post("/api/admin/delete-user-by-id", {
        id: id,
      });
      if (response.data.success) {
        getData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somethin went wrong");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.post("/api/admin/users-list");
      if (response.data.success) {
        setUsers(response.data.users);
        console.log(users);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-container-left">
          <div className="side-nav">
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="nav-lists">
              <Link
                to="/adminHome"
                className={
                  location.pathname === "/adminHome"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/users-list"
                className={
                  location.pathname === "/users-list"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Users List
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
          <div className="main-container">
            <h1>Users List</h1>
            {/* Template Start */}
            <Link to="/admin-add-user" className="btn btn-secondary mt-4 mb-2">
              Add user
            </Link>
            <div class="input-group flex-nowrap mt-2 mb-2">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa fa-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="main-box clearfix">
                    <div class="table-responsive">
                      <table class="table user-list">
                        <thead>
                          <tr>
                            <th>
                              <span>User</span>
                            </th>
                            <th>
                              <span>Created</span>
                            </th>
                            <th class="text-center">
                              <span>Status</span>
                            </th>
                            <th>
                              <span>Email</span>
                            </th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users
                            .filter((user) => {
                              return search.toLowerCase() === ""
                                ? user
                                : user.name.toLowerCase().includes(search)
                            })
                            .map((user) => (
                              <>
                                <tr>
                                  <td>
                                    <img
                                      src={user?.profile}
                                      alt={user?.profile}
                                      key={user?.id}
                                    />
                                    <p class="user-link">{user?.name}</p>
                                  </td>
                                  <td>{user?.createdAt}</td>
                                  <td class="text-center">
                                    <span class="label label-default">
                                      Active
                                    </span>
                                  </td>
                                  <td>
                                    <p>{user?.email}</p>
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    <Link
                                      to={`/admin-user-edit?id=${user?._id}`}
                                      class="table-link"
                                    >
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </Link>
                                    <Link
                                      onClick={() => handleUserdelete(user?._id)}
                                      class="table-link danger"
                                    >
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </Link>
                                    <Link
                                    to={`/admin-new-bill?userId=${user?._id}`}
                                    className="btn btn"
                                    >
                                    <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x"></i>
              <i className="fa fa-credit-card fa-stack-1x fa-inverse"></i>
            </span>
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Template End */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
