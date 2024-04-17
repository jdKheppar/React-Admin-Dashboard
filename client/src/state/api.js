import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Customers",
    "Client",
    "Actions",
     "Admins",
//     "Performance",
//     "Dashboard",
   ],
   endpoints: (build) => ({
     getUser: build.query({
       query: (id) => `general/user/${id}`,
       providesTags: ["User"]
     }),
     getClient: build.query({
      query: (id) => `general/client/${id}`,
      providesTags: ["Client"]
    }),
//     getProducts: build.query({
//       query: () => "client/products",
//       providesTags: ["Products"],
//     }),
 getCustomers: build.query({
   query: () => "client/customers",
   providesTags: ["Customers"],
 }),
getActions: build.query({
   query: ({ page, pageSize, sort, search }) => ({
      url: "client/actions",
      method: "GET",
      params: { page, pageSize, sort, search },
    }),
    providesTags: ["Actions"],
  }),
//     getGeography: build.query({
//       query: () => "client/geography",
//       providesTags: ["Geography"],
//     }),
     getSales: build.query({
       query: () => "requests/requests",
       providesTags: ["Requests"],
     }),
getAdmins: build.query({
       query: () => "management/admins",
       providesTags: ["Admins"],
     }),
     addCustomer: build.mutation({
      query: (customerObj) => ({
        url: "client/customers/add",
        method: "POST",
        body: customerObj,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, updatedCustomerData }) => ({
        url: `client/customers/update/${id}`,
        method: "PUT",
        body: updatedCustomerData,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateAction: build.mutation({
      query: ({ id, updatedActionData }) => ({
        url: `client/actions/add/${id}`,
        method: "PUT",
        body: updatedActionData,
      }),
      invalidatesTags: ["Actions"],
    }),
//     getUserPerformance: build.query({
//       query: (id) => `management/performance/${id}`,
//       providesTags: ["Performance"],
//     }),
//     getDashboard: build.query({
//       query: () => "general/dashboard",
//       providesTags: ["Dashboard"],
//     }),
   }),
 });

 export const {
   useGetUserQuery,
//   useGetProductsQuery,
   useGetClientQuery,
   useGetCustomersQuery,
   useGetActionsQuery,
//   useGetGeographyQuery,
   useGetRequestsQuery,
   useGetAdminsQuery,
//   useGetUserPerformanceQuery,
//   useGetDashboardQuery,
} = api;