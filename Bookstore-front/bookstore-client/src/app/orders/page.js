"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

const recordsPerPage = 5;

export default function Orders() {
  //State variables
  const [data, setData] = useState([]); // Stores all orders data
  const [isLoading, setIsLoading] = useState(true); //Flag for loading state
  const [error, setError] = useState(null); //Stores any errors during data fetching
  const [currentPage, setCurrentPage] = useState(1); //Current page number

  //Gets orders data on component mount
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

  //Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

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
          {currentRecords.map((order) => (
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
      {/* Pagination Controls */}
      <div>
        <ul className="pagination">
          {[...Array(nPages + 1).keys()].slice(1).map((page) => (
            <li
              className={`page-item ${currentPage === page ? "active" : ""}`}
              key={page}
            >
              <button className="page-link" onClick={() => changePage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
