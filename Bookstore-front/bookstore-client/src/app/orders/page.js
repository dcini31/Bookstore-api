"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Orders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching orders data:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className={styles.main}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr>
                <td rowSpan={order.order_details.length}>{order.order_id}</td>
                <td>{order.order_details[0].book_title}</td>
                <td>{order.order_details[0].author}</td>
                <td>€ {order.order_details[0].price}</td>
                <td>{order.order_details[0].quantity}</td>
              </tr>
              {order.order_details.slice(1).map((detail) => (
                <tr key={detail.book_title}>
                  <td>{detail.book_title}</td>
                  <td>{detail.author}</td>
                  <td>{detail.price}</td>
                  <td>{detail.quantity}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
}
