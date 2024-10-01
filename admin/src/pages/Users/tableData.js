
// import React, { useState } from 'react';
// import {
//   Button,
//   Select,
//   MenuItem,
//   TextField,
//   Avatar,
//   Box,
// } from '@mui/material';
// import Table from 'examples/Tables/Table';
// import { useGetUsers, downloadUsersExcel, downloadUserPDF } from 'queries/OrderQuery';
// import { Link } from 'react-router-dom';
// import { Icon } from "@mui/material";
// import PropTypes from 'prop-types';
// import Typography from 'components/Typography';

// function User({ image, name, age, id }) {
//   return (
//     <Box display="flex" key={id} alignItems="center" px={1} py={0.5}>
//       <Box mr={2}>
//         <Avatar src={image} alt={name} size="sm" variant="rounded" />
//       </Box>
//       <Box display="flex" flexDirection="column">
//         <Typography variant="button" fontWeight="medium">
//           {name}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           {age}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// User.propTypes = {
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   id: PropTypes.string.isRequired,
// };

// const TableData = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ageFilter, setAgeFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [page, setPage] = useState(1);
//   const { data, isLoading } = useGetUsers({  searchTerm, ageFilter, sortBy });

//   const handleDownloadExcel = () => {
//     downloadUsersExcel();
//   };

//   const handleDownloadPDF = (userId) => {
//     downloadUserPDF(userId);
//   };

//   const columns = [
//     { name: 'User', align: 'left' },
//     { name: 'Father', align: 'left' },
//     { name: 'Mother', align: 'left' },
//     { name: 'GrandMother', align: 'left' },
//     { name: 'Subgroup', align: 'left' },
//     { name: 'Actions', align: 'center' },
//     { name: 'Details', align: 'center' },
//   ];

//   const rows = data?.users?.map((user) => ({
//     User: (
//       <User
//         image={`${process.env.REACT_APP_API_URL}/uploads/${user?.photo}`}
//         name={user?.name}
//         age={user?.age}
//         id={user?._id}
//       />
//     ),
//     Father: user?.fatherName,
//     Mother: user?.motherName,
//     GrandMother: user?.grandmotherName,
//     Subgroup: user?.subgroup,
//     Actions: (
//       <Button onClick={() => handleDownloadPDF(user._id)}>
//         Download ID
//       </Button>
//     ),
//     Details: (
//       <Link to={`/users/editUsers/${user?._id}`} state={{ user }}>
//         <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
//           more_vert
//         </Icon>
//       </Link>
//     ),
//   }));

//   return (
//     <div>
//       <div>
//         <TextField placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         <TextField placeholder="Filter by Age" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} />
//         <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty>
//           <MenuItem value="">
//             <em>Choose Sorting</em>
//           </MenuItem>
//           <MenuItem value="subgroup">Subgroup</MenuItem>
//           <MenuItem value="male">Male</MenuItem>
//           <MenuItem value="female">Female</MenuItem>
//           <MenuItem value="yes">Married</MenuItem>
//           <MenuItem value="no">Unmarried</MenuItem>
//         </Select>
//         <Button onClick={handleDownloadExcel}>Download Excel</Button>
//       </div>

//       {isLoading ? <div>Loading...</div> : <Table columns={columns} rows={rows} />}
//     </div>
//   );
// };

// export default TableData;






import React, { useState } from 'react';
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Box,
  Grid,
  Pagination,
  Typography as MuiTypography
} from '@mui/material';
import Table from 'examples/Tables/Table';
import { useGetUsers, downloadUsersExcel, downloadUserPDF,downloadAllUsersPDF  } from 'queries/OrderQuery';
import { Link } from 'react-router-dom';
import { Icon } from "@mui/material";
import PropTypes from 'prop-types';

function User({ image, name, age, id }) {
  return (
    <Box display="flex" key={id} alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <MuiTypography variant="button" fontWeight="medium">
          {name}
        </MuiTypography>
        <MuiTypography variant="caption" color="secondary">
          Age: {age}
        </MuiTypography>
      </Box>
    </Box>
  );
}

User.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

const TableData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchGrandMother, setSearchGrandMother] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [subgroup, setSubgroup] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);

  const { data, isLoading } = useGetUsers({ pageNo: page, pageCount, searchTerm, ageFilter, sortBy, subgroup, searchGrandMother });

  const handleDownloadExcel = () => {
    downloadUsersExcel();
  };

  const handleDownloadPDF = (userId) => {
    downloadUserPDF(userId);
  };

  const handleDownloadAllPDF = () => {
    downloadAllUsersPDF();
  };

  const columns = [
    { name: 'User', align: 'left' },
    { name: 'Father', align: 'left' },
    { name: 'Mother', align: 'left' },
    { name: 'GrandMother', align: 'left' },
    { name: 'Subgroup', align: 'left' },
    { name: 'Actions', align: 'center' },
    { name: 'Details', align: 'center' },
  ];

  const rows = data?.users?.map((user) => ({
    User: (
      <User
        image={`${process.env.REACT_APP_API_URL}/uploads/${user?.photo}`}
        name={user?.name}
        age={user?.age}
        id={user?._id}
      />
    ),
    Father: user?.fatherName,
    Mother: user?.motherName,
    GrandMother: user?.grandmotherName,
    Subgroup: user?.subgroup,
    Actions: (
      <Button onClick={() => handleDownloadPDF(user._id)}>
        Download ID
      </Button>
    ),
    Details: (
      <Link to={`/users/editUsers/${user?._id}`} state={{ user }}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }));

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div style={{ margin: '1rem', }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'10px' }} >
          <TextField placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <TextField placeholder="Search Grand Mother" value={searchGrandMother} onChange={(e) => setSearchGrandMother(e.target.value)} />
          <TextField placeholder="Filter by Age" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} />
          <span>Total Members: {data?.total}</span>
          <Button onClick={handleDownloadExcel} >Download Excel</Button>
          <Button onClick={handleDownloadAllPDF}>
            Download PDFs
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Select value={subgroup} onChange={(e) => setSubgroup(e.target.value)} displayEmpty>
              <MenuItem value="">
                <em>Choose Subgroup</em>
              </MenuItem>
              <MenuItem value="PALATTU CHIRAKKARA">PALATTU CHIRAKKARA</MenuItem>
              <MenuItem value="PALATTU MEETHALE">PALATTU MEETHALE</MenuItem>
              <MenuItem value="PALATTU KANNANKAI">PALATTU KANNANKAI</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={12} md={6}>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty>
              <MenuItem value="">
                <em>Sort By</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="yes">Married</MenuItem>
              <MenuItem value="no">Unmarried</MenuItem>
            </Select>

          </Grid>
        </Grid>





      </div>



      {isLoading ? <div>Loading...</div> : <Table columns={columns} rows={rows} />}

      <Pagination style={{display:'flex',justifyContent:'center',margin:'20px'}} count={Math.ceil(data?.total / pageCount)} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default TableData;
