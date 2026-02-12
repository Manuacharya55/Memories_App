import axios from "axios";
import { toast } from "react-hot-toast";
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getRequest = async (url, token) => {
    try {
        const response = await apiClient.get(url, {
            headers: {
                "auth-token": token
            }
        })

        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong")
        return error.response?.data
    }
}

export const postRequest = async (url, data, token) => {
    try {
        const response = await apiClient.post(url, data, {
            headers: {
                "auth-token": token
            }
        });
        return response.data
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong")
        return error.response?.data
    }
}

export const patchRequest = async (url, data, token) => {
    try {
        const response = await apiClient.patch(url, data, {
            headers: {
                "auth-token": token
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong")
        return error.response?.data
    }
}

export const deleteRequest = async (url, token) => {
    try {
        const response = await apiClient.delete(url, {
            headers: {
                "auth-token": token
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong")
        return error.response?.data
    }
}