import React from "react";
import { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  const handleEdit = () => {
    // Implement edit action using selectedRows state
  };

  const handleDelete = () => {
    // Implement delete action using selectedRows state
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "request_num",
      headerName: "Request Number",
      flex: 1,
    },
    {
      field: "account_num",
      headerName: "Account Number",
      flex: 1,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "affiliation",
      headerName: "Affiliation",
      flex: 1,
    },
    {
      field: "market_segment",
      headerName: "Market Segment",
      flex: 1,
    },
    {
      field: "Internal_responsible",
      headerName: "Internal Responsible",
      flex: 1,
    },
    {
      field: "company_interlocutor",
      headerName: "Company Interlocutor",
      flex: 1,
    },
    {
      field: "Activity_indicator",
      headerName: "Activity Indicator",
      type: "number",
      flex: 0.5,
    },
    {
      field: "Comment_CA",
      headerName: "Comment",
      flex: 2,
    },
    // {
    //   field: "supporting_document",
    //   headerName: "Supporting Document",
    //   flex: 1,
    //    renderCell: (params) => {
    //      return (
    //        <a href={`/documents/${params.value}`} target="_blank" rel="noopener noreferrer">
    //          View Document
    //        </a>
    //      );
    //    },
    // },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customer Requests from CA" />
      <Box>
        <Button
          variant="contained"
          onClick={handleEdit}
          disabled={selectedRows.length !== 1}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          onSelectionModelChange={handleSelectionChange}
          selectionModel={selectedRows}
        />
      </Box>
    </Box>
  );
};

export default Customers;
