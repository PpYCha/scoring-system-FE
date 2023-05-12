import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Store a newly created user in storage.
export const loginUser = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}user-signin`, {
      email: value.email,
      password: value.password,
    });
    console.log(res);
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
