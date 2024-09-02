import axios from "axios";

export const loggedUser = async () => await axios.get("/api/users/loggedUser");
