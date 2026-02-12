import { useState } from "react";
import { getRequest, patchRequest } from "../Api/axios";
import toast from "react-hot-toast";


const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProfile = async (token) => {
        try {
            setLoading(true)
            const response = await getRequest("users/profile", token)
            if (response.success) {

                setProfile(response.data)
                return response.data
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (data, token) => {
        try {
            setProcessing(true)
            const response = await patchRequest("users/update-profile", data, token)
            if (response.success) {
                toast.success(response.message || "Profile Updated Successfully")
                setProfile(response.data)
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

    const updatePassword = async (data, token) => {
        try {
            setProcessing(true)
            const response = await patchRequest("users/update-password", data, token)
            if (response.success) {
                toast.success(response.message || "Password Updated Successfully")
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

    return { profile, processing, loading, error, getProfile, updatePassword, updateProfile }
}

export default useProfile
