import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser, isLoading, isError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    venueManager: false,
    password: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "venueManager") {
      value = value === "true";
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registered = await registerUser(formData);
      if (registered) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {isError && <p>Error occurred while registering.</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} required />
          </label>
          <label>
            Avatar:
            <input type="text" name="avatar" onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChange} required />
          </label>
          <label>
            Venue Manager:
            <select name="venueManager" onChange={handleChange}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
