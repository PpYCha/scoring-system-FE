import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexSubEvents = async () => {
  try {
    const res = await axios.get(`${apiUrl}subevents`);

    return res.data.subEvents;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeSubEvent = async (value) => {
  console.log(value);
  try {
    const res = await axios.post(`${apiUrl}subevents`, {
      title: value.title,
      date: value.date,
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

// Display the specified resource.
export const showSubEvent = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}subevents/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

//Update the specified user in storage.

//Remove the specified user from storage
export const deleteSubEvent = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}subevents/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
