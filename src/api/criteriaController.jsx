import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexCriterias = async () => {
  try {
    const res = await axios.get(`${apiUrl}criterias`);

    return res.data.criterias;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeCriteria = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}criterias`, {
      description: value.description,
      percentage: value.percentage,
      category_id: value.category_id,
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
export const showCriteria = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}criterias/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

//Update the specified user in storage.

//Remove the specified user from storage
export const deleteCriteria = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}criterias/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
