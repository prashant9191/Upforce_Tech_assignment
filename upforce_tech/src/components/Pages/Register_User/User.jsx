import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./style.scss";
import axios from "axios";
import image from "../../../assets/avt.png";

const User = () => {
  const editData = useSelector(state => state.editData);
  const [formData, setFormData] = useState(() => {
    if (editData) {
      return {
        firstName: editData.fullname.split(" ")[0] || "",
        lastName: editData.fullname.split(" ")[1] || "",
        email: editData.email || "",
        password: "Defaultpassword",
        mobile: editData.mobile || "",
        gender: editData.gender || "",
        status: editData.status || "",
        profile: editData.profile || "",
        address: editData.address || "",
      };
    } else {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "Defaultpassword",
        mobile: "",
        gender: "",
        status: "",
        profile: "",
        address: "",
      };
    }
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
      const response = await axios.post(
        "https://upforce-tech.onrender.com/user/register",
        transformedData
      );
      console.log(response.data);
      // Handle the response from the API as needed
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during the API request
    }
  };

  return (
    <div className="user_Details">
      <h2>Register Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="profileImage">
        <img src={formData.profile ? formData.profile : image} alt="" />
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
