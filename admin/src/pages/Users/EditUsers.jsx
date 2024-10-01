
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import PageLayout from 'layouts/PageLayout';
import { downloadUserPDF } from 'queries/OrderQuery';

const EditUsers = () => {
  const { state } = useLocation();
  const { user } = state;
  const [details, setDetails] = useState(user);

  useEffect(() => {
    setDetails(user);
  }, [user]);

  const downloadPDF = () => {
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
          <Grid item container alignContent="start" width="100%" xs={12}  spacing={3}>

            <Grid p={1}>
              <img style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                src={`${process.env.REACT_APP_API_URL}/uploads/${details?.photo}`} />
            </Grid>
            <Grid p={1}>
              <Typography variant='body2'><strong>Name: </strong> {details?.name}</Typography>
              <Typography variant='body2'><strong>Age: </strong> {details?.age}</Typography>
              <Typography variant='body2'><strong>Gender: </strong> {details?.gender}</Typography>
              <Typography variant='body2'><strong>DOB: </strong>{details?.dob}</Typography>
              <Typography variant='body2'><strong>Father: </strong> {details?.fatherName}</Typography>
              <Typography variant='body2'><strong>Mother: </strong>{details?.motherName}</Typography>
              <Typography variant='body2'><strong>Grand Mother: </strong>{details?.grandmotherName}</Typography>
              <Typography variant='body2'><strong>Sub Group: </strong>{details?.subgroup}</Typography>
              <Typography variant='body2'><strong>Job: </strong>{details?.job}</Typography>
              <Typography variant='body2'><strong>Phone: </strong>{details?.phone}</Typography>
              <Typography variant='body2'><strong>Address: </strong> {details?.address}</Typography>
              <Typography variant='body2'><strong>Temp Address: </strong>{details?.temAddress}</Typography>
              <Typography variant='body2'><strong>User Name: </strong>{details?.userName}</Typography>
              <Typography variant='body2'><strong>Marriage Status: </strong>{details?.marriageStatus}</Typography>
              {details?.spouseName && <Typography variant='body2'><strong>Spouse Name: </strong>{details?.spouseName}</Typography>}
              {details?.children && <Grid p={1} container spacing={1} xs={12}>
              <Typography variant='body2'><strong>Children Details: </strong></Typography>
                {details?.children.map((chil, index) => (
                  <Grid item key={index} style={{border:'1px solid black' ,padding:'5px',borderRadius:'5px',width:'100%'}}>
                    <Typography variant='body2'><strong>Children Name:</strong> {chil.name}</Typography>
                    <Typography variant='body2'><strong>Children Age: </strong> {chil.age}</Typography>
                    <Typography variant='body2'><strong>Children Gender: </strong> {chil.gender}</Typography>

                  </Grid>
                ))}
              </Grid>}
            </Grid>
            
          </Grid>
            <Button onClick={downloadPDF}>Download User Details</Button>
        </Grid>
      )}
    </PageLayout>
  );
};

export default EditUsers;
