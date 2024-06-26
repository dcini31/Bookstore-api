"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

const recordsPerPage = 5;

export default function Customers() {
  //State variables
  const [data, setData] = useState([]); // Stores all orders data
  const [isLoading, setIsLoading] = useState(true); //Flag for loading state
  const [error, setError] = useState(null); //Stores any errors during data fetching
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  //Gets customers data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/customers");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
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
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
            </tr>
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
