import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getUser: builder.query({
            query: () => ({
                url: `/user/get-user-info`,
                method: "GET"
              }),
              // transformErrorResponse: (response) => response?.data,
              transformResponse: (response) => {
                // console.log("API Response:", response); 
                return response; 
              },
              providesTags: ['user',]
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/user/user-details/${id}`,
                method: "GET"
              }),
              // transformErrorResponse: (response) => response?.data,
              transformResponse: (response) => {
                // console.log("API Response:", response); 
                return response; 
              },
              providesTags: ['user',]
        }),
        getPorfile: builder.query({
            query: () => ({
                url: `/user/profile`,
                method: "GET"
              }),
              // transformErrorResponse: (response) => response?.data,
              transformResponse: (response) => {
                // console.log("API Response:", response); 
                return response; 
              },
              providesTags: ['user',]
        }),
        
        postHandle_iteraction: builder.mutation({
            query: data => ({
              url: `/user/handle-interaction`,
              headers : {
                'Content-Type': 'multipart/form-data'
            },
              method: 'POST',
              body: data,
      
            }),
            invalidatesTags: ['user'],
        }),
        postUpdateUserImg: builder.mutation({
            query: data => ({
              url: `/user/update-avatar`,
              headers : {
                'Content-Type': 'multipart/form-data'
            },
              method: 'POST',
              body: data,
      
            }),
            invalidatesTags: ['user'],
        }),
        postUpdateProfile: builder.mutation({
            query: formData => ({
              url: `/user/update-profile`,
              headers : {
                'Content-Type': 'multipart/form-data'
            },
              method: 'POST',
              body: formData,
      
            }),
            invalidatesTags: ['user'],
        }),
    })
});

export const {useGetUserQuery,
    usePostHandle_iteractionMutation,
    usePostUpdateUserImgMutation,
    useGetPorfileQuery,
    usePostUpdateProfileMutation,
    useGetUserDetailsQuery,
} = userSlice;