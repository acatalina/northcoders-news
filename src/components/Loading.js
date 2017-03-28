import React from 'react';
import loading_gif from './loading.gif';
import '../css/loading.css';

const Loading = function() {
  return (
    <div className="loading">
      <img className="loading-img" src={loading_gif} />
    </div>
  );
};

export default Loading;