import axios from "axios";

const BASE_URL = "https://upforce-tech.onrender.com/user";


const fetchDataFromApi = async () => {
    try {
        const  response = await axios.get(BASE_URL +"/");
        
    return response ;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const createUserfromApi=async(payload)=>{
    try {
        const response = await axios.post(BASE_URL + "/register", payload);
        const statusCode = response.status;
        const { message } = response.data;
        console.log(payload)
        return { statusCode, message };
    } catch (error) {
        console.log(error)
        return error;
    }
}
const UpdateUserfromApi=async(id,payload)=>{
    try {
        const response = await axios.put(BASE_URL + `/update/${id}`, payload);
        const statusCode = response.status;
        const { message } = response.data;
        return { statusCode, message };
    } catch (error) {
        console.log(error)
        return error;
    }
}

const deleteUserFromApi = async (id) => {
    try {
      const response = await axios.delete(BASE_URL +`/delete/${id}`);
      const statusCode = response.status;
      const { message } = response.data;
      return { statusCode, message };
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  export default {
    deleteUserFromApi,
    UpdateUserfromApi,
    fetchDataFromApi,
    createUserfromApi,
  };
  