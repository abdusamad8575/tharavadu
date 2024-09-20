import { Alert, Box, Button, Grid, ToggleButton, Typography } from "@mui/material";
import React, { useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import toast from "react-hot-toast";
import Input from "components/Input";
import { useAddVideos } from "queries/StoreQuery";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
   const [data, setData] = useState({})
   const navigate = useNavigate()
   const fileInputRef = React.useRef(null);
   const handleFileSelect = () => {
      fileInputRef.current.click();
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setData(prev => ({ ...prev, image: file }));
   };

   const handleChange = (e) => {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const { mutateAsync: addBlogs, isLoading } = useAddVideos()

   const handleSubmit = () => {
      try {
         if (!data?.title) {
            return toast.error("title is required")
         }
         if (!data?.subtitle) {
            return toast.error("subtitle is required")
         }
         if (!data?.url) {
            return toast.error("url is required")
         }


         addBlogs(data)
            .then((res) => {
               if (res) {
                  toast.success(res?.message ?? "video added Successfully");
                  navigate('/videos')
               }            })
            .catch((err) => {
               toast.error(err?.message ?? "Something went wrong");
            });

      } catch (error) {
         console.error(error)
      }
   }
   return (
      <PageLayout
         title={'Add video'}
      >
         <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
            <Grid container spacing={2} maxWidth={600} py={5}>
               <Grid item xs={12} sm={6}>
                  <Input
                     required
                     placeholder="video Title"
                     id="title"
                     name="title"
                     label="Blog Title"
                     value={data?.title || ''}
                     onChange={handleChange}
                     fullWidth
                     autoComplete="Title"
                     variant="outlined"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Input
                     required
                     placeholder="video SubTitle"
                     id="subtitle"
                     name="subtitle"
                     label="Blog Subtitle"
                     value={data?.subtitle || ''}
                     onChange={handleChange}
                     fullWidth
                     autoComplete="Subtitle"
                     variant="outlined"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Input
                     required
                     placeholder="video Target (url)"
                     id="url"
                     name="url"
                     label="Blog Target (url)"
                     value={data?.url || ''}
                     onChange={handleChange}
                     fullWidth
                     autoComplete="Blog Action (url)"
                     variant="outlined"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography variant="caption">
                     Video status &nbsp;
                  </Typography>
                  <ToggleButton
                     value={data?.status}
                     selected={data?.status}
                     onChange={() => {
                        setData(prev => ({ ...prev, status: !data?.status }))
                     }}
                  >
                     {data?.status ? 'Active' : 'Blocked'}
                  </ToggleButton>
               </Grid>


               <Grid item xs={12}>
                  <Button onClick={handleSubmit}>Add video</Button>
               </Grid>
            </Grid>
         </Box>

      </PageLayout>
   )
}

export default AddVideo