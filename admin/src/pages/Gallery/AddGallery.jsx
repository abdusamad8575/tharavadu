import {Button, Grid } from '@mui/material';
import PageLayout from 'layouts/PageLayout';
import React, {  useState } from 'react';
import { useAddImages } from 'queries/StoreQuery';
import toast from 'react-hot-toast';
import ImageList from './ImageList';
import { useNavigate } from 'react-router-dom';

const AddGallery = () => {
  const [details, setDetails] = useState({});
  
  const { mutateAsync: addImages, isLoading: loading } = useAddImages();
  const navigate = useNavigate()
  

  const handleSubmit = () => {
    try {
      const formData = new FormData();
      details?.image?.forEach((image) => {
        formData.append('images', image, image.name);
      });
      console.log('new details',details);
      
      
      addImages(formData)
        .then((res) => {
          toast.success(res?.message ?? "Gallery added");
          navigate('/gallery')
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title={'Add Images'}>
      <Grid container spacing={5} display={'flex'} direction={'row'} p={8}>
        

        <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
          <Grid xs={12}>
            <ImageList data={details?.image} dispatch={setDetails} />
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4} mt={'auto'}>
            <Button sx={{ mr: 0, width: '100%' }} onClick={handleSubmit} variant='contained'>
              Add Images
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default AddGallery;
