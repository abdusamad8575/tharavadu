
import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    gender: '',
    fatherName: '',
    motherName: '',
    grandmotherName: '',
    photo: null,
    address: '',
    temAddress: '',
    phone: '',
    job: '',
    marriageStatus: '',
    spouseName: '',
    children: [{ name: '', age: '', gender: '' }],
    subgroup: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;


    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };


  const handleChildrenChange = (index, field, value) => {
    const updatedChildren = [...formData.children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setFormData((prevState) => ({
      ...prevState,
      children: updatedChildren,
    }));
  };

  const addChild = () => {
    setFormData((prevState) => ({
      ...prevState,
      children: [...prevState.children, { name: '', age: '', gender: '' }],
    }));
  };

  const removeChild = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      children: prevState.children.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setDisable(false)
      return;
    }

    const submissionData = new FormData();
    for (const key in formData) {
      if (key === 'children') {
        formData.children.forEach((child) => {
          submissionData.append(`childrenName`, child.name);
          submissionData.append(`childrenAge`, child.age);
          submissionData.append(`childrenGender`, child.gender);
        });
      } else {
        submissionData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/user/userDetails`, {
        method: 'POST',
        body: submissionData,
      });

      if (response.ok) {
        alert('Registration successful!');
        setDisable(false)
        setFormData({
          name: '',
          age: '',
          dob: '',
          gender: '',
          fatherName: '',
          motherName: '',
          grandmotherName: '',
          photo: null,
          address: '',
          temAddress: '',
          phone: '',
          job: '',
          marriageStatus: '',
          spouseName: '',
          children: [{ name: '', age: '', gender: '' }],
          subgroup: '',
          userName: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/')
      } else {
        if(response.status === 400){
          alert('User with this email already exists');
        }else{
          alert('Registration failed. Please try again.');
        }
        
        setDisable(false)
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
      setDisable(false)
    }
  };

  return (
    <>
      <nav className="navbar-login">
        <div className="navbar-login-container">
          <a href="/" className="navbar-login-logo">
            <span className="logo-text">SREEPALATTU</span>
            <span className="logo-subtext">THARAVADU</span>
          </a>
          <div className="navbar-login-message">
            SECURE Register
          </div>
        </div>
      </nav>
      <div className="register-container">
        <div className="register-box">
          <h2>Create an Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">FULL NAME (CAPITAL LETTER ONLY,  INITIAL AFTER NAME ONLY)</label>
              <input type="text" id="name" name="name"
                value={formData.name}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="age">AGE</label>
              <input type="number" id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="dob">DATE OF BIRTH</label>
              <input type="date" id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="gender">GENDER</label>
              <select id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required>
                <option value="" disabled>SELECT GENTER</option>
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
                <option value="other">OTHER</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fatherName">FATHER NAME  (CAPITAL LETTER ONLY, INITIAL AFTER NAME)
              </label>
              <input type="text" id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="motherName">MOTHER NAME  (CAPITAL LETTER ONLY, INITIAL AFTER NAME)
              </label>
              <input type="text" id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="grandmotherName">GRAND MOTHERS NAME  (CAPITAL LETTER ONLY, INITIAL AFTER NAME)
              </label>
              <input type="text" id="grandmotherName"
                name="grandmotherName"
                value={formData.grandmotherName}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="subgroup">SUB GROUP</label>
              <select id="subgroup"
                name="subgroup"
                value={formData.subgroup}
                onChange={handleChange}
                required >
                <option value="" disabled>SELECT SUB GROUP</option>
                <option value="PALATTU CHIRAKKARA">PALATTU CHIRAKKARA</option>
                <option value="PALATTU MEETHALE">PALATTU MEETHALE</option>
                <option value="PALATTU KANNANKAI">PALATTU KANNANKAI</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="photo">UPLOAD PHOTO</label>
              <input type="file" id="photo"
                name="photo"
                onChange={handleChange}
                required
                accept="image/*"
                 />
            </div>
            <div className="form-group">
              <label htmlFor="address">PERMANENT ADDRESS</label>
              <input type="text" id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="TemAddress"> TEMPORARY ADDRESS</label>
              <input type="text" id="TemAddress"
                name="temAddress"
                value={formData.temAddress}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">PHONE NUMBER OR LANDLINE NUMBER (PHONE NUMBER WITH COUNTRY CODE)
              </label>
              <input type="tel" id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="job">PROFESSION </label>
              <input type="text" id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="marriageStatus">MARRIAGE STATUS</label>
              <select id="marriageStatus"
                name="marriageStatus"
                value={formData.marriageStatus}
                onChange={handleChange}
                required >
                <option value="" disabled>SELECT STATUS</option>
                <option value="no">NO</option>
                <option value="yes">YES</option>
              </select>
            </div>
            {formData.marriageStatus === 'yes' && (
              <>
                <div className="form-group">
                  <label htmlFor="spouseName">SPOUSE'S NAME</label>
                  <input type="text" id="spouseName"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleChange}
                    required />
                </div>
                {formData.children.map((child, index) => (
                  <div key={index} className="child-group">
                    <div className="form-group">
                      <label>Child {index + 1} Name</label>
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) => handleChildrenChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="form-group">
                        <label>CHILD {index + 1} AGE</label>
                        <input
                          type="number"
                          value={child.age}
                          onChange={(e) => handleChildrenChange(index, 'age', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender">GENDER</label>
                        <select id="gender" value={child.gender} onChange={(e) => handleChildrenChange(index, 'gender', e.target.value)} required>
                          <option value="" disabled>SELECT GENTER</option>
                          <option value="male">MALE</option>
                          <option value="female">FEMALE</option>
                          <option value="other">OTHER</option>
                        </select>
                      </div>
                    </div>
                    <button type="button" className='add-button' style={{ width: '100%', marginBottom: '10px' }} onClick={() => removeChild(index)}>REMOVE CHILD</button>
                  </div>
                ))}
                <button type="button" className='add-button' style={{ marginBottom: '10px' }} onClick={addChild}>ADD CHILD</button>
              </>
            )}

            <div className="form-group">
              <label htmlFor="username">E MAIL ID</label>
              {/* <input type="email" id="username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required /> */}
              <input
                type="email"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input type="password" id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input type="password" id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required /></div>
            <button type="submit" disabled={disable} className="register-button">REGISTER</button>
          </form>
        </div >
      </div >
    </>
  );
}

export default Register;