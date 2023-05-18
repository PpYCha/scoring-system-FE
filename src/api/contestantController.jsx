import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexContestants = async () => {
  try {
    const res = await axios.get(`${apiUrl}contestants`);

    return res.data.contestants;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
export const storeContestant = async (value) => {
  try {
    const res = await axios.post(`${apiUrl}contestants`, {
      name: value.name,
      municipality: value.municipality,
      age: value.age,
      weight: value.weight,
      height: value.height,
      shoeSize: value.shoeSize,
      swimsuitSize: value.swimsuitSize,
      bust: value.bust,
      waist: value.waist,
      hips: value.hips,
      nickname: value.nickname,
      dateOfBirth: value.dateOfBirth,
      birthPlace: value.birthPlace,
      event_id: value.event_id,
      cotestant_number: value.cotestant_number,
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
export const deleteContestant = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}contestants/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
