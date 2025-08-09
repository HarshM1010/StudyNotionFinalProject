import { createContext,useContext,useState } from "react";
import axios from "axios";

export const ratingContext = createContext();

export const RatingProvider = ({children}) => {
    const[avgRating,setAvgRating] = useState({});
    const[totalRatings,setTotalRatings] = useState({});
    
    const fetchAvgRating = async(courseIds = []) => {   // i am sending an array of course ids to the api...
        try{
            const res = await axios.post("http://localhost:3000/api/v1/course/average-Rating",{courseIds});
            // console.log(res);
            const ratings = res?.data?.averageRatings;
            // console.log(res.data.averageRatings);
            setAvgRating(prev => ({...prev, ...ratings}));
        }catch(err) {
            console.warn("Ratings cannot be fetched.",err);
        }
    }
  
    const fetchTotalRating = async(courseIds = []) => {  
        try{
            const res = await axios.post("http://localhost:3000/api/v1/course/total-Ratings",{courseIds});
            const totals = res?.data?.totalRating;
            setTotalRatings(prev => ({...prev,...totals}));
            // console.log(res.data.totalRating);
        }catch(err) {
            console.warn("Ratings cannot be fetched.",err);
        }
    }

    return (
        <ratingContext.Provider value={{avgRating,totalRatings,fetchAvgRating,fetchTotalRating}}>
            {children}
        </ratingContext.Provider>
    )
}

export const useRating = () => useContext(ratingContext);