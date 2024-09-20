// /* eslint-disable react/prop-types */
// import Box from "components/Box";
// import Typography from "components/Typography";
// import Avatar from "components/Avatar";
// import Badge from "components/Badge";
// import { useGetCategory } from "queries/ProductQuery";
// import Table from "examples/Tables/Table";
// import { Icon } from "@mui/material";
// import { Link } from "react-router-dom";

// function Category({ image, name, place }) {
//   return (
//     <Box display="flex" alignItems="center" px={1} py={0.5}>
//       <Box mr={2}>
//         <Avatar src={image} alt={name} size="sm" variant="rounded" />
//       </Box>
//       <Box display="flex" flexDirection="column">
//         <Typography variant="button" fontWeight="medium">
//           {name}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           {place}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// const TableData = () => {
//   const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });
//   const columns = [
//     { name: "event", align: "left" },
//     // { name: "status", align: "center" },
//     { name: "eventDate", align: "center" },
//     // { name: "Lastupdated", align: "center" },
//     { name: "action", align: "center" },
//   ]
// console.log('data',data);
//   const rows = data?.data?.map(item => ({
//     event: <Category image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`} name={item?.name} place={item?.place} />,
//     // status: (
//     //   <Badge variant="gradient" badgeContent={item?.isAvailable ? 'Available' : 'Unavailable'} color={item?.isAvailable ? "success" : 'secondary'} size="xs" container />
//     // ),
//     eventDate: (
//       <Typography variant="caption" color="secondary" fontWeight="medium">
//         {item?.date}
//       </Typography>
//     ),
//     action: (
//       <Link to={`/events/editEvents/${item?._id}`}>
//         <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
//           more_vert
//         </Icon>
//       </Link>
//     ),
//   }))
//   return isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> : <Table columns={columns} rows={rows} />
// };

// export default TableData;




import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import { useGetCategory } from "queries/ProductQuery";
import Table from "examples/Tables/Table";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Category({ image, name, place }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {place}
        </Typography>
      </Box>
    </Box>
  );
}

Category.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

const TableData = () => {
  const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });

  const columns = [
      { name: "event", align: "left" },
      { name: "eventDate", align: "center" },
      { name: "action", align: "center" },
  ];

  console.log('data', data);

  const rows = data?.data?.map(item => ({
      event: (
          <Category 
              image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`} 
              name={item?.name} 
              place={item?.place} 
          />
      ),
      eventDate: (
          <Typography variant="caption" color="secondary" fontWeight="medium">
              {formatDate(item?.date)} {/* Format the date here */}
          </Typography>
      ),
      action: (
          <Link to={`/events/editEvents/${item?._id}`}>
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
                  more_vert
              </Icon>
          </Link>
      ),
  }));

  return isLoading ? (
      <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography>
  ) : (
      <Table columns={columns} rows={rows} />
  );
};

export default TableData;

