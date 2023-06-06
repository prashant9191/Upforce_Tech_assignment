import React from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";

const View_User = () => {
  const viewData = useSelector(state => state.viewData);
  return (
    <div id='viewUser'>
      <div>
        <img src={viewData.gender === 'Male'?'https://img.freepik.com/premium-vector/cartoon-man-elegant-human-resources_24877-17816.jpg?w=740':'https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?w=740'} alt="" />
      </div>
      <div>
        <div>
          <p>Name:</p>
          <p className='Value_text'>{viewData.fullname}</p>
        </div>
        <div>
          <p>Status:</p>
          <p className='Value_text'>{viewData.status}</p>
        </div>
      </div>
      <div>
        <div>
          <p>Email:</p>
          <p className='Value_text'>{viewData.email}</p>
        </div>
        <div>
          <p>Mobile:</p>
          <p className='Value_text'>{viewData.mobile}</p>
        </div>
      </div>
      <div>
        <div>
          <p>Gender:</p>
          <p className='Value_text'>{viewData.gender}</p>
        </div>
        <div>
          <p>Address:</p>
          <p className='Value_text'>{viewData.address}</p>
        </div>
      </div>
    </div>
  )
}

export default View_User;
