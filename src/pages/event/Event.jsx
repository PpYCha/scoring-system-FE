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
  Category,
  CreditScore,
  CropDin,
  CropTwoTone,
  Delete,
  Edit,
  KingBed,
  People,
  Score,
  Scoreboard,
  SportsScore,
  WorkspacePremium,
  Workspaces,
} from "@mui/icons-material";
import AddEditEventDialog from "./AddEditEventDialog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { deleteEvent, indexEvents, showEvent } from "../../api/eventController";
import AddEditCategory from "../AddEditCategory";
import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";
import Swal from "sweetalert2";
import AddEditContestant from "../contestant/AddEditContestant";
import AddEditScore from "../score/AddEditScore";
import { navigateAccounts, navigateContestants } from "../../utils/navigateUrl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessQueen,
  faEnvelope,
  faLayerGroup,
  faSquarePollHorizontal,
} from "@fortawesome/free-solid-svg-icons";

const Event = () => {
  const [tableList, setTableList] = useState([{}]);
  const [openEvent, setOpenEvent] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [openContestants, setOpenContestants] = useState(false);
  const [openScore, setOpenScore] = useState(false);

  const { dispatch } = useValue();

  const actions = actionHelper();
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await indexEvents();
    setTableList(res);
  };

  const handleStore = async (values) => {};

  const handleCategory = async (e) => {
    try {
      const res = await showEvent(e.original.id);

      if (res.status === 200) {
        dispatch({
          type: actions.UPDATE_CATEGORY,
          payload: {
            event_id: res.data.event.id,
          },
        });
        setOpenCategory(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContestant = async (e) => {
    try {
      const res = await showEvent(e.original.id);

      if (res.status === 200) {
        dispatch({
          type: actions.UPDATE_CONTESTANT,
          payload: {
            event_id: res.data.event.id,
          },
        });
        navigate(navigateContestants);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScore = async (e) => {
    try {
      const res = await showEvent(e.original.id);

      if (res.status === 200) {
        dispatch({
          type: actions.UPDATE_CONTESTANT,
          payload: {
            event_id: res.data.event.id,
          },
        });
        setOpenScore(true);
      }
    } catch (error) {
      console.log(error);
    }
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
          const res = await deleteEvent(e.original.id);
          fetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpenEvent(false);
    setOpenCategory(false);
    setOpenContestants(false);
    setOpenScore(false);
    fetch();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
        Cell: ({ cell }) => (
          <Box
            sx={{
              maxWidth: "500px",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
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
            <Typography variant="h5">List of Events</Typography>
          </Stack>
          <Box m={2}>
            <MaterialReactTable
              columns={columns}
              data={tableList}
              enableColumnActions={false}
              enableSorting={true}
              enableDensityToggle={false}
              enableFullScreenToggle={true}
              enableHiding={true}
              enableEditing
              initialState={{
                density: "compact",
                columnVisibility: {
                  id: false,
                  projectId: false,
                  controlNumber: false,
                },
              }}
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Category">
                    <IconButton
                      color="primary"
                      onClick={(e) => handleCategory(row)}
                    >
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip arrow placement="right" title="Contestants">
                    <IconButton
                      // color="success"
                      onClick={(e) => {
                        handleContestant(row);
                      }}
                    >
                      <FontAwesomeIcon icon={faChessQueen} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Score">
                    <IconButton
                      color="warning"
                      onClick={(e) => {
                        handleScore(row);
                      }}
                    >
                      <FontAwesomeIcon icon={faSquarePollHorizontal} />
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
                  onClick={() => setOpenEvent(true)}
                  startIcon={<Add />}
                  variant="outlined"
                >
                  Create New Event
                </Button>
              )}
            />
          </Box>
        </Paper>
        <AddEditEventDialog
          openEvent={openEvent}
          handleCloseEvent={handleClose}
        />
        <AddEditCategory
          openEvent={openCategory}
          handleCloseEvent={handleClose}
        />
        <AddEditContestant
          openEvent={openContestants}
          handleCloseEvent={handleClose}
        />
        <AddEditScore openEvent={openScore} handleCloseEvent={handleClose} />
      </Box>
    </LocalizationProvider>
  );
};

export default Event;
