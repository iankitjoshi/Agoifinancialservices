import React from 'react';
import loader from 'assets/images/loader.gif'

function CustomLoader() {
  return (
    <div className="table-loader">
      <img src={loader} alt="" />
    </div>
  );
}

export default CustomLoader;
