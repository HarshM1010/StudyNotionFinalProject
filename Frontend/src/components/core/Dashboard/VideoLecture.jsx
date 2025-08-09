import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation,useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Loading from '../../Loading';
import { IoChevronBack } from "react-icons/io5";

const VideoLecture = () => {
    const location = useLocation();
    const {subSectionId} = location.state || {};
    const [videoUrl,setVideoUrl] = useState(null);
    const [loading,setLoading] = useState(null);
    const [lectureName,setLectureName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getSubSectionDetails = async() => {
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:3000/api/v1/course/get-sub-section-details",{subSectionId:subSectionId});
            console.log(res);
            setVideoUrl(res?.data?.subSectionDetails?.videoUrl);
            setLectureName(res?.data?.subSectionDetails?.title);
            setLoading(false);
        }catch(err) {
          console.log("Failed to fetch lecture details");
          toast.error("Video can't be played. Please try again later.");
          setLoading(false);    
        }
      };
      if(subSectionId) {
        getSubSectionDetails();
      }
    },[subSectionId]);

    
    return (
        <div className={`py-5  ${loading ? "flex flex-row items-center justify-center" : ""}`}>
            {
                loading ? (
                    <Loading/>
                )
                :
                (
                    <div className='w-[75%] h-[550px] aspect-video mx-auto'>
                        <div className='flex flex-row items-end gap-5'>
                            <button onClick={() => navigate(-1)} className='hover:text-[#FFE83D] flex flex-row gap-1 items-center text-[#838894] cursor-pointer w-fit'><IoChevronBack/> Back</button>
                            <h1 className='text-[#838894] text-3xl'>{lectureName}</h1>
                        </div>  
                        <ReactPlayer
                            src={videoUrl}
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            controls
                            width="100%"
                            height="100%"
                            className=' rounded-xl border-none cursor-pointer py-3 '
                        />
                    </div>
                    
                )
            }
        
        </div>
    )
}

export default VideoLecture