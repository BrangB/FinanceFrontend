import React, {useState, useEffect} from 'react'
import welcome from '../img/drinkman.svg'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLottie } from "lottie-react";
import CatLoading from "../img/lottieAnimation/animation_lln7ms9w.json"
import { useNavigate } from 'react-router-dom'
import { signup } from '../Api/Api'

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
}

const Signup = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({});
    const [input, setInput] = useState(
        {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    );
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("UserData")){
            navigate("/mainpage")
        }
    })

    const options = {
        animationData: CatLoading,
        loop: true
      };
    
      const { View } = useLottie(options);

    useEffect(() => {
        const startAnimate = () => {
            setTimeout(() => {
                setIsOpen(true)
            }, 500);
        }
        startAnimate()
    }, [])

    const handleValidation = () => {
        const { name, email, password, confirmPassword} = input;
        if(password !== confirmPassword){
            toast.error("Password and Confrim password should be same.", toastOptions);
            return false
        }else if(name === "" || email === ""){
            toast.error('Please fill all the fields', toastOptions);
            return false
        }else if(name.length < 3){
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false
        }else if(password.length < 8){
            toast.error("Password should have at least 8 characters", toastOptions);
            return false
        }
        return true
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(handleValidation()){
            setIsLoading(true)
            axios.post(signup, {
                name: input.name,
                email: input.email,
                password: input.password
            })
            .then(res => {
                setIsLoading(false)
                setData(res.data)
                if(res.data.status === false){
                    toast.error(res.data.msg, toastOptions)
                }else if(res.data.status === true){
                    toast.success(res.data.msg, toastOptions)
                    localStorage.clear();
                    localStorage.setItem("TempData", JSON.stringify(input))
                    setInput({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })
                    setTimeout(() => {
                        navigate("/setAvatar")
                    }, 2000);  
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }

    return (
        <>
        <div className={`${isLoading ? 'flex' : 'hidden'} overlay w-screen h-screen bg-[#000000bb] z-10 absolute top-0 left-0 flex items-center justify-center flex-col`}>{View} <span className='text-white text-4xl -mt-[60px] font-bold'>Loading....</span></div>
        <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        >
        <div className='md:w-[500px] md:400px lg:w-[700px] lg:h-[500px] bg-[white] flex flex-row shadow-lg'>
            <div className="left w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-6 lg:p-8">
                <h2 className=' w-full text-xl font-bold'>Register</h2>
                <div className='w-full h-full py-5 px-3 lg:py-5 lg:px-4'>
                    <label className='block mt-4 lg:mt-3 text-sm font-semibold' htmlFor="username">Username</label>
                    <input onChange={(e) => setInput({...input, name: e.target.value})} value={input.name} className='w-full min-w-[230px] h-9 lg:h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='username' placeholder='Username' autoComplete="off"/>
                    <label className='block mt-4 lg:mt-3 text-sm font-semibold' htmlFor="Email">Email</label>
                    <input onChange={(e) => setInput({...input, email: e.target.value})} value={input.email} className='w-full min-w-[230px] h-9 lg:h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="email" id='Email' placeholder='Email' />
                    <label className='block mt-4 lg:mt-3 text-sm font-semibold' htmlFor="Password">Password</label>
                    <input onChange={(e) => setInput({...input, password: e.target.value})} value={input.password} className='w-full min-w-[230px] h-9 lg:h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="password" id='Password' placeholder='Password' />
                    <label className='block mt-4 lg:mt-3 text-sm font-semibold' htmlFor="Confrim Password">Confrim Password</label>
                    <input onChange={(e) => setInput({...input, confirmPassword: e.target.value})} value={input.confirmPassword} className='w-full min-w-[230px] h-9 lg:h-8 text-sm placeholder:text-[#7e7e7e] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="password" id='Confrim Password' placeholder='Confrim Password' />
                    <button onClick={(e) => handleSubmit(e)} className='w-full bg-[#5473da] text-sm font-semibold uppercase text-white h-9 mt-8 lg:mt-5 hover:bg-[#5d7de6] transition-all duration-300'>Sign Up</button>
                    <p className='text-[13px] text-[#5c5c5c] mt-4 lg:mt-2 w-full text-center '>Already have an account? <Link to={'/login'}><span className='text-[#546edd] font-bold'>LOGIN</span></Link></p>
                </div>
            </div>
            <div className="right hidden w-[50%] h-full bg-[#5473da] lg:flex flex-col items-center justify-center">
                <div className='w-[130px] h-[130px] bg-white rounded-full border-white border-[1px] mt-10'><img src={welcome} className='w-full h-full' alt="" /></div>
                <h3 className='mt-2 text-white font-bold text-2xl'>Welcome to</h3>
                <h4 className='-mt-2 text-white font-bold text-2xl'>our community</h4>
                <p className='text-[12px] p-5 text-center text-[#d4d4d4] leading-[15px]'>Personalized, user friendly and beautiful presented
                    Create an account to track your new daily expenses and 
                    enjoy our system.
                </p>
            </div>
        </div>
        </motion.nav>
        <ToastContainer />
        </>
      )
}

export default Signup