import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Add, Delete } from "@mui/icons-material";
import AddEditEventDialog from "./AddEditEventDialog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { deleteEvent, indexEvents, showEvent } from "../../api/eventController";
import AddEditCategory from "../AddEditCategory";
import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";
import Swal from "sweetalert2";
import AddEditContestant from "../contestant/AddEditContestant";
import OverallScoreDialog from "../score/OverallScoreDialog";
import { navigateContestants } from "../../utils/navigateUrl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessQueen,
  faLayerGroup,
  faPenToSquare,
  faSquarePollHorizontal,
  faTrashCan,
  faCirclePlus,
  faCalendarPlus,
  faSquarePollVertical,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import AddEditSubEventDialog from "./AddEditSubEventDialog";
import { deleteSubEvent, indexSubEvents } from "../../api/subEventController";
import AddEditSettingsEventDialog from "./AddEditSettingsEventDialog";
import PerSubEventScoreDialog from "../score/PerSubEventScoreDialog";

const Event = () => {
  const [tableList, setTableList] = useState([{}]);
  const [subList, setSubList] = useState([{}]);
  const [openEvent, setOpenEvent] = useState(false);
  const [openSubEvent, setOpenSubEvent] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openContestants, setOpenContestants] = useState(false);
  const [openScore, setOpenScore] = useState(false);
  const [openSettingsEvent, setOpenSettingsEvent] = useState(false);
  const [openSubEventScore, setOpenSubEventScore] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openScoreMenu = Boolean(anchorEl);
  const handleClickOpenScoreMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseScoreMenu = () => {
    setAnchorEl(null);
  };

  const { dispatch } = useValue();

  const actions = actionHelper();
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const [resEvents, resSubEvents] = await Promise.all([
      indexEvents(),
      indexSubEvents(),
    ]);

    setTableList(resEvents);
    setSubList(resSubEvents);
  };

  const handleCategory = async (row, item) => {
    try {
      dispatch({
        type: actions.UPDATE_CATEGORY,
        payload: {
          event_id: row.original.id,
          subEvent_id: item.id,
          titleSubEvent: item.title,
          title: row.original.title,
        },
      });
      setOpenCategory(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubEvent = async (e) => {
    // console.log(e);

    if (e.event_id) {
      console.log(e);
      dispatch({
        type: actions.UPDATE_SUBEVENT,
        payload: {
          title: e.title,
          date: e.date,
          event_id: e.event_id,
          id: e.id,
        },
      });
    } else {
      const res = await showEvent(e.original.id);

      if (res.status === 200) {
        dispatch({
          type: actions.UPDATE_SUBEVENT,
          payload: {
            event_id: res.data.event.id,
          },
        });
      }
    }
    setOpenSubEvent(true);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleContestant = async (e, item) => {
    try {
      dispatch({
        type: actions.UPDATE_CONTESTANT,
        payload: {
          event_id: e.original.id,
          // subEvent_id: item.id,
        },
      });
      navigate(navigateContestants);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScore = (e) => {
    try {
      dispatch({ type: actions.START_LOADING });
      dispatch({
        type: actions.UPDATE_CONTESTANT,
        payload: {
          event_id: e.original.id,
          // subEvent_id: e.original.id,
        },
      });

      dispatch({ type: actions.END_LOADING });
      setOpenScore(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScorePerSubEvent = (row, item) => {
    try {
      dispatch({ type: actions.START_LOADING });
      dispatch({
        type: actions.UPDATE_CONTESTANT,
        payload: {
          event_id: item.event_id,
          subEvent_id: item.id,
        },
      });

      dispatch({ type: actions.END_LOADING });
      setOpenSubEventScore(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    console.log(e);
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

  const handleDeleteSubEvent = async (e) => {
    console.log(e);
    try {
      Swal.fire({
        title: `Do you want to delete ${e.title}?`,
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
          const res = await deleteSubEvent(e.id);
          fetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEvent = async (e) => {
    try {
      const res = await showEvent(e.original.id);

      dispatch({
        type: actions.UPDATE_EVENT,
        payload: {
          id: e.original.id,
          title: e.original.title,
          description: e.original.description,
          date: e.original.date,
        },
      });
      console.log(res);
    } catch (error) {}
    setOpenEvent(true);
  };

  const handleSettingsEvent = async (e) => {
    setOpenSettingsEvent(true);
  };

  const handleClose = () => {
    setOpenEvent(false);
    setOpenCategory(false);
    setOpenContestants(false);
    setOpenScore(false);
    setOpenSubEvent(false);
    setOpenSettingsEvent(false);
    setOpenSubEventScore(false);
    dispatch({ type: actions.RESET_EVENT });
    dispatch({ type: actions.RESET_SUBEVENT });
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
      // {
      //   accessorKey: "description",
      //   header: "Description",
      //   Cell: ({ cell }) => (
      //     <Box
      //       sx={{
      //         maxWidth: "500px",
      //         wordWrap: "break-word",
      //         whiteSpace: "normal",
      //       }}
      //     >
      //       {cell.getValue()}
      //     </Box>
      //   ),
      // },
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
                <Box sx={{ display: "flex", width: 0 }}>
                  <Tooltip arrow placement="left" title="Sub Event">
                    <IconButton
                      color="primary"
                      onClick={(e) => handleSubEvent(row)}
                    >
                      <FontAwesomeIcon icon={faCalendarPlus} size="xs" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="left" title="Edit Event">
                    <IconButton
                      color="success"
                      onClick={(e) => handleEditEvent(row)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="xs" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip arrow placement="right" title="Contestants">
                    <IconButton
                      // color="success"
                      onClick={(e) => {
                        handleContestant(row);
                      }}
                    >
                      <FontAwesomeIcon icon={faChessQueen} size="xs" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Score">
                    <IconButton
                      color="warning"
                      // onClick={(e) => {
                      //   handleScore(row, item);
                      // }}
                      aria-controls={
                        openScoreMenu ? "demo-positioned-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openScoreMenu ? "true" : undefined}
                      onClick={handleClickOpenScoreMenu}
                    >
                      <FontAwesomeIcon icon={faSquarePollVertical} size="xs" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={openScoreMenu}
                    onClose={handleCloseScoreMenu}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleScore(row);
                      }}
                    >
                      Print Overall
                    </MenuItem>
                    <MenuItem onClick={handleCloseScoreMenu}>
                      Print Per Category
                    </MenuItem>
                  </Menu>

                  <Tooltip arrow placement="right" title="Event Settings">
                    <IconButton
                      onClick={(e) => {
                        handleSettingsEvent(row);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        size="xs"
                        style={{ color: "#5c5c5c" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={(e) => handleDelete(row)}
                    >
                      {/* <FontAwesomeIcon icon={faTrashCan} size="xs" /> */}
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
              renderDetailPanel={({ row }) => (
                <>
                  {subList
                    .filter((item) => item.event_id === row.original.id) // Filter the subList based on the account in tableList row
                    .map((item) => (
                      <Box
                        key={item.id + item.event_id}
                        sx={{
                          display: "flex",

                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Tooltip arrow placement="left" title="Category">
                            <IconButton
                              color="primary"
                              onClick={(e) => handleCategory(row, item)}
                            >
                              <FontAwesomeIcon icon={faCirclePlus} size="xs" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            arrow
                            placement="left"
                            title="Edit Sub  Event"
                          >
                            <IconButton
                              color="success"
                              onClick={(e) => handleSubEvent(item)}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} size="xs" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow placement="right" title="Score">
                            <IconButton
                              color="warning"
                              onClick={(e) => {
                                handleScorePerSubEvent(row, item);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faSquarePollVertical}
                                size="xs"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            arrow
                            placement="right"
                            title="Delete Sub Event"
                          >
                            <IconButton
                              color="error"
                              onClick={(e) => handleDeleteSubEvent(item)}
                            >
                              {/* <FontAwesomeIcon icon={faTrashCan} size="xs" /> */}
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          spacing={2}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", marginLeft: 2 }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "bold", marginLeft: 2 }}
                          >
                            {item.date}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                </>
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
        <OverallScoreDialog
          openEvent={openScore}
          handleCloseEvent={handleClose}
        />
        <PerSubEventScoreDialog
          openEvent={openSubEventScore}
          handleCloseEvent={handleClose}
        />
        <AddEditSubEventDialog
          openEvent={openSubEvent}
          handleCloseEvent={handleClose}
        />
        <AddEditSettingsEventDialog
          openEvent={openSettingsEvent}
          handleCloseEvent={handleClose}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Event;
