import React from 'react';

const searchBar = ({ type = 'center', onChange = () => {}, onClick = () => {} }) => {
  const renderTypes = {
    'center': renderAtCenter,
    'top': renderLargeOnTop
  };
  const InputSearchField = renderTypes[type];
  
  return(<InputSearchField />);
};

const renderAtCenter = () => {
  return(
    <input type="text" render-at="center"/>
  );
}

const renderLargeOnTop = () => {
  return(
    <input type="text" render-at="top"/>
  );
}

export default searchBar;