import React, { useState } from "react";
import "./style.scss";
import image from "../../../assets/avt.png";
import apis from "../../utils/api";
const createUserfromApi=apis.createUserfromApi;
const User = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    avatar: "",
    location: "",
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
    try {
      console.log(formData)
      let { statusCode, message }= await createUserfromApi(formData);
      console.log({ statusCode, message });
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
          <img src={image} alt="" />
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
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <p>Male</p>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="avatar">Choose a profile picture:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Enter Your Location</p>
            <input
              type="text"
              name="location"
              placeholder="Enter Your Location"
              value={formData.location}
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
