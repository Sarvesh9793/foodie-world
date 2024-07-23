import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    const response = await fetch("http://localhost:4000/api/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    });

    const data = await response.json();
    setOrderData(data);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData && orderData.orderData ? orderData.orderData.order_data.slice(0).reverse().map((dayOrder, dayIndex) => (
            <div key={dayIndex} className="w-100">
              <div className="m-auto mt-5">
                <h5>Order Date: {dayOrder[0]?.Order_date}</h5>
                <hr />
              </div>
              {dayOrder.map((item, itemIndex) => (
                item.Order_date ? null : (
                  <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                      <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container w-100 p-0" style={{ height: "38px" }}>
                          <span className="m-1">Qty: {item.qty}</span>
                          <span className="m-1">Size: {item.size}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )) : <div>No orders found</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
