import { useState } from "react"
import { postRequest } from "../Api/axios";
import toast from "react-hot-toast";


export const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [Processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const register = async (user) => {
        try {
            const response = await postRequest("users/register", user)
            if (response.success) {
                toast.success(response.message || "Registration Successful")
                setUser(response.data)
                return response.data
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setProcessing(false)
        }
    }

    const login = async (user) => {
        try {
            const response = await postRequest("users/login", user)
            if (response.success) {
                toast.success(response.message || "Login Successful")
                setUser(response.data)
                return response.data
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setProcessing(false)
        }
    }

    return { user, Processing, error, register, login }
}