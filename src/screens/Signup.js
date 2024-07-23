import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const response = await fetch("http://localhost:4000/api/getlocation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latlong: { lat: latitude, long: longitude } })
      });
      const { location } = await response.json();
      setCredentials({ ...credentials, location });
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Could not fetch location. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/creatuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('authToken', json.authToken);
        navigate("/");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
          </div>
          <div className="m-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" name='location' placeholder='Click below for fetching address' value={credentials.location} onChange={onChange} required />
          </div>
          <div className="m-3">
            <button type="button" onClick={handleClick} name="geolocation" className="btn btn-success">Click for current Location</button>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' required />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
} 