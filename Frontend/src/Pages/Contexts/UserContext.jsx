import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../../config/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loadingUserDetails,setLoadingUserDetails] = useState(false);
  const {isLoggedIn} = useAuth();

  const fetchUserDetails = async() => {
    setLoadingUserDetails(true);
    try{
      const res = await axios.get(`${API_BASE_URL}/api/v1/profile/get-all-userdetails`);
      console.log(res?.data?.userDetails);
      setUserDetails(res?.data?.userDetails);
      localStorage.setItem("userDetails", JSON.stringify(res?.data?.userDetails));
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }catch(err) {
      console.error("Error fetching user info", err);    
    }finally{
      setLoadingUserDetails(false);
    }
  };
  useEffect(() => {
    if(isLoggedIn && !userDetails) {
      fetchUserDetails();
    }
  },[isLoggedIn]);
  //Persist to localStorage on change
  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails]);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails ,setLoadingUserDetails , loadingUserDetails , fetchUserDetails}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);




// 684035b010e49e49968c6dc2