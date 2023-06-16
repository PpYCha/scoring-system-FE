import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexUsers = async () => {
  try {
    const res = await axios.get(`${apiUrl}users`);
    return res.data.users;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeUser = async (value) => {
  console.log(value);
  try {
    const res = await axios.post(`${apiUrl}users`, {
      name: value.name,
      email: value.email,
      password: value.password,
      contactNumber: value.contactNumber,
      status: value.status,
      event_id: value.event,
      role: value.role,
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

export const showUser = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}users/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

//Update the specified user in storage.
export const updateUser = async (id, value) => {
  console.log(value);
  try {
    const res = await axios.put(`${apiUrl}users/${id}`, {
      name: value.name,
      email: value.email,
      password: value.password,
      contactNumber: value.contactNumber,
      status: value.status,
      event_id: value.event,
      role: value.role,
    });

    return res;
  } catch (error) {
    console.log("post error:", error);
  }
};

//Remove the specified user from storage
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}users/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
