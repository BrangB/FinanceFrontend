import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import Chart from "react-apexcharts";
import ExpenseHistory from './ExpenseHistory';
import { AiOutlineClose, AiOutlineCoffee, AiOutlineExpand, AiOutlineMessage, AiOutlineMenu } from "react-icons/ai";
import { useLottie } from "lottie-react";
import saveMoney from '../img/lottieAnimation/saveMoney.json'
import loadingAnimation from '../img/lottieAnimation/loading.json'
import messageLoading from '../img/lottieAnimation/messageLoading.json'
import AddExpense from '../img/addExpense.png'
import Report from '../img/receipt.png'
import AreaChart from '../img/AreaChart.png'
import PieChart from '../img/PieChart.png';
import Income from '../img/income.png'
import defaultAvatar from '../img/Avatar/defaultAvatar2.jpg'
import axios from 'axios'
import { GetMessage } from '../Api/Api';


const variants = {
  open: { opacity: 1, scale: 1 } ,
  closed: { opacity: 0, scale: 0.5 },
}

const MainPage = () => {

  const [expenseData, setExpenseData] = useState([])
  const [expandMenu, setExpandMenu] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [userData, setUserData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [miniProfile, setMiniProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [messageBox, setMessageBox] = useState(false)
  const [message, setMessage] = useState([])
  const [adminData, setAdminData] = useState([])
  const [messageAni, setMessageAni] = useState(false)
//   const [data, setData] = useState([
//     {
//         "id": 1,
//         "productName": "cola",
//         "description": "this is very good",
//         "date": "2023-08-15",
//         "amount": 6,
//         "category": "Transportation",
//         "price": 1.5,
//         "day": 15,
//         "month": "August",
//         "year": "2023"
//     },
//     {
//         "id": 2,
//         "productName": "tissue",
//         "description": "delicious and aromatic",
//         "date": "2023-09-03",
//         "amount": 15,
//         "category": "Food",
//         "price": 0.75,
//         "day": 3,
//         "month": "September",
//         "year": "2023"
//     },
//     {
//         "id": 3,
//         "productName": "carrot",
//         "description": "soft and comfortable",
//         "date": "2023-07-21",
//         "amount": 30,
//         "category": "Clothing",
//         "price": 0.5,
//         "day": 21,
//         "month": "July",
//         "year": "2023"
//     },
//     {
//         "id": 4,
//         "productName": "shirt",
//         "description": "exciting and adventurous",
//         "date": "2023-10-10",
//         "amount": 50,
//         "category": "HealthCare",
//         "price": 12.99,
//         "day": 10,
//         "month": "October",
//         "year": "2023"
//     },
//     {
//         "id": 5,
//         "productName": "apple",
//         "description": "refreshing and revitalizing",
//         "date": "2023-11-27",
//         "amount": 3,
//         "category": "Housing",
//         "price": 0.4,
//         "day": 27,
//         "month": "November",
//         "year": "2023"
//     },
//     {
//         "id": 6,
//         "productName": "book",
//         "description": "insightful and educational",
//         "date": "2023-06-18",
//         "amount": 25,
//         "category": "Education",
//         "price": 20.99,
//         "day": 18,
//         "month": "June",
//         "year": "2023"
//     },
//     {
//         "id": 7,
//         "productName": "painting",
//         "description": "vibrant and colorful",
//         "date": "2023-12-05",
//         "amount": 10,
//         "category": "Housing",
//         "price": 150,
//         "day": 5,
//         "month": "December",
//         "year": "2023"
//     },
//     {
//         "id": 8,
//         "productName": "bike",
//         "description": "fast and efficient",
//         "date": "2023-09-22",
//         "amount": 40,
//         "category": "Transportation",
//         "price": 250,
//         "day": 22,
//         "month": "September",
//         "year": "2023"
//     },
//     {
//         "id": 9,
//         "productName": "pillow",
//         "description": "soothing and relaxing",
//         "date": "2023-08-08",
//         "amount": 20,
//         "category": "Housing",
//         "price": 15.5,
//         "day": 8,
//         "month": "August",
//         "year": "2023"
//     },
//     {
//         "id": 10,
//         "productName": "table",
//         "description": "adaptable and versatile",
//         "date": "2023-10-01",
//         "amount": 8,
//         "category": "Housing",
//         "price": 120,
//         "day": 1,
//         "month": "October",
//         "year": "2023"
//     },
//     {
//         "id": 11,
//         "productName": "lamp",
//         "description": "cozy and inviting",
//         "date": "2023-09-10",
//         "amount": 70,
//         "category": "Housing",
//         "price": 40.75,
//         "day": 10,
//         "month": "September",
//         "year": "2023"
//     },
//     {
//         "id": 12,
//         "productName": "car",
//         "description": "smooth and reliable",
//         "date": "2023-08-28",
//         "amount": 25,
//         "category": "Transportation",
//         "price": 20000,
//         "day": 28,
//         "month": "August",
//         "year": "2023"
//     },
//     {
//         "id": 13,
//         "productName": "chocolate",
//         "description": "savory and satisfying",
//         "date": "2023-09-18",
//         "amount": 12,
//         "category": "Food",
//         "price": 2.99,
//         "day": 18,
//         "month": "September",
//         "year": "2023"
//     },
//     {
//         "id": 14,
//         "productName": "bandage",
//         "description": "healing and supportive",
//         "date": "2023-11-03",
//         "amount": 100,
//         "category": "HealthCare",
//         "price": 5.25,
//         "day": 3,
//         "month": "November",
//         "year": "2023"
//     },
//     {
//         "id": 15,
//         "productName": "jeans",
//         "description": "stylish and versatile",
//         "date": "2023-10-25",
//         "amount": 50,
//         "category": "Clothing",
//         "price": 45.99,
//         "day": 25,
//         "month": "October",
//         "year": "2023"
//     },
//     {
//         "id": 16,
//         "productName": "candle",
//         "description": "calming and tranquil",
//         "date": "2023-07-15",
//         "amount": 40,
//         "category": "Housing",
//         "price": 3.5,
//         "day": 15,
//         "month": "July",
//         "year": "2023"
//     },
//     {
//         "id": 17,
//         "productName": "bus",
//         "description": "efficient and eco-friendly",
//         "date": "2023-12-12",
//         "amount": 35,
//         "category": "Transportation",
//         "price": 1.25,
//         "day": 12,
//         "month": "December",
//         "year": "2023"
//     },
//     {
//         "id": 18,
//         "productName": "pizza",
//         "description": "delightful and flavorful",
//         "date": "2023-08-02",
//         "amount": 18,
//         "category": "Food",
//         "price": 10.99,
//         "day": 2,
//         "month": "August",
//         "year": "2023"
//     },
//     {
//         "id": 19,
//         "productName": "ointment",
//         "description": "restorative and comforting",
//         "date": "2023-11-10",
//         "amount": 75,
//         "category": "HealthCare",
//         "price": 8.5,
//         "day": 10,
//         "month": "November",
//         "year": "2023"
//     },
//     {
//         "id": 20,
//         "productName": "hat",
//         "description": "elegant and sophisticated",
//         "date": "2023-07-30",
//         "amount": 60,
//         "category": "Clothing",
//         "price": 20.75,
//         "day": 30,
//         "month": "July",
//         "year": "2023"
//     }
// ]);

  const [categoryCounts, setCategoryCounts] = useState({
    Clothing: 0,
    Food: 0,
    HealthCare: 0,
    Housing: 0,
    Transportation: 0,
    Education: 0
  })

  const [priceWithMonth, setPriceWithMonth] = useState({
    January : 0, 
    February :0,
    March :0,
    April :0,
    May :0,
    June :0,
    July :0,
    August :0,
    September :0,
    October :0,
    November :0,
    December: 0
  })

  const [priceWithMonthIncome, setPriceWithMonthIncome] = useState({
    January : 0, 
    February :0,
    March :0,
    April :0,
    May :0,
    June :0,
    July :0,
    August :0,
    September :0,
    October :0,
    November :0,
    December: 0
  })
  
  useEffect(() => {

    if(expenseData){
      const countCategories = async() => {
        const newCategoryCounts = {...categoryCounts}
        expenseData.forEach(item => {
          const category = item.category.split(" ").join("");
          newCategoryCounts[category]++
        });
        setCategoryCounts(newCategoryCounts)
      }

      const getTotalPrice = () => {
        setPriceWithMonth({
          January : 0, 
          February :0,
          March :0,
          April :0,
          May :0,
          June :0,
          July :0,
          August :0,
          September :0,
          October :0,
          November :0,
          December: 0
        })
        const newPrice = {...priceWithMonth}
        expenseData.forEach(item => {
          const month = item.month;
          newPrice[month] += item.price
        })
        setPriceWithMonth(newPrice)
      }

      getTotalPrice()
      countCategories()
    }

  }, [expenseData])

  useEffect(() => {
    setExpenseData(JSON.parse(localStorage.getItem("ExpenseData")))
  }, [])

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      title: {
        text: "Area Chart",
        style: {
          fontSize: 20
        }
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September"]
        // "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      },
      yaxis: {
        // You can customize the y-axis values here
        min: 50000,       // Set the minimum value
        max: 500000,     // Set the maximum value
        tickAmount: 6, // Set the number of ticks (approximate)
        labels: {
          formatter: function (value) {
            // You can format the y-axis labels here (e.g., adding currency symbols or units)
            return value.toFixed(0); // Example: format to two decimal places
          },
        },
      },
      colors: ['#6147E5', '#639cd9', '#50B7F5']
    },
    series: [
      {
        name: "Income",
        data: [300000, 250000, 450000, 290000, 400000, 320000, 170000, 191900, 200000]
      },
      {
        name: "Outcome",
        data: [priceWithMonth.January, priceWithMonth.February, priceWithMonth.March, priceWithMonth.April, priceWithMonth.May, priceWithMonth.June, priceWithMonth.July, priceWithMonth.August, priceWithMonth.September]
        // data: [200000, 420000, 40000, 200000, 300000, 320000, 170000, 191900, 200000]
      }
    ],
    fill: {
      type: 'gradient',
      pattern: {
        style: 'verticalLines',
        width: 2,
        height: 2,
        strokeWidth: 2
      }
    }
  })

    const [pie, setPie] = useState({
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold"
        }
      },
      plotOptions: {
        pie: {
          customScale: 1,
        }
      },
      // series: [44, 55, 13, 43, 22, 33],
      series: [categoryCounts.Housing, categoryCounts.Transportation, categoryCounts.Food, categoryCounts.HealthCare, categoryCounts.Education, categoryCounts.Clothing],
      chart: {
      width: 400,
      type: 'pie',
    },
    labels: ['Housing', 'Transportation', 'Food', 'HealthCare', 'Education', "Clothing"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    })

    useEffect(() => {
      setPie(prevPie => ({
        ...prevPie,
        series: [
          categoryCounts.Housing,
          categoryCounts.Transportation,
          categoryCounts.Food,
          categoryCounts.HealthCare,
          categoryCounts.Education,
          categoryCounts.Clothing,
        ],
      }));
    }, [categoryCounts]);

    useEffect(() => {
      setState(prevState => ({
        ...prevState,
        series: [
          {
            name: "Income",
            data: [
              priceWithMonthIncome.January,
              priceWithMonthIncome.February,
              priceWithMonthIncome.March,
              priceWithMonthIncome.April,
              priceWithMonthIncome.May,
              priceWithMonthIncome.June,
              priceWithMonthIncome.July,
              priceWithMonthIncome.August,
              priceWithMonthIncome.September
            ]
          },
          {
            name: "Outcome",
            data: [
              priceWithMonth.January,
              priceWithMonth.February,
              priceWithMonth.March,
              priceWithMonth.April,
              priceWithMonth.May,
              priceWithMonth.June,
              priceWithMonth.July,
              priceWithMonth.August,
              priceWithMonth.September
            ]
          }
        ]
      }));
    }, [priceWithMonth, priceWithMonthIncome]);

    useEffect(() => {
      setIncomeData(JSON.parse(localStorage.getItem("IncomeData")))
    }, [])

    useEffect(() => {
      if(incomeData){
        const getTotalPrice = () => {
          setPriceWithMonthIncome({
            January : 0, 
            February :0,
            March :0,
            April :0,
            May :0,
            June :0,
            July :0,
            August :0,
            September :0,
            October :0,
            November :0,
            December: 0
          })
          const newPrice = {...priceWithMonthIncome}
          incomeData.forEach(item => {
            const month = item.Month;
            newPrice[month] += item.IncomeAmount
          })
          setPriceWithMonthIncome(newPrice)
        }
  
        getTotalPrice()
      }
    }, [incomeData])



  let navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
    navigate("/login")
  }
  const options = {
    animationData: saveMoney,
    loop: true
  };
  const options2 = {
    animationData: loadingAnimation,
    loop: true
  };
  
  const options3 = {
    animationData: messageLoading,
    loop: true
  };

  const SaveM = useLottie(options);
  const Loading = useLottie(options2);
  const messageLoad = useLottie(options3)

  useEffect(() => {
    const startAnimate = () => {
        setTimeout(() => {
          setIsOpen(true)
        }, 500);
    }
    startAnimate()
}, [])

useEffect(() => {

}, [userData])

useEffect(() => {
    if(expenseData){
      setIsLoading(false)
    }
}, [expenseData])

  useEffect(() => {
    const getData = () => {
      setUserData(JSON.parse(localStorage.getItem("UserData")))
    }
    getData();
  }, [])

  const fetchMessage = () => {
    setMessageBox(true)
    setMessageAni(true)
    axios.post(GetMessage, userData)
    .then(res => {
      if(res.data.status === true){
        setMessage(res.data.message)
        setAdminData(res.data.Admin)
        setMessageAni(false)
      }
    })
  }

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("UserData"))
    if(!userdata){
      navigate("/login")
    }
  }, [])

  return (
    <>
      <div className={`${expandMenu ? ' scale-150' : "scale-0"} fixed -top-[800px] -right-[800px] rounded-full  bg-[#557af3] w-[1500px] h-[1500px] z-40 duration-300 overflow-hidden`}></div>
      <div className={`${expandMenu ? 'scale-100' : 'scale-0'} fixed top-0 right-0 bg-transparent w-full h-full z-50 duration-200 flex flex-col items-center justify-center`}>
        <p className='top-5 right-5 fixed rounded-full duration-200 bg-transparent p-3 hover:bg-[#9797978f]'><AiOutlineClose className='text-2xl text-white' onClick={() => setExpandMenu(false)}/></p>
        <ul className='gap-6 text-xl text-center md:hidden flex flex-col uppercase'>
              <li className='text-white hover:text-[#4067bd] duration-300 cursor-pointer' onClick={() => navigate("/expensePage")}>Expense</li>
              <li className='text-white hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/envelopePage")}>Envelope</li>
              <li className='text-white hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/incomePage")}>Income</li>
              <li className='text-white hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/reportPage")}>Report</li>
        </ul>
        <button className='bg-white text-black px-3 py-2 mt-8 rounded-sm uppercase' onClick={() => logoutFnc()}>Log Out</button>
      </div>
      <div className="message  bg-[#fcfcfce7] fixed right-0 top-28 z-30 flex items-center justify-center p-3 shadow-lg cursor-pointer" ><AiOutlineMessage className='text-xl text-[#2c4083]' onClick={() => fetchMessage()}/>
      </div>
      <div className={`${messageBox ? "scale-100 opacity-100 rounded-none" : 'scale-0 opacity-0 rounded-full'} duration-200 w-full h-screen fixed top-0 left-0 z-[999] bg-[#00000048] flex items-center justify-center backdrop-blur-sm`}>
        <p className='p-2 shadow-lg rounded-full bg-[#ffffffd2] absolute top-14 right-14 flex items-center justify-center' onClick={() => setMessageBox(false)}>
        <AiOutlineClose className=' text-lg text-[black]' />
        </p>
        <div className="messageBox bg-[#d4d4d4] shadow-lg w-[470px] h-[500px] relative ">
          <h1 className='uppercase sticky top-0 w-full h-[10%] bg-[#5947ff] text-center flex items-center justify-center  text-[white]'>announcement</h1>
          <div className="message bg-[#eeeeee] overflow-y-scroll  h-[90%] w-full p-4 flex flex-col items-start justify-start gap-6">
            <div className={`${messageAni ? "flex" : "hidden"} w-full h-full items-center justify-center`}>
              {messageLoad.View}
            </div>
            {
              message && message.length === 0 ? (
                <p className="text-sm w-full h-full text-center">No messages available</p>
              ) : (
                message.map(item => {
                  const admin = adminData.find(adminItem => adminItem.AdminID === item.AdminID);
                  return (
                    <div className={`${messageAni ? "hidden" : "block"}`} key={item.NotificationID}>
                      <p className='text-sm'>{admin.AdminName} (Admin)</p>
                      <p className='bg-white rounded-lg p-2 mt-1 text-sm'>{item.Message}</p>
                      <p className='text-[12px] text-[#444444] mt-1'>{item.Month} {item.Day}, {item.Year}</p>
                    </div>
                  );
                })
              )
            }


          </div>
        </div>
      </div>

      <div className={`${isLoading ? 'flex' : 'hidden'} overlay w-screen h-screen bg-[#000000bb] z-50 absolute top-0 left-0 flex items-center justify-center flex-col`}>{Loading.View}</div>
      <div className={`${isLoading || expandMenu ? "overflow-hidden w-screen h-screen" : "min-h-screen"} w-full min-h-screen bg-[#F1F2F7] flex flex-col items-center justify-start gap-6 p-6  relative pt-[100px]`}>
        <div className={`${isOpen ? "opacity-100 top-0" : "opacity-0 -top-10"} navbar w-screen duration-300 h-16 bg-[white] shadow-md fixed top-0 left-0 flex items-center justify-between px-5 md:px-10 z-20`}>
            <div className="logoAndName flex gap-1 items-center justify-center">
              <p className='hidden md:flex mr-4 p-2 bg-[#e0e5ff] rounded-md hover:scale-105 shadow-sm duration-300'><AiOutlineCoffee className='text-lg text-[#4070d8] font-bold'/></p>
              <span className='text-sm md:text-md font-bold'>Finance Tracking System</span>
            </div>
            <ul className='gap-6 text-sm hidden md:flex'>
              <li className='hover:text-[#4067bd] duration-300 cursor-pointer' onClick={() => navigate("/expensePage")}>Expense</li>
              <li className='hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/envelopePage")}>Envelope</li>
              <li className='hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/incomePage")}>Income</li>
              <li className='hover:text-[#4067bd] duration-300 cursor-pointer'  onClick={() => navigate("/reportPage")}>Report</li>
            </ul>
            <p className='flex md:hidden p-3 rounded-full hover:bg-[#5e5e5e4d]' onClick={() => setExpandMenu(true)}><AiOutlineMenu className='text-lg'/></p>
            <div className="profile hidden md:flex gap-4 items-center justify-center">
              <img src={userData.AvatarPath ? userData.AvatarPath : defaultAvatar } className='w-[45px] h-[45px] object-cover rounded-full' alt="" />
              <div className="nameAndProfile relative">
                <p className='text-[12px] py-1 px-2 bg-[#e0e5ff] hover:bg-[#d7dcf3] duration-300 rounded-lg cursor-pointer' onClick={() => setMiniProfile(!miniProfile)}>Profile</p>
                <motion.div
                animate={miniProfile ? "open" : "closed"}
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: "300%" },
                }}
                transition={{ duration: 0.3 }}>
                  <div className='absolute w-[300px] h-[350px] top-10 right-0 z-[99] rounded-lg bg-[#ffffff] shadow-lg flex flex-col items-center justify-start p-6'>
                    <img src={userData.AvatarPath ? userData.AvatarPath : defaultAvatar } className='w-[80px] h-[80px] border-[2px] border-[#659bff] p-[1px] object-cover rounded-full' alt="" />
                    <p className='font-bold text-xl mt-3'>{userData.Name}</p>
                    <p className=' text-[#3a3a3a] text-md mt-3'>{userData.Email}</p>
                    <p className='px-2  border-[1px] bg-[#e0e5ff] rounded-lg text-[#353535] text-sm mt-6'>More</p>
                    <p className='px-2  border-[1px] bg-[#e0e5ff] rounded-lg text-[#353535] text-sm mt-6 cursor-pointer' onClick={() => logoutFnc()}>Log out</p>
                  </div>
                </motion.div>
              </div>
            </div>
        </div>
        <div className='chartAndPie hidden lg:flex w-full items-center justify-center gap-6 flex-wrap'>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }}>
            <div className='bg-[white] w-[full] p-6 shadow-md hover:shadow-lg duration-300'>
              {/* <h1 className='text-xl font-bold mb-4'>Monthly Income & Outcome chart</h1> */}
              <AiOutlineExpand className='mb-4' onClick={() => navigate("/areaChart")}/>
              {
                isOpen && priceWithMonth ?   <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="600"
                height="370"
              /> : <div></div>
              }

            </div>
          </motion.div>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }} className='flex flex-col items-center justify-start gap-6'>
            <div className='bg-[white] p-6 shadow-md hover:shadow-lg duration-300'>
              {/* <h1 className='text-xl font-bold mb-4'>Monthly Income & Outcome chart</h1> */}
              <AiOutlineExpand className='mb-4' onClick={() => navigate("/pieChart")}/>
              {
                isOpen && categoryCounts ? <Chart
                          options={pie}
                          series={pie.series}
                          type="pie"
                          width="400"
                        /> : <div></div>
              }

            </div>
            <div className="expense w-[450px] h-[130px] bg-[white] flex items-start justify-between shadow-md hover:shadow-lg duration-300">
              <div className='flex-col p-8 h-full items-center justify-center '><p className='font-bold text-2xl text-[#248f2a]'>Let's </p><p className='font-bold text-2xl text-[#a5ad2d]'>Save money</p></div>
              <div className='w-[200px] h-[100px] -mt-[55px]'>{SaveM.View}</div>
            </div>
          </motion.div>
        </div>
        <div className="w-[100%] flex flex-col lg:flex-row items-center justify-start lg:items-start lg:justify-start px-4 py-0 lg:p-4 lg:ps-20 mt-0 lg:mt-4 gap-6">
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }} className='w-[55%] hidden lg:block'>
            <h1 className='text-lg font-semibold mb-4'>Expense History of last 5 months</h1>
            <ExpenseHistory />
          </motion.div>
          <div className='flex flex-col gap-8 items-center'>
            <div className=' flex gap-6'>
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 0.3 }} className='mt-11'>
                  <div className="AddExpense w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] bg-[white] flex flex-col p-4 items-center justify-center shadow-md hover:shadow-lg duration-300" onClick={() => navigate("/expensePage")}>
                    <img src={AddExpense} className='w-[70%] ' alt="" />
                    <h1 className='font-bold text-sm lg:text-md mt-2 text-center'>Add Daily Expense</h1>
                  </div>
              </motion.div>
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 0.3 }} className='mt-11 ' onClick={() => navigate("/reportPage")}>
                  <div className="AddExpense w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]  bg-white flex flex-col p-4 items-center justify-center shadow-md hover:shadow-lg duration-300" >
                    <img src={Report} className='w-[70%] ' alt="" />
                    <h1 className='font-bold text-sm lg:text-md mt-2' >Report</h1>
                  </div>
              </motion.div>
            </div>
            <div className='flex gap-6'>
              <motion.div
                  animate={isOpen ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.3 }} onClick={() => navigate("/incomePage")}>
                    <div className="AddExpense w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]  bg-white flex flex-col p-4 items-center justify-center shadow-md hover:shadow-lg duration-300" >
                    <img src={Income} className='w-[80%] ' alt="" />
                      <h1 className='font-bold text-sm lg:text-md mt-2'>Income</h1>
                    </div>
                </motion.div>
                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.3 }} className='block lg:hidden' onClick={() => navigate("/areaChart")}>
                    <div className="AddExpense w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]  bg-white flex flex-col p-4 items-center justify-center shadow-md hover:shadow-lg duration-300" >
                    <img src={AreaChart} className='w-[90%] ' alt="" />
                      <h1 className='font-bold text-sm lg:text-md mt-2'>Area Chart</h1>
                    </div>
                </motion.div>
            </div>
            <div className='flex lg:hidden gap-6'>
              <motion.div
                  animate={isOpen ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.3 }} onClick={() => navigate("/pieChart")}>
                    <div className="AddExpense w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]  bg-white flex flex-col p-4 items-center justify-center shadow-md hover:shadow-lg duration-300" >
                    <img src={PieChart} className='w-[80%] ' alt="" />
                      <h1 className='font-bold text-sm lg:text-md mt-2'>Pie Chart</h1>
                    </div>
                </motion.div>
            </div>
          </div>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }} className='w-[115%] md:w-[100%] block lg:hidden mt-5'>
            <h1 className='text-lg font-semibold mb-4'>Expense History of last 5 months</h1>
            <ExpenseHistory />
          </motion.div>
        </div>

      </div>
    </>
  )
}


export default MainPage