import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import BackendServices from "../services/BackendServices";
import "../App.css";
import UploadFiles from "./UploadFiles";
import axios from "axios";

function Home(props) {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState();
  const [paymentMessage, setPaymentMessage] = useState();

  useEffect(() => {
    const user = BackendServices.getUserDetails().then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const paymentHandler = async (e) => {
    var orderData = "";
    if (amount >= 1) {
      const API_URL = "http://localhost:8080/";
      e.preventDefault();
      const orderUrl = `${API_URL}api/details/user/order`;
      await axios
        .post(orderUrl, { amount })
        .then((response) => {
          orderData = response.data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
      const options = {
        key: orderData.key,
        name: orderData.name,
        description: orderData.description,
        amount: orderData.amount,
        //order_id: 1,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;

            var order_id = orderData.receipt;
            const url = `${API_URL}api/details/user/capture/${paymentId}/${order_id}`;
            const captureResponse = await axios
              .post(url, {})
              .then((response) => {
                setPaymentMessage("payment Successful");
              })
              .catch((err) => {
                console.log(err);
                throw err;
              });
            console.log(captureResponse.data);
          } catch (err) {
            console.log(err);
          }
        },
        theme: {
          color: "#686CFD",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  return (
    <>
      <Header />
      <main id="main">
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li>Secured Home </li>
            </ol>
          </div>
        </section>
        <section className="inner-page">
          <div className="container">
            <div class="section-title">
              <h2>Welcome {user.firstName} </h2>
            </div>
            <h2>Instruction</h2>
            <p>
              Please upload all your required documents and pay the required
              amount.
            </p>
            <div className="row">
              <div className="col-7">
                <UploadFiles />
              </div>
              <div className="col-5">
                {paymentMessage && (
                  <div class="alert alert-success" role="alert">
                    Payment Successful
                  </div>
                )}
                <h3>Please enter the amount you want to pay </h3>
                <form>
                  <div className="input-group">
                    <input
                      type="amount"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="E.g.100"
                      aria-label="Amount to be paid"
                      required
                    />
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={paymentHandler}
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div></div>
        </section>
      </main>
    </>
  );
}

export default withRouter(Home);
