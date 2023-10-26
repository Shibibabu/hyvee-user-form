import { useState } from "react";
import axios from "axios";
import "../styles/main.scss";
const FormComponent = () => {
  const [formData, setFormData] = useState({
    age: "",
    nationality: "",
    gender: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/saveData", formData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-image">
          <h2 className="card-heading">
            Hi user
            <small>Please enter the details</small>
          </h2>
        </div>
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              name="name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="input-label">Name</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="age"
              className="input-field"
              value={formData.age}
              onChange={handleChange}
              required
              min={1}
            />
            <label className="input-label">Age</label>
          </div>
          <div className="input">
            <input
              type="text"
              name="nationality"
              className="input-field"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
            <label className="input-label">Nationality</label>
          </div>
          <div className="input">
            <input
              type="text"
              name="gender"
              className="input-field"
              value={formData.gender}
              onChange={handleChange}
              required
            />
            <label className="input-label">Gender</label>
          </div>
          <div className="action">
            <button className="action-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
