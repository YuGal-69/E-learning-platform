import React, { useState } from "react";
// import { Input, InputGroup, InputGroupText, Button } from "reactstrap";
// import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
<form onSubmit={handleSearch} className="d-flex align-items-center" style={{flexDirection:"column"}}>
    <InputGroup>
      <Button type="submit" color="none" className="border-0 bg-transparent p-2">
        <FaSearch />
      </Button>
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="border-0 shadow-none" 
        style={{ outline: "none", boxShadow: "none" , color:"#A7A7A7" }}
      />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
