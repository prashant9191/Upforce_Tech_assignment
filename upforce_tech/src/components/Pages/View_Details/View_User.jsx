import React from 'react'
import "./style.scss";
import image from "../../../assets/avt.png";

const View_User = () => {
  return (
    <div id='viewUser'>
        <div>
            <img src={image} alt=""/>
        </div>
        <div>
            <div>
                <p>Name:</p>
                <p className='Value_text'>Prashant Verma</p>
            </div>
            <div>
                <p>Status:</p>
                <p  className='Value_text'>Active</p>
            </div>
        </div>
        <div>
            <div>
                <p>Email:</p>
                <p  className='Value_text'>P@gmail.com</p>
            </div>
            <div>
                <p>Mobile:</p>
                <p  className='Value_text'>9305633194</p>
            </div>
        </div>
        <div>
            <div>
                <p>Gender:</p>
                <p  className='Value_text'>Male</p>
            </div>
            <div>
                <p>Address:</p>
                <p  className='Value_text'>Lucknow Up</p>
            </div>
        </div>
    </div>
  )
}

export default View_User