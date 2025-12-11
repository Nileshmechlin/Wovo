import { api } from "../api/baseApi";

const chatSlice = api.injectEndpoints({
    overrideExisting: true, 
    endpoints: builder => ({
        getMatch: builder.query({
            query: ()=> ({
                url: `user/get-matches`,
                method: "GET"
            }),
            transformResponse: (response) => {
                // console.log("API Response:", response); // Debugging API response
                return response; // Adjust this if needed
              },
              providesTags: ['message',]
        }),
        getMessage: builder.query({
            query: ({per_page, id})=> ({
                url: `/user/get-messages/${id}?per_page=${per_page}`,
                method: "GET"
            }),
            transformResponse: (response) => {
                // console.log("API Response:", response); // Debugging API response
                return response; // Adjust this if needed
              },
              providesTags: ['message',]
        }), 
        getContact: builder.query({
            query: ()=> ({
                url: `/user/get-contact`,
                method: "GET"
            }),
            transformResponse: (response) => {
                // console.log("API Response:", response); // Debugging API response
                return response; // Adjust this if needed
              },
              providesTags: ['message',]
        }), 
        postSendMessage: builder.mutation({
            query: data => ({
              url: `/user/send-message`,
              headers : {
                'Content-Type': 'multipart/form-data'
            },
              method: 'POST',
              body: data,
      
            }),
            invalidatesTags: ['message'],
          }),
    })
})

export const {
    useGetMessageQuery,
    useGetMatchQuery,
    usePostSendMessageMutation,
    useGetContactQuery,
} = chatSlice;