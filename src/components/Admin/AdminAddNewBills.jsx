import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import logo from "../../logo.svg";

function AdminAddBills() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userId = new URLSearchParams(location.search).get('userId');
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminKey");
        navigate("/admin");
      };
    
      const addBill = async (e) => {
        try {
          e.preventDefault();
          const res = await axios.post("/api/admin/add-monthly-bill", {
            userId: userId,
            month: e.target.month.value,
            paymentStatus: e.target.paymentStatus.value,
            unitsConsumed: e.target.unitsConsumed.value,
            amount: e.target.amount.value,
          });
    
          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/adminHome')
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error("Error adding bill:", error);
          toast.error("Something went wrong");
        }
      };
    
      return (
        <>
          <div className="home-container">
            <div className="home-container-left">
              {/* ... (your existing code) ... */}
            </div>
            <div className="home-container-right">
              <div className="main-container">
                <h1>Add Bill</h1>
                <form onSubmit={addBill}>
                  
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Month</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="January"
                        name="month"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Payment Status</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="unpaid"
                        name="paymentStatus"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Amount</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="₹"
                        name="amount"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Units Consumed</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="100"
                        name="unitsConsumed"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <button className="btn btn-primary px-4" type="submit">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    export default AdminAddBills;