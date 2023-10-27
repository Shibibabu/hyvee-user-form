import { useState } from "react";
import axios from "axios";
import "../styles/main.scss";
const FormComponent = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setName(value);
    setResult({});
  };

  const getAge = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await axios.get(`https://api.agify.io?name=${name}`);
        if (data.data?.age) {
          resolve(data.data.age);
        } else {
          resolve("N/A");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getNationality = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await axios.get(`https://api.nationalize.io?name=${name}`);
        if (data.data?.country?.[0]?.country_id) {
          resolve(data.data.country[0]?.country_id);
        } else {
          resolve("N/A");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getGender = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await axios.get(`https://api.genderize.io?name=${name}`);
        if (data.data?.gender) {
          resolve(data.data.gender);
        } else {
          resolve("N/A");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [age, nationality, gender] = await Promise.all([
        getAge(),
        getNationality(),
        getGender(),
      ]);
      setResult({ age, nationality, gender });
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
              value={name}
              onChange={handleChange}
              required
            />
            <label className="input-label">Name</label>
          </div>
          {result && Object.keys(result)?.length > 0 && (
            <>
              <div className="input">
                <input
                  type="text"
                  name="age"
                  className="input-field"
                  value={result.age}
                />
                <label className="input-label">Age</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  name="nationality"
                  className="input-field"
                  value={result.nationality}
                />
                <label className="input-label">Nationality</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  name="gender"
                  className="input-field"
                  value={result.gender}
                />
                <label className="input-label">Gender</label>
              </div>
            </>
          )}

          <div className="action">
            <button className="action-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
