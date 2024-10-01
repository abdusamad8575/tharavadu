// import request from "utils/request";

// const getUsers = async (data) => request(`/user?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
// const editUsers = async ({ orderId, newStatus }) => request('user/update-status', 'PUT', {orderId, newStatus})

// export {
//   getUsers,
//   editUsers
// };



const baseUrl = process.env.REACT_APP_API_URL;

const orderUrls = {
  getUsers: `${baseUrl}/api/v1/user/users`,
  downloadUsersExcel: `${baseUrl}/api/v1/user//users/download/excel`,
  downloadUserPDF: (userId) => `${baseUrl}/api/v1/user//users/${userId}/download/pdf`,
  downloadAllUsersPDF: `${baseUrl}/api/v1/user/users/download/all-pdfs`,

};

export default orderUrls;
