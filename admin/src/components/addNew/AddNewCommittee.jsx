import axios from 'axios';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddNewCommittee = ({ setOpen }) => {
  // Local state variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'fullName':
        setFullName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'title':
        setTitle(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'year':
        setYear(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setTitle("")
    setPhone('');
    setYear('');
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload Image from the form data
    const userImage = new FormData();
    userImage.append('file', image);
    // upload preset
    userImage.append('upload_preset', 'upload');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        userImage
      );
      const { url } = response.data;

      // body
      const newCommitteeMember = {
        fullName: fullName,
        email: email,
        password: password,
        title: title,
        phone: phone,
        year: year,
        image: url,
      };
      const { data } = await axios.post(
        'http://localhost:4000/api/committees/register',
        newCommitteeMember
      );

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add New User </h3>
        <form onSubmit={handleSubmit} action="" className="form">
          {/* Full Name */}
          <div className="input-container">
            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={updateData}
              placeholder="Enter Full Name"
              className="input-field"
            />
          </div>

          {/* Email Address */}
          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={updateData}
              placeholder="Enter Email"
              className="input-field"
            />
          </div>

          {/* Password */}
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={updateData}
              placeholder="Enter Password"
              className="input-field"
            />
          </div>
            {/* Password */}
            <div className="input-container">
            <label htmlFor="title" className="input-label">
              Title / Role
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={updateData}
              placeholder="Enter Password"
              className="input-field"
            />
          </div>

          {/* Phone Number */}
          <div className="input-container">
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={updateData}
              placeholder="Enter Phone Number"
              className="input-field"
            />
          </div>

          {/* Service Year */}
          <div className="input-container">
            <label htmlFor="year" className="input-label">
              Service Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              value={year}
              onChange={updateData}
              placeholder="Enter Year"
              className="input-field"
            />
          </div>

          <div className="file-input-container">
            <input
              type="file"
              name="image"
              id="image"
              // upload only one image
              onChange={(e) => setImage(e.target.files[0])}
              className="file-field"
            />

            <label htmlFor="image" className="file-label">
              Image: <FaCloudUploadAlt className="icon" />
            </label>
          </div>

          <button className="add-btn">Send</button>
        </form>
      </section>
    </div>
  );
};

export default AddNewCommittee;
