import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { storeScore } from "../../api/scoreController";
import Swal from "sweetalert2";
import actionHelper from "../../context/actionHelper";
import { useValue } from "../../context/ContextProvider";

const JudgeLayout = () => {
  const [formData, setFormData] = useState({
    id: 1,
    score: 10,
    contestant_id: 26,
    judge_id: 1,
    criteria_id: "",
    event_id: 12,
    subEvent_id: 53,
    category_id: 17,
  });

  const {
    state: { loading },
    dispatch,
  } = useValue();

  const actions = actionHelper();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: actions.START_LOADING });
    let cat_id = 18;
    let sub_id = 50;
    let ev_id = 12;
    for (let i = 23; i <= 45; i++) {
      const score = Math.random() * (40 - 30.0) + 4.0;

      try {
        const res = await storeScore({
          score: score.toFixed(1),
          contestant_id: i,
          judge_id: 6,
          criteria_id: "",
          event_id: ev_id,
          subEvent_id: sub_id,
          category_id: cat_id,
        });
        const res2 = await storeScore({
          score: score.toFixed(1),
          contestant_id: i,
          judge_id: 7,
          criteria_id: "",
          event_id: ev_id,
          subEvent_id: sub_id,
          category_id: cat_id,
        });
        const res3 = await storeScore({
          score: score.toFixed(1),
          contestant_id: i,
          judge_id: 8,
          criteria_id: "",
          event_id: ev_id,
          subEvent_id: sub_id,
          category_id: cat_id,
        });
        const res4 = await storeScore({
          score: score.toFixed(1),
          contestant_id: i,
          judge_id: 9,
          criteria_id: "",
          event_id: ev_id,
          subEvent_id: sub_id,
          category_id: cat_id,
        });
        const res5 = await storeScore({
          score: score.toFixed(1),
          contestant_id: i,
          judge_id: 10,
          criteria_id: "",
          event_id: ev_id,
          subEvent_id: sub_id,
          category_id: cat_id,
        });

        // Handle the response if needed
        console.log(res);
      } catch (error) {
        console.error(error); // Optional: Handle the error if needed
      }
    }
    Swal.fire({
      icon: "success",
      title: "",
      showConfirmButton: false,
      timer: 2000,
    });
    dispatch({ type: actions.END_LOADING });
  };

  const handleScore = async () => {
    try {
      const res = await storeScore(formData);
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error); // Optional: Handle the error if needed
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} p={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contestant ID"
            name="contestant_id"
            value={formData.contestant_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Judge ID"
            name="judge_id"
            value={formData.judge_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Criteria ID"
            name="criteria_id"
            value={formData.criteria_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event ID"
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="SubEvent ID"
            name="subEvent_id"
            value={formData.subEvent_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category ID"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Score"
            name="score"
            value={formData.score}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {loading ? null : (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default JudgeLayout;
