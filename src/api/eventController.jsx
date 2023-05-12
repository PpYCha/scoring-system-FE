import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexEvents = async () => {
  try {
    const res = await axios.get(`${apiUrl}events`);

    return res.data.events;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeEvent = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}events`, {
      title: value.title,
      description: value.description,
      date: value.date,
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
export const showEvent = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}events/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

//Update the specified user in storage.

//Remove the specified user from storage
export const deleteEvent = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}events/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
