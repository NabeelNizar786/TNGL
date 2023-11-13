import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./UserProfile.css";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";

// ... (other imports)

function Bills() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
  
    const [user, setUser] = useState({ monthlyBills: [] });
  
    const handleLogout = (e) => {
      e.preventDefault();
      navigate("/login");
      localStorage.removeItem("token");
    };
  
    const getUserDetails = async () => {
      try {
        const response = await axios.post(
          "/api/user/bills",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
  
        console.log("Response from server:", response.data);
  
        // Check if user.monthlyBills is an array; if not, default to an empty array
        const monthlyBills = response.data.bills || [];
        setUser({ monthlyBills });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    const markAsPaid = async (billId) => {
      try {
        dispatch(showLoading());
  
        const response = await axios.post(
          "/api/user/mark-as-paid",
          {
            billId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
  
        dispatch(hideLoading());
  
        if (response.data.success) {
          toast.success("Bill marked as paid successfully");
          // Refresh user details after marking as paid
          getUserDetails();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error marking bill as paid:", error);
        dispatch(hideLoading());
      }
    };
  
    useEffect(() => {
      getUserDetails();
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
                to="/"
                className={
                  location.pathname === "/homePage"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/user-profile"
                className={
                  location.pathname === "/user-profile"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                User Profile
              </Link>
              <Link
                to="/bill-details"
                className={
                  location.pathname === "/bill-details"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Bill Details
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
          <div className="home-container-right">
            <h1 className="text-center">Bills</h1>
            <div className="main-container">
              {/* Display bills */}
              {user.monthlyBills.length > 0 ? (
              user.monthlyBills.map((bill) => (
                <div key={bill.id} className="card mb-3">
                  <div className="card-body">
                    <div className="row mt-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Month</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">{bill.month}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Payment Status</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">{bill.paymentStatus}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Amount</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">{bill.amount}</div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Units Consumed</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">{bill.unitsConsumed}</div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-12">
                        {bill.paymentStatus !== "paid" && (
                          <button
                            className="btn btn-success"
                            onClick={() => markAsPaid(bill.id)}
                          >
                            Mark as Paid
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
              ):(
                <p>No bills available.</p>
                )}
              {/* ... (your existing code) ... */}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Bills;
  