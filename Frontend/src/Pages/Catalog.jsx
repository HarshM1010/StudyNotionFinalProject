import React from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { use } from 'react';

const Catalog = (props) => {
  const [isOpen,setIsOpen] = useState(false);
  const [categories,setCategories] = useState([]);
  const timeOutRef = useRef(null);
  const [categoryClicked,setCategoryClicked] = useState(false);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async() => {
      try{
        const response = await axios.get("http://localhost:3000/api/v1/course/get-all-categories");
        setCategories(response.data.allCategories);
        // console.log(response.data.allCategories);
        setError(null);
      }catch(err) {
        console.error('Failed to fetch categories:', err);
        setError("Unable to fetch categories");
      }
    }
    fetchCategories();
  },[]);
  const handleMouseEnter = () => {
    clearTimeout(timeOutRef.current);
    setIsOpen(true);
  }
  const handleMouseLeave = () => {
    timeOutRef.current = setTimeout(() => {
      setIsOpen(false);   // jis function ko delay karna hai..
    },100);  //delay in ms..
  }
  useEffect(() => {
    if(props.isClicked !== "catalog") {
      setCategoryClicked(false);
    }
  },[props.isClicked]);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`flex items-end cursor-pointer ${categoryClicked ? "text-[#FFE83D]" : "text-[#C0C3D0]"}`}>Catalog <span><ChevronDown /></span></div>
      {
        isOpen && (
          <div className='absolute top-13 w-[300px]  rounded-lg bg-[#E6E6F0] py-4 px-4 shadow-xl z-50 transition-all 2s ease-in-out'>
            <div className="absolute -top-2 left-6 w-4 h-4 bg-[#E6E6F0] rotate-45"></div>
            {
              error ? (
                <li className="text-black py-2 px-2">{error}</li>
              )
              : (
                <ul className='text-black space-y-1'>
                  {
                    categories.map((category,id) => (
                      <Link
                      //if want to remove the id from the link then react context can be used
                        to={`/catalog/${category.name.replace(/\s+/g, '-').toLowerCase()}?id=${category._id}`}
                        onClick={() => {
                          setCategoryClicked(true);
                          props.setActiveNav("catalog");
                        }}
                      >
                        <li
                          key={id}
                          className="cursor-pointer hover:bg-[#C5C7D4] rounded-lg py-2 px-2"
                        >
                          {category.name}
                        </li>
                      </Link>
                    ))
                  }
                </ul>
              )
            }
          </div>
        )
      }
    </div>
    
  )
}

export default Catalog