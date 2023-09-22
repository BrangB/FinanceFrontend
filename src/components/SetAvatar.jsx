import React, { useEffect, useRef, useState } from 'react'
import defaultImage from '../img/Avatar/defaultAvatar.png'
import { Country, State, City }  from 'country-state-city';
import { motion } from "framer-motion"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLottie } from "lottie-react";
import CatLoading from "../img/lottieAnimation/animation_lln7ms9w.json"
import { insertData } from '../Api/Api';


const SetAvatar = () => {
    const inputRef = useRef(null);
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState({
      Address: "",
      City: "",
      SelectedCountry: "",
      Occupation: "",
      DateOfBirth: "",
      Gender: "",
      Active: true,
      AvatarPath: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem("UserData")){
        navigate("/mainpage")
      }
    }, []);

    const options = {
      animationData: CatLoading,
      loop: true
    };
  
    const { View } = useLottie(options);

    useEffect(() => {
      if(localStorage.getItem("navigate")){
        navigate("/login")
      }
    }, [])

    useEffect(() => {
      const startAnimate = () => {
          setInterval(() => {
              setIsOpen(true)
          }, 500);
      }
      startAnimate()
    }, [])

    useEffect(() => {
      setCountry(Country.getAllCountries())
    }, [])

    const toastOptions = {
      position: "top-center",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
  }

    const variants = {
      open: { opacity: 1, scale: 1 } ,
      closed: { opacity: 0, scale: 0 },
    }

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleChange = (event) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setInput({...input, AvatarPath: reader.result})
        })
        reader.readAsDataURL(event.target.files[0])

    }

    const handleSubmit = () => {
      if(handleValidation()){
        setIsLoading(true);
        const TempData = JSON.parse(localStorage.getItem("TempData"));
        axios.post(insertData, {
          ...input,
          name: TempData.name,
          email: TempData.email,
          password: TempData.password
        })
        .then(res => {
          if(res.data.status === false){
            toast.error(res.data.msg, toastOptions);
            setIsLoading(false)
          }
          if(res.data.status === true){
            setIsLoading(false)
            toast.success(res.data.msg, toastOptions);
            localStorage.clear();
            setInput(
              {
                Address: "",
                City: "",
                SelectedCountry: "",
                Occupation: "",
                DateOfBirth: "",
                Gender: "",
                Active: true,
                AvatarPath: ""
              }
            )
            localStorage.setItem("navigate", "Yes")
            setTimeout(() => {
              window.location.reload();
            }, 1000);

            // localStorage.setItem("UserData", JSON.stringify({
            //   ...input,
            //   Name: TempData.name,
            //   Email: TempData.email,
            // }))
          }
        }).catch(err => {
          console.log(err)
          isLoading(false)
        })
      }
    }

    const handleValidation = () => {
      const {Address, City, SelectedCountry, Occupation, DateOfBirth, Gender} = input;
      if(Address === "" || City === "" || SelectedCountry === "" || DateOfBirth === "" || Gender === "" || Occupation === ""){
        toast.error("Please fill all field", toastOptions);
        return false
      }
      return true;
    }

    const GoBack = () => {
      navigate("/login")
      localStorage.clear();
    }

  return (

    <>
      <div className={`${isLoading ? 'flex' : 'hidden'} overlay w-screen h-screen bg-[#000000bb] z-10 absolute top-0 left-0 flex items-center justify-center flex-col`}>{View} <span className='text-white text-4xl -mt-[60px] font-bold'>Loading....</span></div>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.1 }}
      >
      <div className='w-full h-full lg:w-[600px] lg:h-[550px] bg-[white] rounded-sm shadow-md px-3 py-3 lg:py-4 lg:px-6 flex flex-col items-center justify-start'>
        <h1 className='font-bold text-xl w-full flex items-start p-2 mb-4'>Personal Details</h1>
        <div className="form w-[100%] min-h-[400px] flex flex-col">
          <div className='top w-full flex items-center justify-center'>
            <div className="left w-[50%] h-full flex flex-col lg:px-4 px-2">
              <label className='block mt-2 text-sm font-semibold' htmlFor="Address">Address</label>
              <input onChange={(e) => setInput({...input, Address: e.target.value})} value={input.Address} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='Address' placeholder='eg: No.990, Workshop Sreet' />
              <label className='block mt-5 text-sm font-semibold' htmlFor="City">City</label>
              <input onChange={(e) => setInput({...input, City: e.target.value})} value={input.City} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='City' placeholder='City' />
            </div>
            <div className="right w-[50%] h-full flex flex-col justify-center p-4 ">
              <div onClick={handleClick} className='mt-2 flex flex-col items-center justify-center'>
                {input.AvatarPath ? <img src={input.AvatarPath} className='w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-md object-cover border-[2px] border-[#f0f0f0]' alt="" /> : <img src={defaultImage} className='w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-md object-center bg-[#c0c0c0] border-dashed p-2 border-[2px] border-[#414141]' alt="" />}
                <input type="file" ref={inputRef} onChange={(event) => handleChange(event)} style={{display: "none"}}/>
                {/* <p className='text-center text-[16px] font-bold mt-2'>Upload</p> */}
              </div>
            </div>
          </div>
          <div className='bottom w-full flex'>
            <div className="left w-[50%] h-full flex flex-col px-2 lg:px-4">
              <label className='block mt-5 text-sm font-semibold' htmlFor="Country">Country</label>
              <select value={input.SelectedCountry} onChange={(e) => setInput({...input, SelectedCountry: e.target.value})} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none px-1 py-2 mt-2' type="text" id='Country' placeholder='Country'>
                <option>Select Country</option>
                {
                  country.map((item,index) => {
                    return(
                      <option key={index} value={item.name}>{item.name}</option>
                    )
                  })
                }
              </select>
              {/* <input className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='Country' placeholder='Country' /> */}
              <label className='block mt-5 text-sm font-semibold' htmlFor="Occupation">Occupation</label>
                <select onChange={(e) => setInput({...input, Occupation: e.target.value})} value={input.Occupation} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none px-1 py-2 mt-2' type="text" id='Occupation' placeholder='Occupation'>
                  <option>Select Occupation</option>
                  <option>Student</option>
                  <option>Chiropractor</option>
                  <option>Dentist</option>
                  <option>Dietitian or Nutritionist</option>
                  <option>Optometrist</option>
                  <option>Pharmacist</option>
                  <option>Physician</option>
                  <option>Physician Assistant</option>
                  <option>Podiatrist</option>
                  <option>Registered Nurse</option>
                  <option>Therapist</option>
                  <option>Veterinarian</option>
                  <option>Health Technologist or Technician</option>
                  <option>Chief Executive</option>
                  <option>General and Operations Manager</option>
                  <option>Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
                  <option>Operations Specialties Manager (e.g., IT or HR Manager)</option>
                  <option>Construction Manager</option>
                  <option>Engineering Manager</option>
                  <option>Accountant, Auditor</option>
                  <option>Military</option>
                  <option>Homemaker</option>
                  <option>Other Occupation</option>
                  <option>Don't Know</option>
                  <option>Not Applicable</option>
              </select>
              {/* <input className='w-full h-9 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='username' placeholder='Username' /> */}
            </div>
            <div className="right w-[50%] h-full flex flex-col px-4">
              <label className='block mt-5 text-sm font-semibold' htmlFor="Date of Birth">Date of Birth</label>
              <input onChange={(e) => setInput({...input, DateOfBirth: e.target.value})} value={input.DateOfBirth} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="date" id='Date of Birth' placeholder='Date of Birth' />
              <label className='block mt-5 text-sm font-semibold' htmlFor="Gender">Gender</label>
              <select onChange={(e) => setInput({...input, Gender: e.target.value})} value={input.Gender} className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none px-1 py-2 mt-2' type="text" id='Gender' placeholder='Gender'>
              <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>-  Others</option>
              </select>
              {/* <input className='w-full h-9 text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='username' placeholder='Username' /> */}
            </div>
          </div>
          {/* <div className='flex gap-4 p-4'>
          <button onClick={() => GoBack()} className='my-4 mt-8 px-2 py-2 font-semibold text-sm text-white bg-[#212d5f] hover:bg-[#354075] w-20 duration-300'>Go Back</button>
          <button onClick={() => handleSubmit()} className='my-4 mt-8 px-2 py-2 font-semibold text-sm text-white bg-[#212d5f] hover:bg-[#354075] w-20 duration-300'>Done</button>
          </div> */}

<button onClick={() => handleSubmit()} className='ml-4 my-4 mt-8 px-2 py-2 font-semibold text-sm text-white bg-[#212d5f] hover:bg-[#354075] w-20 duration-300'>Done</button>

        </div>
      </div>
      </motion.nav>
      <ToastContainer />
    </>
  )
}

export default SetAvatar