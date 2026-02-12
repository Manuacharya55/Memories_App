import { createContext,useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token,setToken] = useState(null);
    
    const saveToken = (token) => {
        setToken(token);
        localStorage.setItem("token",token);
    };

    const removeToken = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const fetchToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }else{
            setToken(null);
        }
    };

    useEffect(() => {
        fetchToken();
    },[]);
    return (
        <AuthContext.Provider value={{token,saveToken,removeToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const token = useContext(AuthContext);
    if(!token){
        throw new Error("No token found");
    }
    return token;
};
