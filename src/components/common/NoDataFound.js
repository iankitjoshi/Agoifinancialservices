import React from 'react'
import noData from '../../assets/images/nodata.svg'

function NoDataFound() {
   
   return(
      <div className="no-data-found">
         <img src={noData} />
         <h3>No Data Found</h3>
      </div>
   )
}

export default NoDataFound