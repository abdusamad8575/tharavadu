import { Alert, Box, Button, Grid, ToggleButton, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEditVideos, useGetVideosById, useDeleteVideos } from "queries/StoreQuery";

const EditVideo = () => {
   const { id } = useParams();
   const navigate = useNavigate()
   const { data: res, isLoading } = useGetVideosById({ id });
   const [data, setData] = useState({})

   useEffect(() => {
      setData(res?.data)
   }, [res])
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
   const { mutateAsync: editBlogs, isLoading: updating } = useEditVideos()
   const { mutateAsync: deleteBlog, isLoading: deleting } = useDeleteVideos()

   const handleDelete = () => {
      deleteBlog(data)
         .then((res) => {
            if (res) {
               toast.success(res?.message ?? "video deleted Successfully");
               navigate('/videos')
            }
         })
         .catch((err) => {
            toast.error(err?.message ?? "Something went wrong");
         });
   };
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



         editBlogs(data)
            .then((res) => {
               if (res) {
                  toast.success(res?.message ?? "video added Successfully");
                  navigate('/videos')
               }
            })
            .catch((err) => {
               toast.error(err?.message ?? "Something went wrong");
            });

      } catch (error) {
         console.error(error)
      }
   }
   return (
      <PageLayout
         title={'Edit video'}
      >
         <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
            <Grid container spacing={2} maxWidth={600} py={5}>
               <Grid item xs={12} sm={6}>
                  <Input
                     required
                     placeholder="Video Title"
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
                     placeholder="Video SubTitle"
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
                     placeholder="Video Target (url)"
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
                     Blog status &nbsp;
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
                  <Button onClick={handleSubmit}>Update Video</Button>
                  <Button color="secondary" onClick={handleDelete}>Delete Video</Button>
               </Grid>

            </Grid>
         </Box>

      </PageLayout>
   )
}

export default EditVideo