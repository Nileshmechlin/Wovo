import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
  overrideExisting: true,
    endpoints: builder => ({
         getHome: builder.query({
              query: ({perPage = 10}) => ({
                url: `/user/get-nearby-users?per_page=${perPage}`,
                method: "GET"
              }),
              // transformErrorResponse: (response) => response?.data,
              transformResponse: (response) => {
                // console.log("API Response:", response); // Debugging API response
                return response; // Adjust this if needed
              },
              providesTags: ['user',]
            }),
            postBlockUser: builder.mutation({
              query: data => ({
                url: `/user/blocked-user`,
                headers : {
                  'Content-Type': 'multipart/form-data'
              },
                method: 'POST',
                body: data,
        
              }),
              invalidatesTags: ['user'],
            }),
    })
})

export const {
useGetHomeQuery,
usePostBlockUserMutation,
}= homeSlice