// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Icon, Avatar } from '@mui/material';
// import { useGetGallery, useDeleteFile } from 'queries/StoreQuery';
// import Box from 'components/Box';
// import Typography from 'components/Typography';
// import PropTypes from 'prop-types';

// function GalleryItem({ file }) {
//   const isImage = file.mimetype.startsWith('image/');
//   const isVideo = file.mimetype.startsWith('video/');
//   const deleteFile = useDeleteFile();

//   return (
//     <Box display="flex" alignItems="center" px={1} py={0.5}>
//       <Box mr={2}>
//         {isImage && <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`} alt={file.filename} variant="rounded" />}
//         {isVideo && (
//           <video width="50" height="50" controls>
//             <source src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`} type={file.mimetype} />
//             Your browser does not support the video tag.
//           </video>
//         )}
//       </Box>
//       <Box display="flex" flexDirection="column" flexGrow={1}>
//         <Typography variant="button" fontWeight="medium">
//           {file.filename}
//         </Typography>
//       </Box>
//       <Icon sx={{ cursor: 'pointer', color: 'red' }} fontSize="small" onClick={() => deleteFile.mutate(file._id)}>
//         delete
//       </Icon>
//     </Box>
//   );
// }

// GalleryItem.propTypes = {
//   file: PropTypes.shape({
//     mimetype: PropTypes.string.isRequired,
//     filename: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default GalleryItem;



import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function GalleryItem({ file, onImageClick }) {
  const isImage = file.mimetype.startsWith('image/');
  const isVideo = file.mimetype.startsWith('video/');

  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2} onClick={() => onImageClick(file)} sx={{ cursor: 'pointer' }}>
        {isImage && <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`} alt={file.filename} variant="rounded" />}
        {isVideo && (
          <video width="50" height="50" controls>
            <source src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`} type={file.mimetype} />
            Your browser does not support the video tag.
          </video>
        )}
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Typography variant="button" fontWeight="medium">
          {file.filename}
        </Typography>
      </Box>
    </Box>
  );
}

GalleryItem.propTypes = {
  file: PropTypes.shape({
    mimetype: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default GalleryItem;
