import { api } from './../api/baseApi';
const notificationSlice = api.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getNotification: builder.query ({
            query: () => ({
                url: `/notifications`,
                method: "GET" as const,
            }),
            transformResponse: (response) => {
                // console.log("API Response:", response); // Debugging API response
                return response; // Adjust this if needed
              },
              providesTags: ['notification',]
        }),
        putMarkAsReadNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/mark-as-read?notification_id=${id}`,
                method: "PUT" as const,
            }),
            invalidatesTags: ["notification"], 
        }),

    })
})

export const {
    useGetNotificationQuery,
    usePutMarkAsReadNotificationMutation,
} = notificationSlice;