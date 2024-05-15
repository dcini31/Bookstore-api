"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Customers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
