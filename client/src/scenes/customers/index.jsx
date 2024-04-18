import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useGetCustomersQuery } from "state/api";
import { useDeleteCustomerMutation } from "state/api";
import { useUpdateCustomerMutation } from "state/api"; // Adjust the import path as needed
import { useAddCustomerMutation } from "state/api";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        _id: id,
        request_num: "",
        account_num: "",
        Address: "",
        affiliation: "",
        market_segment: "",
        Internal_responsible: "",
        company_interlocutor: "",
        Activity_indicator: "",
        Comment_CA: "",
        role: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "request_num" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Customers() {
  const { data, isLoading } = useGetCustomersQuery();

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [deleteCustomer, { isLoading1, isError }] = useDeleteCustomerMutation();
  const [updateCustomerMutation] = useUpdateCustomerMutation();
  const [addCustomerMutation] = useAddCustomerMutation();
  const updateBackend = async (customerObj) => {
    try {
      const response = await updateCustomerMutation({
        customerObj,
      });
      // Handle success response
      console.log("Customer updated:", response);
    } catch (error) {
      // Handle error
      console.error("Error updating customer:", error);
    }
  };
  const addCustomer = async (customerObj) => {
    try {
      const response = await addCustomerMutation({
        customerObj,
      });
      // Handle success response
      console.log("Customer added:", response);
    } catch (error) {
      // Handle error
      console.error("Error adding customer:", error);
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row._id !== id));
    try {
      // Call the deleteCustomer mutation with the customer ID
      const response = deleteCustomer(id);

      // Handle successful deletion
      console.log("Customer deleted successfully:", response);
    } catch (error) {
      // Handle errors
      console.error("Error deleting customer:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    let customerObj = {
      customerId: newRow._id,
      updatedCustomerData: newRow,
    };
    if (newRow.isNew) {
      addCustomer(newRow);
    } else {
      updateBackend(customerObj);
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      //editable: true,
    },
    {
      field: "request_num",
      headerName: "Request Number",
      flex: 1,
      editable: true,
    },
    {
      field: "account_num",
      headerName: "Account Number",
      flex: 1,
      editable: true,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 2,
      editable: true,
    },
    {
      field: "affiliation",
      headerName: "Affiliation",
      flex: 1,
      editable: true,
    },
    {
      field: "market_segment",
      headerName: "Market Segment",
      flex: 1,
      editable: true,
    },
    {
      field: "Internal_responsible",
      headerName: "Internal Responsible",
      flex: 1,
      editable: true,
    },
    {
      field: "company_interlocutor",
      headerName: "Company Interlocutor",
      flex: 1,
      editable: true,
    },
    {
      field: "Activity_indicator",
      headerName: "Activity Indicator",
      type: "number",
      flex: 0.5,
      editable: true,
    },
    {
      field: "Comment_CA",
      headerName: "Comment",
      flex: 2,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        loading={isLoading || !data}
        columns={columns}
        getRowId={(row) => row._id}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        onProcessRowUpdateError={(error) => {
          // Handle the error here
          console.error("Error during row update:", error);
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
