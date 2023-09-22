import React, {useState} from 'react'
import { AiOutlineCoffee, AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { motion, useTime } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import defualtImage from '../img/Avatar/defaultAvatar2.jpg'
import { useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLottie } from "lottie-react";
import loadingAnimation from '../img/lottieAnimation/loading.json'
import warning from '../img/lottieAnimation/warn.json'
import { MessageInsert, banAccounts } from '../Api/Api';




const variants = {
  open: { opacity: 1, scale: 1 } ,
  closed: { opacity: 0, scale: 0.5 },
}

const AdminDashboard = () => {

  const [miniProfile, setMiniProfile] = useState(false)
  const [confirmProfile, setConfirmProfile] = useState(false)
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [messageBox, setMessageBox] = useState(false)
  const [messageIDAndName, setMessageIDAndName] = useState({
    ReceiverID: null,
    ReceiverName: "",
    Message: "",
    Date: "",
    Month: "",
    Day: "",
    Year: "",
    AdminID: null,
  })
  const [personalData, setPersonalData ] = useState([])
  const [banID, setBanID] = useState(null)
  const [adminData, setAdminData] = useState([
    {
      AdminName: "",
      AdminID: null
  }
  ])

  const navigate = useNavigate();

  const logoutFnc = () => {
    localStorage.clear();
    navigate("/login")
  }

  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const options = {
    animationData: loadingAnimation,
    loop: true
  };

  const option2 = {
    animationData: warning,
    loop: true
  };

  const loading = useLottie(options);
  const warningAni = useLottie(option2);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("Users")))
    setPersonalData(JSON.parse(localStorage.getItem("PersonalData")))
    setAdminData(JSON.parse(localStorage.getItem("AdminData")))
  }, [])



  const banAccount = () => {
    personalData.map(item => {
      if(item.UserId === banID){
        item.Active = !(item.Active)
      }
    })
    setIsLoading(true)
    axios.post(banAccounts, {
      userId : banID,
    })
    .then(res => {
      setIsLoading(false)
      setConfirmProfile(!confirmProfile)
      localStorage.setItem("PersonalData", JSON.stringify(personalData))
      setPersonalData(JSON.parse(localStorage.getItem("PersonalData")))
      if(res.data.status === true){
        toast.success(res.data.msg, toastOptions)
      }
    })

  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const confirmProfileFnc = (id) => {
    setConfirmProfile(!confirmProfile)
    setBanID(id)
  }

  const openMessageBox = (name, id) => {

    const currentDate = new Date(); // Create a new Date object with the current date and time
    const year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (e.g., 08)
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day (e.g., 15)
    const monthName = months[parseInt(month, 10) - 1];
    
    const formattedDate = `${year}-${month}-${day}`; // Create the formatted date string
    setMessageIDAndName({
      ...messageIDAndName,
      ReceiverID: id,
      ReceiverName: name,
      Date: formattedDate,
      Month: monthName,
      Day: day,
      Year: year,
      AdminID: adminData[0].AdminID,
    })
    setMessageBox(true)

  } 

  const closeMessageBox = () => {
    setMessageIDAndName({
      ReceiverID: null,
      ReceiverName: "",
      Message: "",
      Date: "",
      Month: "",
      Day: "",
      Year: "",
      AdminID: null,
    })
    setMessageBox(false)
  }

  useEffect(() => {
    console.log(adminData)
  }, [adminData])

  const handleSubmit = () => {
    const handleValidation = () => {
      if(messageIDAndName.Message === ""){
        toast.error("Please fill Message", toastOptions)
        return false
      }
      return true
    }
    if(handleValidation()){
      setIsLoading(true)
      axios.post(MessageInsert, {
        ...messageIDAndName
      })
      .then(res => {
        setIsLoading(false)
        toast.success(res.data.msg, toastOptions)
        closeMessageBox()
      })
      .catch(err => {
        toast.error("Server Error", toastOptions)
      }) 
    }
  }


 
  return (
    <>
      {/* absolute box/page */}
      <div className={`${isLoading ? 'flex' : 'hidden'} overlay w-screen h-screen bg-[#000000d3] z-50 absolute top-0 left-0 flex items-center justify-center flex-col`}>{loading.View}</div>

      {/* Confirm Page */}
      <div className={`${confirmProfile ? "scale-100" : "scale-0"}  duration-300 confirm w-[300px] h-[400px] bg-[#f2faf1] shadow-lg absolute top-auto left-auto right-auto bottom-auto flex flex-col items-center justify-center gap-10`}>
        <div className='w-[100px]'>{warningAni.View}</div>
        <button className='bg-[#fffd9fb7] hover:bg-[#faf88cb7] duration-200 px-3 py-2 border-[#faf768b7] border-[1px] text-md uppercase rounded-sm text-center cursor-pointer' onClick={() => banAccount()}>Sure ?</button>
      </div>


      {/* Message */}
      <div className={`${messageBox ? " scale-100 opacity-100" : "scale-0 opacity-0"} duration-150 messagePage w-full h-full bg-[#0000005b] absolute top-0 left-0 z-40 flex items-center justify-center backdrop-blur-sm`}>
        <div className="inputForm w-[600px] relative h-auto min-h-[200px] md:h-[400px] bg-[white] flex flex-col items-center justify-start px-3 py-12 md:p-6 gap-6">
          <div className='flex items-center justify-between w-[95%] md:w-[80%]'>
            <h1 className='uppercase text-lg flex items-center justify-center gap-4'>announcement <span><GrAnnounce /></span></h1>
            <p className='flex items-center justify-center'>to: <span className='ml-2 underline'>{messageIDAndName.ReceiverName}</span></p>
          </div>
          <textarea className='w-[95%] md:w-[80%] h-[60%] bg-[#ffffff21] p-4 border-[2px] focus:border-[#61b855] border-[#bebebe] outline-none duration-200' placeholder='Message' value={messageIDAndName.Message} onChange={(e) => setMessageIDAndName({...messageIDAndName, Message: e.target.value})}></textarea>
          <button className='uppercase px-3 py-1 bg-[#b5fda7] hover:bg-[#96f384] border-[1px] border-[#9df08c] duration-300' onClick={() => handleSubmit()}>Send</button>
          <p className='absolute top-5 right-5 text-lg' onClick={() => closeMessageBox()}> <AiOutlineClose  /></p>
        </div>
      </div>

      {/* Main Content */}
      <div className='fixed bg-[white] h-[80px] w-screen md:w-full top-0 left-0 shadow-md flex items-center justify-between px-6 md:px-10 z-20'>
        <div className="logoAndName flex gap-1 items-center justify-center">
          <p className='hidden md:block mr-4 p-2 bg-[#e0e5ff] rounded-md hover:scale-105 shadow-sm duration-300'><AiOutlineCoffee className='text-lg text-[#4070d8] font-bold'/></p>
          <span className='text-md font-bold'>Finance Tracking System</span>
        </div>
        <div className="profile flex gap-4 items-center justify-center">
              <img src={defualtImage} className='hidden md:block w-[35px] h-[35px] md:w-[45px] md:h-[45px] object-cover rounded-full' alt="" />
              <div className="nameAndProfile relative">
                <p className='text-[12px] py-1 ml-9 md:ml-0 px-2 bg-[#e0e5ff] hover:bg-[#d7dcf3] duration-300 rounded-lg cursor-pointer' onClick={() => setMiniProfile(!miniProfile)}>Profile</p>
                <motion.div
                animate={miniProfile ? "open" : "closed"}
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: "400%" },
                }}
                transition={{ duration: 0.3 }}>
                  <div className='absolute w-[200px] h-auto lg:w-[300px] lg:h-[300px] top-10 right-0 z-[99] rounded-lg bg-[#ffffff] shadow-lg flex flex-col items-center justify-start p-6'>
                    <img src={defualtImage} className='w-[60px] h-[60px] md:w-[80px] md:h-[80px] border-[2px] border-[#659bff] p-[1px]  object-cover rounded-full' alt="" />
                    <p className='font-bold text-md md:text-xl mt-3'>{adminData[0].AdminName}</p>
                    <p className='px-2  border-[1px] bg-[#e0e5ff] rounded-lg text-[#353535] text-sm mt-6'>More</p>
                    <p className='px-2  border-[1px] bg-[#e0e5ff] rounded-lg text-[#353535] text-sm mt-4 lg:mt-6 cursor-pointer' onClick={() => logoutFnc()}>Log out</p>
                  </div>
                </motion.div>
              </div>
        </div>
      </div>
      <div className='w-full h-full flex items-center justify-center mt-0 md:mt-24'>
        <div className="userData w-full h-auto max-h-[500px] md:w-[800px] md:h-[500px] bg-[white] flex flex-col py-5 p-1  md:p-4 overflow-y-scroll">
          <table className='w-full border-none '>
            <thead>
              <tr className='column border-none p-2'>
                <th className='text-left text-sm md:text-md p-1 md:p-3'>No</th>
                <th className='text-left text-sm md:text-md p-1 md:p-3'>User</th>
                <th className='text-left text-sm md:text-md p-1 md:p-3'>Email</th>
                <th className='text-left text-sm md:text-md p-1 md:p-3'>Occupation</th>
              </tr>            
            </thead>
            <tbody>
                {
                  userData && userData.map((item, index) => {
                    const data = personalData.find(personal => personal.UserId === item.Id);
                    return(
                      <tr className='column border-none' key={index}>
                        <td className='text-left text-sm px-2 py-3 md:p-3'>{index + 1}</td>
                        <td className='text-left text-sm px-1 py-3 md:p-3 md:flex md:items-center md:justify-start'>
                        <img src={defualtImage} className='w-[40px] h-[40px] mr-4 hidden md:inline border-[2px] border-[#659bff] p-[1px]  object-cover rounded-full' alt="" />
                          {item.Name}
                          <p className={`${data && data.Active ? "bg-[#a0ffb8b7] hover:bg-[#a0ffb8e1] border-[#5eff87b7]" : "bg-[#ff9f9fb7] hover:bg-[#fd9999e7] border-[#ff8282]"} w-[60px] mt-1 duration-200 md:hidden  border-[1px] text-[13px] md:text-sm rounded-sm text-center cursor-pointer`} onClick={() => confirmProfileFnc(data.UserId)}>{data && data.Active ? "Active" : "Ban"}</p>
                          </td>
                        <td className='text-left max-w-[100px] md:max-w-[200px] overflow-hidden text-[14px] md:text-sm px-2 py-3 md:p-3'>{item.Email}</td>
                        <td className='text-left max-w-[90px] md:max-w-[200px] overflow-hidden text-[14px] md:text-sm px-2 py-3 md:p-3'>
                          {data ? data.Occupation : 'N/A'}
                        </td>
                        <td className='text-left text-sm px-1 py-2 md:py-4 md:px-3 hidden md:flex'><p className={`${data && data.Active ? "bg-[#a0ffb8b7] hover:bg-[#a0ffb8e1] border-[#5eff87b7]" : "bg-[#ff9f9fb7] hover:bg-[#fd9999e7] border-[#ff8282]"} w-[70px]  duration-200 px-1 py-1  border-[1px] text-sm rounded-sm text-center cursor-pointer`} onClick={() => confirmProfileFnc(data.UserId)}>{data && data.Active ? "Active" : "Ban"}</p></td>
                        <td className='text-left text-sm px-1 py-3 md:p-4 '><p className='bg-[#f7f7f7ec] p-1 flex items-center justify-center rounded-full shadow-lg cursor-pointer' onClick={() => openMessageBox(item.Name, data.UserId)} ><AiOutlineMessage className="text-[#40c953] hover:text-[#61e272] duration-200  text-xl" /></p></td>
                      </tr>
                    )
                  })
                }

              </tbody>  
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminDashboard