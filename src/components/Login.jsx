import React, {useContext, useEffect, useState} from 'react'
import welcome from '../img/drinkwoman.svg'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLottie } from "lottie-react";
import CatLoading from "../img/lottieAnimation/animation_lln7ms9w.json"
import userAdmin from "../img/lottieAnimation/userAndAdmin.json"
import { Adminlogin, login } from '../Api/Api'

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

const Login = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({});
    const [role, setRole] = useState(false)
    const [input, setInput] = useState(
      {
        name: '',
        password: '',
      }
    );
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const toastOptions = {
      position: "top-center",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    }

    const options = {
      animationData: CatLoading,
      loop: true
    };

    const options2 = {
      animationData: userAdmin,
      loop: true
    };

    const cat = useLottie(options);
    const user = useLottie(options2)

    // useEffect(() => {
    //   if(localStorage.getItem("UserData")){
    //     navigate("/mainpage")
    //   }
    // })

    useEffect(() => {
        const startAnimate = () => {
            setTimeout(() => {
              setIsOpen(true)
            }, 500);
        }
        startAnimate()
    }, [])

    const handleValidation = () => {
      const { name, password} = input;
      if(name === "" || password === ""){
        toast.error('Please fill all the fields', toastOptions);
        return false
      }
      return true
  }

    const handleSubmit = (event) => {
      event.preventDefault();
      if(handleValidation()){
        setIsLoading(true)
        if(role){
          // axios.post('http://localhost:8000/api/getData', input)
          axios.post(login, input)
          .then(res => {
            console.log(res.data.expenses)
            setIsLoading(false)
            if(res.data.status === false){
              toast.error(res.data.msg, toastOptions)
            }
            if(res.data.status === true){
              toast.success(res.data.msg, toastOptions)
              localStorage.setItem("UserData", JSON.stringify({...res.data.userData,
                Address: res.data.personalData[0].Address,
                AvatarPath: res.data.personalData[0].Avatar,
                City: res.data.personalData[0].City,
                SelectedCountry: res.data.personalData[0].Country,
                Occupation: res.data.personalData[0].Occupation,
                DateOfBirth: res.data.personalData[0].DateOfBirth,
                Gender: res.data.personalData[0].Gender,
                Active: res.data.personalData[0].Active
              }))
              localStorage.setItem("ExpenseData", JSON.stringify(res.data.expenses))
              localStorage.setItem("IncomeData", JSON.stringify(res.data.incomeData))
              navigate("/mainpage")
            }
  
          })
          .catch(err => {
            console.log("Error : ", err)
          })
        }
        if(!role){
          axios.post(Adminlogin, input)
          .then(res => {
            setIsLoading(false)
            if(res.data.status === false){
              toast.error(res.data.msg, toastOptions)
            }
            if(res.data.status === true){
              localStorage.setItem("AdminData", JSON.stringify(res.data.AdminData))
              localStorage.setItem("Users", JSON.stringify(res.data.UserData))
              localStorage.setItem("PersonalData", JSON.stringify(res.data.PersonalData))
              toast.success(res.data.msg, toastOptions)
              navigate("/adminDashboard")
            }
  
          })
          .catch(err => {
            console.log("Error : ", err)
          })
        }

      }

    }

    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem("UserData"))
      if(userdata){
        navigate("/mainpage")
      }
    }, [])

  return (
    <>
    <div className={`${isLoading ? 'flex' : 'hidden'} overlay w-screen h-screen bg-[#000000bb] z-10 absolute top-0 left-0 flex items-center justify-center flex-col`}>{cat.View} <span className='text-white sm:text-xl lg:text-4xl -mt-[60px] font-bold'>Loading....</span></div>
      <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants} className='absolute top-5 right-10  md:top-10 md:right-16'
      >
      <div className='flex flex-col items-center justify-center ' onClick={() => setRole(!role)}>
        <div className='w-[40px] md:w-[50px] bg-[#9e9e9e] rounded-full border-[#39387c] hover:scale-110 duration-200'>{user.View}</div>
        <span className='uppercase text-sm mt-2 font-bold text-[#2d365f]'>{role? "User" : "Admin"}</span>
      </div>
      </motion.nav>
    <motion.nav
    animate={isOpen ? "open" : "closed"}
    variants={variants}
  >
    <div className='lg:w-[700px] lg:h-[500px] bg-[white] flex flex-row shadow-lg'>
        <div className="right hidden lg:flex lg:w-[50%] h-full bg-[#5473da] flex-col items-center justify-center">
            <div className='w-[130px] h-[130px] bg-white rounded-full border-white border-[1px] mt-10'><img src={welcome} className='w-full h-full' alt="" /></div>
            <h3 className='mt-2 text-white font-bold text-2xl'>Welcome back</h3>
            <h4 className='-mt-2 text-white font-bold text-2xl'>Good to see you!!!</h4>
            <p className='text-[12px] p-5 text-center text-[#d4d4d4] leading-[15px]'>
              Personalized, user friendly and beautiful presented
              Create an account to track your new expenses and 
              enjoy our system.
            </p>
        </div>
        <div className="left sm:w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-8">
            <div className='flex lg:hidden w-[110px] h-[110px] bg-[#5473da] rounded-full border-white border-[1px] mb-8'><img src={welcome} className='w-full h-full' alt="" /></div>
            <div className='w-full h-full py-3 px-1 lg:py-5 lg:px-4 flex flex-col items-start justify-center'>
                <h2 className=' w-full text-2xl font-bold text-center mb-3 lg:mb-5'>LOGIN</h2>
                <label className='block mt-4 text-sm font-semibold' htmlFor="username">Username</label>
                <input onChange={(e) => setInput({...input, name: e.target.value})} value={input.name} className='w-full min-w-[250px] h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='username' placeholder='Username' autoComplete="off"/>
                <label className='block mt-4 text-sm font-semibold' htmlFor="Password">Password</label>
                <input onChange={(e) => setInput({...input, password: e.target.value})} value={input.password} className='w-full min-w-[250px] h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="password" id='Password' placeholder='Password' autoComplete="off"/>
                <button onClick={(e) => handleSubmit(e)} className='w-full bg-[#5473da] text-sm font-semibold uppercase text-white h-9 mt-5 hover:bg-[#597bec] transition-all duration-300'>LOG IN</button>
                <p className='text-[13px] text-[#5c5c5c] mt-6 w-full text-center '>Already haven't an account? <Link to={'/signup'}><span className='text-[#3d58cf] font-bold'>SIGN UP</span></Link></p>
            </div>
        </div>
    </div>
    </motion.nav>
    <ToastContainer />
    </>
  )
}

export default Login