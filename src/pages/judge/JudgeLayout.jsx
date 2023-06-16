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
  const [loading, setLoading] = useState(false);

  const {
    state: {},
    dispatch,
  } = useValue();

  const actions = actionHelper();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const criteriaTalent = [
    {
      id: 3,
      max: 40,
      min: 30,
    },
    {
      id: 4,
      max: 30,
      min: 20,
    },
    {
      id: 5,
      max: 20,
      min: 15,
    },
    {
      id: 6,
      max: 10,
      min: 5,
    },
  ];

  const criteriaSwimsuit = [
    {
      id: 7,
      max: 45,
      min: 35,
    },
    {
      id: 8,
      max: 30,
      min: 20,
    },
    {
      id: 9,
      max: 25,
      min: 15,
    },
  ];

  const judges = [
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ev_id = 1;
    const sub_id = 2;
    const cat_id = 4;

    const promises = [];

    for (const judge of judges) {
      const judg_id = judge.id;
      for (let i = 1; i <= 20; i++) {
        for (const item of criteriaTalent) {
          const score = Math.random() * (item.max - item.min) + item.min;

          promises.push(
            storeScore({
              score: score.toFixed(1),
              contestant_id: i,
              judge_id: judg_id,
              criteria_id: item.id,
              event_id: ev_id,
              subEvent_id: sub_id,
              category_id: cat_id,
            })
          );
        }
      }
    }

    try {
      await Promise.all(promises);
      console.log("All scores stored successfully");
    } catch (error) {
      console.error("An error occurred while storing scores", error);
    }

    setLoading(false);
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
