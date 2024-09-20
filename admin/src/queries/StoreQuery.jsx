import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    deleteFile,
    getGallery,
    addImages,


    getBlogs,
    addBlogs,
    getBlogsById,
    editBlogs,
    deleteBlogs,

    addBanners,
    editBanners,
    deleteBanners,
    getBannersById,
    getBanners,

    addVideos,
    editVideos,
    deleteVideos,
    getVideos,
    getVideoById,
} from "./storeUrls";

const useGetBlogs = (data) => {
    return useQuery(["get_blogs", data], () => getBlogs(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBlogsById = (data) => {
    return useQuery(["get_blogs", data], () => getBlogsById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useGetBanners = (data) => {
    return useQuery(["get_banners", data], () => getBanners(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBannersById = (data) => {
    return useQuery(["get_banners", data], () => getBannersById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};


const useGetVideos = (data) => {
    return useQuery(["get_Videos", data], () => getVideos(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetVideosById = (data) => {
    return useQuery(["get_Videos", data], () => getVideoById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddVideos = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addVideos(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_Videos");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditVideos = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editVideos(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_Videos");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteVideos = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteVideos(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_Videos");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};



const useGetGallery = () => {
    return useQuery('get_gallery', getGallery);
};

const useDeleteFile = () => {
    const queryClient = useQueryClient();

    return useMutation((id) => deleteFile(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('get_gallery');
        },
    });
};

const useAddImages = () => {
    const queryClient = useQueryClient();
  
    return useMutation((data) => addImages(data), {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get_gallery");
        return data;
      },
      onError: (data) => {
        return data;
      },
    });
  };


export {
    useGetGallery,
    useDeleteFile,
    useAddImages,

    useGetBlogs,
    useGetBlogsById,
    useAddBlogs,
    useEditBlogs,
    useDeleteBlogs,

    useGetBanners,
    useGetBannersById,
    useAddBanners,
    useEditBanners,
    useDeleteBanners,

    useGetVideos,
    useGetVideosById,
    useAddVideos,
    useEditVideos,
    useDeleteVideos,
};
