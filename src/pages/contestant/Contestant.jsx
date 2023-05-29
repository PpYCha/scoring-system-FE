import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import {
  Add,
  Calculate,
  Delete,
  WorkspacePremium,
  Workspaces,
} from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { deleteEvent, indexEvents, showEvent } from "../../api/eventController";

import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import {
  deleteContestant,
  indexContestants,
} from "../../api/contestantController";
import { indexCategories } from "../../api/categoryController";
import AddEditContestant from "./AddEditContestant";

const Contestant = () => {
  const [tableList, setTableList] = useState([{}]);

  const [openContestants, setOpenContestants] = useState(false);

  const {
    state: { contestant },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, [openContestants]);

  const fetch = async () => {
    const res = await indexContestants();
    const filteredList = res.filter(
      (item) => item.event_id === contestant.event_id
    );

    setTableList(filteredList);
  };

  const handleDelete = async (e) => {
    try {
      Swal.fire({
        title: "Do you want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          const res = await deleteContestant(e.original.id);
          fetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpenContestants(false);

    fetch();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "cotestant_number",
        header: "Number",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "municipality",
        header: "Municipality",
      },
      {
        accessorKey: "weight",
        header: "Weight",
      },
      {
        accessorKey: "height",
        header: "Height",
      },
      {
        accessorKey: "shoeSize",
        header: "Shoe Size",
      },
      {
        accessorKey: "swimsuitSize",
        header: "Swimsuit Size",
      },
      {
        accessorKey: "bust",
        header: "Bust",
      },
      {
        accessorKey: "waist",
        header: "Waist",
      },
      {
        accessorKey: "hips",
        header: "Hips",
      },
      {
        accessorKey: "nickname",
        header: "Nickname",
      },

      {
        accessorKey: "birthPlace",
        header: "Birth Place",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
    ],
    []
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column">
        <Paper elevation={3}>
          <Stack
            direction="row"
            spacing={2}
            m={3}
            justifyContent="space-between"
          >
            <Typography variant="h5">List of Contestants</Typography>
          </Stack>
          <Box m={2}>
            <MaterialReactTable
              columns={columns}
              data={tableList}
              enableColumnActions={false}
              enableSorting={false}
              enableEditing
              initialState={{
                density: "compact",
                columnVisibility: { id: false },
                pagination: { pageSize: 30 },
              }}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              enableHiding={false}
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  {/* <Tooltip arrow placement="left" title="Criteria">
                    <IconButton
                      color="secondary"
                      onClick={(e) => handleEdit(row)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip> */}
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
                  onClick={() => setOpenContestants(true)}
                  startIcon={<Add />}
                  variant="outlined"
                >
                  Add New Contestant
                </Button>
              )}
            />
          </Box>
        </Paper>
        <AddEditContestant
          openEvent={openContestants}
          handleCloseEvent={handleClose}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Contestant;
