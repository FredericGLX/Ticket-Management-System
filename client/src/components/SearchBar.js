import ProjectService from '../services/project.service';
import { useEffect, useState } from 'react';

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      <input placeholder="Search" onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
