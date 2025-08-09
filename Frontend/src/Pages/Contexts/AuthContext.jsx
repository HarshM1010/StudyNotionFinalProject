import { createContext,useState,useEffect,useContext } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            try{
                const decoded = jwtDecode(token);
                // console.log(decoded);
                const isExpired = decoded.exp*1000 < Date.now();
                if(isExpired) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }
                else {
                    setIsLoggedIn(true);
                }
            }catch(err) {
                console.error("Invalid token:", err.message);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        }
    },[]);
    return (
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);