import { apiSlice } from './ApiSlice'
const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${ADMIN_URL}/adminlogin`,
                method:'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/adminlogout`,
                method: 'POST',
            })
        }),
        getUser: builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/userList`,
                method:'GET',
            })
        }),
        editUser: builder.mutation({
            query: (data)=>({
                url: `${ADMIN_URL}/editUser`,
                method:'POST',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data)=>({
                url: `${ADMIN_URL}/deleteUser`,
                method:'POST',
                body:data
            })
        })
    })
})
export const { useLoginMutation , useLogoutMutation, useRegisterMutation, useDeleteUserMutation, useEditUserMutation, useGetUserMutation} = adminApiSlice;