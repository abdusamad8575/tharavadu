// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Icon, Avatar } from '@mui/material';
// import { useGetGallery, useDeleteFile } from 'queries/StoreQuery';
// import Table from 'examples/Tables/Table';
// import Box from 'components/Box';
// import Typography from 'components/Typography';
// import Badge from 'components/Badge';
// import PropTypes from 'prop-types';
// import GalleryItem from './GalleryItem'; 

// const TableData = () => {
//   const { data, isLoading } = useGetGallery();

//   const columns = [
//     { name: 'Gallery', align: 'left' },
//     { name: 'Action', align: 'center' },
//   ];

//   const rows = data?.map((item) => ({
//     Gallery: <GalleryItem file={item} />,
//     Action: (
//       // <Link to={`/gallery/editGallery/${item?._id}`}>
//       <Icon sx={{ cursor: 'pointer' }} fontSize="small">
//         edit
//       </Icon>
//       // </Link>
//     ),
//   }));

//   return isLoading ? <Typography>Loading...</Typography> : <Table columns={columns} rows={rows} />;
// };

// export default TableData;



import React, { useState } from 'react';
import { Icon, Dialog, DialogContent } from '@mui/material';
import { useGetGallery, useDeleteFile } from 'queries/StoreQuery';
import Table from 'examples/Tables/Table';
import Typography from 'components/Typography';
import GalleryItem from './GalleryItem';

const TableData = () => {
  const { data, isLoading } = useGetGallery();
  const deleteFile = useDeleteFile();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDelete = (id) => {
    deleteFile.mutate(id);
  };

  const handleImageClick = (file) => {
    setSelectedFile(file);
  };

  const handleClose = () => {
    setSelectedFile(null);
  };

  const columns = [
    { name: 'Gallery', align: 'left' },
    { name: 'Action', align: 'center' },
  ];

  const rows = data?.map((item) => ({
    Gallery: <GalleryItem file={item} onImageClick={handleImageClick} />,
    Action: (
      <Icon sx={{ cursor: 'pointer', color: 'red' }} fontSize="small" onClick={() => handleDelete(item._id)}>
        delete
      </Icon>
    ),
  }));

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : (
    <>
      <Table columns={columns} rows={rows} />
      <Dialog open={!!selectedFile} onClose={handleClose} maxWidth="md">
        <DialogContent>
          {selectedFile && (
            <>
              {selectedFile.mimetype.startsWith('image/') && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/${selectedFile.filename}`}
                  alt={selectedFile.filename}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              {selectedFile.mimetype.startsWith('video/') && (
                <video width="100%" height="auto" controls>
                  <source src={`${process.env.REACT_APP_API_URL}/uploads/${selectedFile.filename}`} type={selectedFile.mimetype} />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableData;
