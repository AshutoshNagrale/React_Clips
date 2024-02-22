import React, { useState, useMemo } from "react";
import data from "./data.json";
import Pagination from "./Pagination";
import "./styles.css";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);
  return (
    <>
      <div className="page-size-input">
        <h3>Page Size</h3>
        <input
          min="0"
          type="number"
          onInput={(e) => setPageSize(e.target.value)}
          placeholder={pageSize}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Main;
