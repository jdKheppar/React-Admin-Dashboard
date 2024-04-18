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
      providesTags: ["User"],
    }),
    getClient: build.query({
      query: (id) => `general/client/${id}`,
      providesTags: ["Client"],
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
      query: ({ customerObj }) => ({
        url: "client/customers/update",
        method: "PUT",
        body: customerObj,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateAction: build.mutation({
      query: ({ actionObj }) => ({
        url: "client/actions/update",
        method: "PUT",
        body: actionObj,
      }),
      invalidatesTags: ["Actions"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `client/customers/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
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
  useAddCustomerMutation, // Export the addCustomer mutation hook
  useUpdateCustomerMutation, // Export the updateCustomer mutation hook
  useUpdateActionMutation, // Export the updateAction mutation hook
  useDeleteCustomerMutation, // Export the deleteCustomer mutation hook
  //   useGetUserPerformanceQuery,
  //   useGetDashboardQuery,
} = api;
