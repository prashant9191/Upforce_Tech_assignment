import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./style.scss";
import axios from "axios";
import image from "../../../assets/avt.png";

const User = () => {
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "Defaultpassword",
    mobile: "",
    gender: "",
    status: "",
    profile: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedData = {
      fullname: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      gender: formData.gender,
      status: formData.status,
      profile: formData.profile,
      address: formData.address
    };
    
    try {
      setLoading(true);
      const response = await axios.post(
        "https://upforce-tech.onrender.com/user/register",
        transformedData
      );
      setLoading(false);
      console.log(response.data);
        alert("User has been added to data")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "Defaultpassword",
          mobile: "",
          gender: "",
          status: "",
          profile: "",
          address: "",
        })
    } catch (error) {
      setLoading(false);
      console.log(error);
 
    }
  };

  return (
    <div className="user_Details">
      <h2 >Register Your Details</h2>
      {loading && <h1 className="loading_Text">Please wait...</h1>}
      <form onSubmit={handleSubmit}>
        <div className="profileImage">
        <img src={formData.gender === 'Male'?'https://img.freepik.com/premium-vector/cartoon-man-elegant-human-resources_24877-17816.jpg?w=740':'https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?w=740'} alt="" />
        </div>
        <div>
          <div>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter FirstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              placeholder="Enter LastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <p>Email Address</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Mobile</p>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <p>Select Your Gender</p>
            <div>
              <div className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <p>Male</p>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <p>Female</p>
              </div>
            </div>
          </div>
          <div>
            <p>Select Your Status</p>
            <div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select..</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="profile">Choose a profile picture:</label>
            <input
              type="file"
              id="profile"
              name="profile"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Enter Your Location</p>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Location"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default User;
