import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexCategories = async () => {
  try {
    const res = await axios.get(`${apiUrl}categories`);

    return res.data.categories;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeCategory = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}categories`, {
      category: value.category,
      description: value.description,
      percentage: value.percentage,
      event_id: value.event_id,
      subEvent_id: value.subEvent_id,
      minimumPercentage: value.minimumPercentage,
      maximumPercentage: value.maximumPercentage,
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
export const showCategory = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}categories/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

//Update the specified user in storage.

//Remove the specified user from storage
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}categories/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
