import { getRequest, postRequest, patchRequest, deleteRequest } from "../Api/axios";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export const useMemory = () => {
    const [memories, setMemories] = useState([]);
    const [memory, setMemory] = useState(null)
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);


    const asyncHandler = useCallback(async (func) => {
        try {
            setLoading(true)
            setError(null)
            const response = await func()
            if (response.success) {
                return response.data
            } else {
                throw new Error(response.message || "Request failed");
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchMemories = async (url, page = 1, tag, search, token) => {
        const response = await asyncHandler(() => getRequest(`${url}?page=${page}&tag=${tag}&search=${search}`, token))
        if (response) {
            setMemories(response)
            return response
        }
    }

    const fetchSingleMemory = async (url, token) => {
        const response = await asyncHandler(() => getRequest(`${url}`, token))
        if (response) {
            setMemory(response)
            return response
        }
    }

    const createMemory = async (url, data, token) => {
        setProcessing(true)
        const response = await asyncHandler(() => postRequest(`${url}`, data, token))
        if (response) {
            // Note: asyncHandler returns response.data directly if success
            // But postRequest returns the full response object from axios? 
            // Wait, axios.js postRequest returns response.data.
            // asyncHandler returns response.data (from the successful check).
            // So 'response' here IS the data.
            toast.success("Memory Created Successfully")
            setMemories(prev => [...prev, response])
            return response
        }
        setProcessing(false)
    }

    const updateMemory = async (url, data, token) => {
        setProcessing(true)
        const response = await asyncHandler(() => patchRequest(`${url}`, data, token))
        if (response) {
            toast.success("Memory Updated Successfully")
            setMemories(prev => prev.map(memory => memory._id === response._id ? response : memory))
            return response;
        }
        setProcessing(false)
    }

    const deleteMemory = async (url, token) => {
        setProcessing(true)
        const response = await asyncHandler(() => deleteRequest(`${url}`, token))
        if (response) {
            toast.success("Memory Deleted Successfully")
            setMemories(prev => {
                return {
                    ...prev,
                    data: prev.data.filter(memory => memory._id !== response._id)
                }
            })
        }
        setProcessing(false)
    }

    return { memories, memory, loading, error, fetchMemories, fetchSingleMemory, createMemory, updateMemory, deleteMemory, processing }
}