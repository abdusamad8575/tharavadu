
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, Grid, Typography } from '@mui/material';
// import PageLayout from 'layouts/PageLayout';
// import { downloadUserPDF } from 'queries/OrderQuery';

// const EditUsers = () => {
//   const { state } = useLocation();
//   const { user } = state;
//   const [details, setDetails] = useState(user);

//   useEffect(() => {
//     setDetails(user);
//   }, [user]);

//   const downloadPDF = (e) => {
//     e.preventDefault();
//     downloadUserPDF(details?._id);
//   };

//   return (
//     <PageLayout title="User Details">
//       {!details ? (
//         <Typography fontSize={14} sx={{ paddingX: 5 }}>
//           Loading...
//         </Typography>
//       ) : (
//         <Grid container spacing={5} display="flex" direction="row" p={8} justifyContent="center">
//           <Grid item container alignContent="start" width="100%" xs={12}  spacing={3}>

//             <Grid p={1}>
//               <img style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
//                 src={`${process.env.REACT_APP_API_URL}/uploads/${details?.photo}`} />
//             </Grid>
//             <Grid p={1}>
//               <Typography variant='body2'><strong>Name: </strong> {details?.name}</Typography>
//               <Typography variant='body2'><strong>Age: </strong> {details?.age}</Typography>
//               <Typography variant='body2'><strong>Gender: </strong> {details?.gender}</Typography>
//               <Typography variant='body2'><strong>DOB: </strong>{new Date(details?.dob).toISOString().split('T')[0]}</Typography>
//               <Typography variant='body2'><strong>Father: </strong> {details?.fatherName}</Typography>
//               <Typography variant='body2'><strong>Mother: </strong>{details?.motherName}</Typography>
//               <Typography variant='body2'><strong>Grand Mother: </strong>{details?.grandmotherName}</Typography>
//               <Typography variant='body2'><strong>Sub Group: </strong>{details?.subgroup}</Typography>
//               <Typography variant='body2'><strong>Job: </strong>{details?.job}</Typography>
//               <Typography variant='body2'><strong>Phone: </strong>{details?.phone}</Typography>
//               <Typography variant='body2'><strong>Address: </strong> {details?.address}</Typography>
//               <Typography variant='body2'><strong>Temp Address: </strong>{details?.temAddress}</Typography>
//               <Typography variant='body2'><strong>User Name: </strong>{details?.userName}</Typography>
//               <Typography variant='body2'><strong>Marriage Status: </strong>{details?.marriageStatus}</Typography>
//               {details?.spouseName && <Typography variant='body2'><strong>Spouse Name: </strong>{details?.spouseName}</Typography>}
//               {details?.children && <Grid p={1} container spacing={1} xs={12}>
//               <Typography variant='body2'><strong>Children Details: </strong></Typography>
//                 {details?.children.map((chil, index) => (
//                   <Grid item key={index} style={{border:'1px solid black' ,padding:'5px',borderRadius:'5px',width:'100%'}}>
//                     <Typography variant='body2'><strong>Children Name:</strong> {chil.name}</Typography>
//                     <Typography variant='body2'><strong>Children Age: </strong> {chil.age}</Typography>
//                     <Typography variant='body2'><strong>Children Gender: </strong> {chil.gender}</Typography>

//                   </Grid>
//                 ))}
//               </Grid>}
//             </Grid>

//           </Grid>
//             <Button onClick={downloadPDF}>Download User Details</Button>
//         </Grid>
//       )}
//     </PageLayout>
//   );
// };

// export default EditUsers;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material';
import PageLayout from 'layouts/PageLayout';
import { downloadUserPDF, updateUserDetails } from 'queries/OrderQuery';

const EditUsers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = state;
  const [details, setDetails] = useState(user);
  const [password, setPassword] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    setDetails(user);
    setPhotoPreview(`${process.env.REACT_APP_API_URL}/uploads/${user?.photo}`)
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDetails((prev) => ({ ...prev, photo: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    // console.log('password',password);
    
    const payload = {
      ...details,
      children: JSON.stringify(details.children), 
      pass:password,
    };
    
    try {
      // await updateUserDetails(details?._id, details);
      await updateUserDetails(details._id, payload);
      alert('User details updated successfully!');
      setIsEditing(false);
      navigate('/users');
      
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user details.');
    }
  };

  const downloadPDF = (e) => {
    e.preventDefault();
    downloadUserPDF(details?._id);
  };

  return (
    <PageLayout title="User Details">
      {!details ? (
        <Typography fontSize={14} sx={{ paddingX: 5 }}>
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={5} display="flex" direction="row" p={8} justifyContent="center">
          <Grid item container alignContent="start" width="100%" xs={12} spacing={3}>
            {/* <Grid p={1}>
              <img
                style={{
                  width: 120,
                  height: 100,
                  borderRadius: '20px',
                  border: 'solid 1px #D3D3D3',
                }}
                src={`${process.env.REACT_APP_API_URL}/uploads/${details?.photo}`}
                alt="User"
              />
            </Grid> */}
            <Grid p={1}>
              {isEditing ? (
                <div>
                  <label htmlFor="photo">Change Photo:</label>
                  <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      style={{
                        width: 120,
                        height: 100,
                        borderRadius: '20px',
                        border: 'solid 1px #D3D3D3',
                      }}
                    />
                  )}
                </div>
              ) : (
                <img
                  style={{
                    width: 120,
                    height: 100,
                    borderRadius: '20px',
                    border: 'solid 1px #D3D3D3',
                  }}
                  src={`${process.env.REACT_APP_API_URL}/uploads/${details?.photo}`}
                  alt="User"
                />
              )}
            </Grid>

            <Grid p={1}>
              {Object.keys(details).map((key) => {
                if (key === 'children' || key === '__v' || key === '_id' || key === 'createdAt' || key === 'updatedAt' || key === 'dob' || key === 'photo' || key === 'gender' || key === 'subgroup'|| key === 'password' ) return null;
                return (
                  <Typography variant="body2" key={key}>
                    <strong>{key}: </strong>
                    {isEditing ? (
                      <TextField
                        name={key}
                        value={details[key]}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        margin="dense"
                      />
                    ) : (
                      details[key]
                    )}
                  </Typography>
                );
              })}
              {/* {details?.children && (
                <Grid p={1} container spacing={1} xs={12}>
                  <Typography variant="body2">
                    <strong>Children Details: </strong>
                  </Typography>
                  {details?.children.map((chil, index) => (
                    <Grid
                      item
                      key={index}
                      style={{
                        border: '1px solid black',
                        padding: '5px',
                        borderRadius: '5px',
                        width: '100%',
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Name: </strong>{' '}
                        {isEditing ? (
                          <TextField
                            name={`children[${index}].name`}
                            value={chil.name}
                            onChange={(e) =>
                              handleInputChange({
                                target: {
                                  name: `children[${index}].name`,
                                  value: e.target.value,
                                },
                              })
                            }
                            fullWidth
                            size="small"
                            margin="dense"
                          />
                        ) : (
                          chil.name
                        )}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              )} */}

              <Grid p={1}>
              <Typography variant="body2" className="form-group">
                <strong htmlFor="name">Password</strong>
                {isEditing ? (
                  <TextField
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                ) : (
                  <Typography variant="body2">{details?.password}</Typography>
                )}
              </Typography>
                <Typography variant="body2" className="form-group">
                 <strong>Date of Birth </strong>
                  {isEditing ? (
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={details.dob?.split('T')[0]}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <Typography variant="body2">{details.dob?.split('T')[0]}</Typography>
                  )}
                </Typography>

                <Typography variant="body2" className="form-group">
                  <strong>Sub Group:</strong>
                  {isEditing ? (
                    <select
                      id="subgroup"
                      name="subgroup"
                      value={details.subgroup}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        SELECT SUB GROUP
                      </option>
                      <option value="PALATTU CHIRAKKARA">PALATTU CHIRAKKARA</option>
                      <option value="PALATTU MEETHALE">PALATTU MEETHALE</option>
                      <option value="PALATTU KANNANKAI">PALATTU KANNANKAI</option>
                    </select>
                  ) : (
                    <Typography variant="body2">{details.subgroup}</Typography>
                  )}
                </Typography>

                <Typography variant="body2" className="form-group">
                  <strong>Gender</strong>
                  {isEditing ? (
                    <select
                      id="gender"
                      name="gender"
                      value={details.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        SELECT Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">OTHER</option>
                    </select>
                  ) : (
                    <Typography variant="body2">{details.gender}</Typography>
                  )}
                </Typography>

                <Typography >
                   <strong>Children Details: </strong>
                </Typography>
                {details.children.map((child, index) => (
                  <div key={index} className="form-group">
                    <Typography variant="body2"><strong> Child {index + 1}</strong></Typography>
                    {isEditing ? (
                      <>
                        <TextField
                          name={`children[${index}].name`}
                          label="Name"
                          value={child.name}
                          onChange={(e) =>
                            // setDetails((prev) => {
                            //   const updatedChildren = [...prev.children];
                            //   updatedChildren[index].name = e.target.value;
                            //   return { ...prev, children: updatedChildren };
                            // })
                            setDetails((prev) => {
                              const updatedChildren = [...prev.children];
                              updatedChildren[index].name = e.target.value;
                              return { ...prev, children: updatedChildren };
                            })
                            
                          }
                        />
                        <TextField
                          name={`children[${index}].age`}
                          label="Age"
                          value={child.age}
                          onChange={(e) =>
                            setDetails((prev) => {
                              const updatedChildren = [...prev.children];
                              updatedChildren[index].age = e.target.value;
                              return { ...prev, children: updatedChildren };
                            })
                          }
                        />
                        <TextField
                          name={`children[${index}].gender`}
                          label="Gender"
                          value={child.gender}
                          onChange={(e) =>
                            setDetails((prev) => {
                              const updatedChildren = [...prev.children];
                              updatedChildren[index].gender = e.target.value;
                              return { ...prev, children: updatedChildren };
                            })
                          }
                        />
                      </>
                    ) : (
                      <Typography variant="body2">
                       {child.name&&<strong>name:</strong>} {child.name}  {child.age&&<strong>age:</strong>}{child.age} {child?.gender&&<strong>gender:</strong>}{child?.gender}
                      </Typography>
                    )}
                  </div>
                ))}
              </Grid>

            </Grid>
          </Grid>
          {isEditing ? (
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="contained" color="secondary">
              Edit
            </Button>
          )}
          <Button onClick={downloadPDF}>Download User Details</Button>
        </Grid>
      )}
    </PageLayout>
  );
};

export default EditUsers;
