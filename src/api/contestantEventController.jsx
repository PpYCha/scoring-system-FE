import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Display a listing of the users
export const indexContestantsEvents = async () => {
  try {
    const res = await axios.get(`${apiUrl}contestantsevents`);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// Store a newly created user in storage.
// export const storeContestant = async (value) => {
//   const formData = new FormData();
//   formData.append("name", value.name);
//   formData.append("municipality", value.municipality);
//   formData.append("age", value.age);
//   formData.append("weight", value.weight);
//   formData.append("height", value.height);
//   formData.append("shoeSize", value.shoeSize);
//   formData.append("swimsuitSize", value.swimsuitSize);
//   formData.append("bust", value.bust);
//   formData.append("waist", value.waist);
//   formData.append("hips", value.hips);
//   formData.append("nickname", value.nickname);
//   formData.append("dateOfBirth", value.dateOfBirth);
//   formData.append("birthPlace", value.birthPlace);
//   formData.append("event_id", value.event_id);
//   formData.append("cotestant_number", value.cotestant_number);
//   // formData.append("subEvent_id", value.subEvent_id);
//   formData.append("image", value.image);

//   try {
//     const res = await axios.post(`${apiUrl}contestants`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
//       },
//     });
//     return res;
//   } catch (error) {
//     if (error.response.status === 422) {
//       const errorMessage =
//         "The data you entered is invalid. Please check the errors below.";
//       const errors = error.response.data.errors;
//       throw { errorMessage, errors };
//     } else {
//       throw error;
//     }
//   }
// };

// //Update the specified user in storage.

// //Remove the specified user from storage
// export const deleteContestant = async (id) => {
//   try {
//     const res = await axios.delete(`${apiUrl}contestants/${id}`);
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };
