// import { useQuery } from 'react-query';
// import axios from 'axios';
// import orderUrls from './orderUrls';

// const fetchUsers = async ({ queryKey }) => {
//   const [_key, { pageNo, pageCount, searchTerm, ageFilter, sortBy }] = queryKey;
//   const params = new URLSearchParams();

//   if (searchTerm) params.append('searchTerm', searchTerm);
//   if (ageFilter) params.append('ageFilter', ageFilter);
//   if (sortBy) params.append('sortBy', sortBy);
//   params.append('page', pageNo);
//   params.append('perpageitems', pageCount);

//   const { data } = await axios.get(orderUrls.getUsers, { params });
//   return data;
// };

// // Hook to get users with search, filter, and pagination
// export const useGetUsers = ({ pageNo, pageCount, searchTerm, ageFilter, sortBy }) => {
//   return useQuery(['users', { pageNo, pageCount, searchTerm, ageFilter, sortBy }], fetchUsers, {
//     keepPreviousData: true, // Keep previous data while fetching new
//     refetchOnWindowFocus: false // Avoid refetching on window focus for better UX
//   });
// };

// // Hook for Excel download
// export const downloadUsersExcel = () => {
//   window.location.href = orderUrls.downloadUsersExcel;
// };

// // Hook for PDF download
// export const downloadUserPDF = (userId) => {
//   window.open(orderUrls.downloadUserPDF(userId));
// };




import { useQuery } from 'react-query';
import axios from 'axios';
import orderUrls from './orderUrls';

const fetchUsers = async ({ queryKey }) => {
  const [_key, { pageNo, pageCount, searchTerm, ageFilter, sortBy, subgroup,searchGrandMother }] = queryKey;
  const params = new URLSearchParams();

  if (searchTerm) params.append('searchTerm', searchTerm);
  if (searchGrandMother) params.append('searchGrandMother', searchGrandMother);
  if (ageFilter) params.append('ageFilter', ageFilter);
  if (sortBy) params.append('sortBy', sortBy);
  if (subgroup) params.append('subgroup', subgroup);
  params.append('page', pageNo);
  params.append('perpageitems', pageCount);

  const { data } = await axios.get(orderUrls.getUsers, { params });
  return data;
};

export const useGetUsers = ({ pageNo, pageCount, searchTerm, ageFilter, sortBy, subgroup,searchGrandMother }) => {
  return useQuery(['users', { pageNo, pageCount, searchTerm, ageFilter, sortBy, subgroup,searchGrandMother }], fetchUsers, {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
};

export const downloadUsersExcel = () => {
  window.location.href = orderUrls.downloadUsersExcel;
};

export const downloadUserPDF = (userId) => {
  window.open(orderUrls.downloadUserPDF(userId));
};

export const downloadAllUsersPDF = () => {
  window.open(orderUrls.downloadAllUsersPDF);
};

export const updateUserDetails = async (userId, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === 'photo' && typeof data[key] === 'object') {
      formData.append(key, data[key]); // Append file
    } else {
      formData.append(key, data[key]); // Append text fields
    }
  });

  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/user/users/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
