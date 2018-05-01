import React from 'react';

import './searchBar.css';

const searchBar = ({ 
  className = '',
  value = '', 
  onChange = e => console.log(e),
  onClick = e => console.log(e),
  onBlur = e => console.log(e),
}) => {
  return (
    <input 
      type="text" 
      className={`${className} at-center`}
      value={value}
      placeholder="Search your planet"
      onChange={(e) => { onChange(e.target.value) }}
      onClick={(e) => { onClick(e) }}
      onBlur={(e) => { onBlur(e) }}
    />
  );
}
export default searchBar;