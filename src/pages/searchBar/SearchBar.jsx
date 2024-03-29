import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./searchbar.css";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [users, setUsers] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const data = await res.data;
      setUsers(data);
    };

    getData();
  }, []);

  const handleSearch = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  const displayCard = ({ name, email }) => {
    if (
      name.toLowerCase().includes(value) ||
      email.toLowerCase().includes(value)
    ) {
      return "searchCard";
    } else {
      return "hide";
    }
  };

  return (
    <div className="searchContainer">
      <Navbar />
      <div className="searchWrapper">
        <label htmlFor="search" className="searchTitle">
          Search
        </label>
        <input
          className="searchInput"
          type="text"
          id="search"
          onChange={handleSearch}
          placeholder="Type text"
        />
      </div>
      <div className="userCards">
        {users?.map((item, i) => {
          return (
            <div key={i} className={displayCard(item)}>
              <div className="header">{item.name}</div>
              <div className="body">{item.email} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
