import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import AddEditUserModal from "./AddEditUserModal";
import { Add, Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

import { deleteUser, indexUsers, showUser } from "../../api/userController";
import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";

const Account = () => {
  const [userList, setUserList] = useState([{}]);
  const [title, setTitle] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const {
    state: { loading },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  const fetchUsers = async () => {
    try {
      const users = await indexUsers();
      console.log(users);
      setUserList(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (e) => {
    try {
      const res = await showUser(e.original.id);
      console.log(res);
      if (res.status === 200) {
        setTitle("Update Account");
        setCreateModalOpen(true);
        // dispatch({
        //   type: actions.UPDATE_USER_ACCOUNT,
        //   payload: {
        //     id: res.data.user.id,
        //     name: res.data.user.name,
        //     email: res.data.user.email,
        //     password: res.data.user.password,
        //     contactNumber: res.data.user.contactNumber,
        //     event: res.data.user.event,
        //     status: res.data.user.status,
        //     role: res.data.user.role,
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser(e.original.id);
          await fetchUsers();
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    });
  };

  const handleClose = () => {
    setCreateModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "contactNo",
        header: "Contact Number",
      },
      {
        accessorKey: "event",
        header: "Event",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
    ],
    []
  );

  return (
    <Box display="flex" flexDirection="column">
      <Paper elevation={3}>
        <Stack direction="row" spacing={2} m={3} justifyContent="space-between">
          <Typography variant="h5">Users List</Typography>
        </Stack>
        <Box m={2}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <MaterialReactTable
                columns={columns}
                data={userList}
                enableColumnActions={false}
                enableSorting={false}
                enableEditing
                initialState={{
                  density: "compact",
                  columnVisibility: { id: false },
                }}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableHiding={false}
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Tooltip arrow placement="left" title="Edit">
                      <IconButton onClick={(e) => handleEdit(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                      <IconButton
                        color="error"
                        onClick={(e) => handleDelete(row)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                renderTopToolbarCustomActions={() => (
                  <Button
                    onClick={() => {
                      dispatch({ type: actions.RESET_USER_ACCOUNT });
                      setCreateModalOpen(true);
                      setTitle("Create New Account");
                    }}
                    startIcon={<Add />}
                    variant="outlined"
                  >
                    Create New Account
                  </Button>
                )}
              />

              <AddEditUserModal
                open={createModalOpen}
                onClose={handleClose}
                title={title}
                fetchUsers={() => fetchUsers()}
              />
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Account;
