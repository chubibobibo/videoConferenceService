import axios from "axios";

export const loggedUser = async () => {
  try {
    const response = await axios.get("/api/users/loggedUser");
    return response.data;
  } catch (err) {
    console.log("something went wrong", err.response.data.message);
    return null;
  }
};
