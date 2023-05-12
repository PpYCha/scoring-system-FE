import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexScores = async () => {
  try {
    const res = await axios.get(`${apiUrl}scores`);

    return res.data.scores;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeScore = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}scores`, {
      score: value.score,
      contestant_id: value.contestant_id,
      judge_id: value.judge_id,
      criteria_id: value.criteria_id,
      event_id: value.event_id,
    });

    return res;
  } catch (error) {
    if (error.response.status === 422) {
      const errorMessage =
        "The data you entered is invalid. Please check the errors below.";
      const errors = error.response.data.errors;
      throw { errorMessage, errors };
    } else {
      throw error;
    }
  }
};

//Update the specified user in storage.

//Remove the specified user from storage
export const deleteScore = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}scores/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
