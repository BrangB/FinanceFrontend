import React, {useEffect, useState} from 'react'
import { AiOutlineClose, AiOutlineCoffee } from "react-icons/ai";


const ExpenseHistory = () => {

    const [data, setData] = useState([
        {
            "id": 1,
            "productName": "cola",
            "description": "this is very good",
            "date": "2023-08-15",
            "amount": 6,
            "category": "Transportation",
            "price": 1.5,
            "day": 15,
            "month": "August",
            "year": "2023"
        },
        {
            "id": 2,
            "productName": "tissue",
            "description": "delicious and aromatic",
            "date": "2023-09-03",
            "amount": 15,
            "category": "Food",
            "price": 0.75,
            "day": 3,
            "month": "September",
            "year": "2023"
        },
        {
            "id": 3,
            "productName": "carrot",
            "description": "soft and comfortable",
            "date": "2023-07-21",
            "amount": 30,
            "category": "Clothing",
            "price": 0.5,
            "day": 21,
            "month": "July",
            "year": "2023"
        },
        {
            "id": 4,
            "productName": "shirt",
            "description": "exciting and adventurous",
            "date": "2023-10-10",
            "amount": 50,
            "category": "HealthCare",
            "price": 12.99,
            "day": 10,
            "month": "October",
            "year": "2023"
        },
        {
            "id": 5,
            "productName": "apple",
            "description": "refreshing and revitalizing",
            "date": "2023-11-27",
            "amount": 3,
            "category": "Housing",
            "price": 0.4,
            "day": 27,
            "month": "November",
            "year": "2023"
        },
        {
            "id": 6,
            "productName": "book",
            "description": "insightful and educational",
            "date": "2023-06-18",
            "amount": 25,
            "category": "Housing",
            "price": 20.99,
            "day": 18,
            "month": "June",
            "year": "2023"
        },
        {
            "id": 7,
            "productName": "painting",
            "description": "vibrant and colorful",
            "date": "2023-12-05",
            "amount": 10,
            "category": "Housing",
            "price": 150,
            "day": 5,
            "month": "December",
            "year": "2023"
        },
        {
            "id": 8,
            "productName": "bike",
            "description": "fast and efficient",
            "date": "2023-09-22",
            "amount": 40,
            "category": "Transportation",
            "price": 250,
            "day": 22,
            "month": "September",
            "year": "2023"
        },
        {
            "id": 9,
            "productName": "pillow",
            "description": "soothing and relaxing",
            "date": "2023-08-08",
            "amount": 20,
            "category": "Housing",
            "price": 15.5,
            "day": 8,
            "month": "August",
            "year": "2023"
        },
        {
            "id": 10,
            "productName": "table",
            "description": "adaptable and versatile",
            "date": "2023-10-01",
            "amount": 8,
            "category": "Housing",
            "price": 120,
            "day": 1,
            "month": "October",
            "year": "2023"
        },
        {
            "id": 11,
            "productName": "lamp",
            "description": "cozy and inviting",
            "date": "2023-09-10",
            "amount": 70,
            "category": "Housing",
            "price": 40.75,
            "day": 10,
            "month": "September",
            "year": "2023"
        },
        {
            "id": 12,
            "productName": "car",
            "description": "smooth and reliable",
            "date": "2023-08-28",
            "amount": 25,
            "category": "Transportation",
            "price": 20000,
            "day": 28,
            "month": "August",
            "year": "2023"
        },
        {
            "id": 13,
            "productName": "chocolate",
            "description": "savory and satisfying",
            "date": "2023-09-18",
            "amount": 12,
            "category": "Food",
            "price": 2.99,
            "day": 18,
            "month": "September",
            "year": "2023"
        },
        {
            "id": 14,
            "productName": "bandage",
            "description": "healing and supportive",
            "date": "2023-11-03",
            "amount": 100,
            "category": "HealthCare",
            "price": 5.25,
            "day": 3,
            "month": "November",
            "year": "2023"
        },
        {
            "id": 15,
            "productName": "jeans",
            "description": "stylish and versatile",
            "date": "2023-10-25",
            "amount": 50,
            "category": "Clothing",
            "price": 45.99,
            "day": 25,
            "month": "October",
            "year": "2023"
        },
        {
            "id": 16,
            "productName": "candle",
            "description": "calming and tranquil",
            "date": "2023-07-15",
            "amount": 40,
            "category": "Housing",
            "price": 3.5,
            "day": 15,
            "month": "July",
            "year": "2023"
        },
        {
            "id": 17,
            "productName": "bus",
            "description": "efficient and eco-friendly",
            "date": "2023-12-12",
            "amount": 35,
            "category": "Transportation",
            "price": 1.25,
            "day": 12,
            "month": "December",
            "year": "2023"
        },
        {
            "id": 18,
            "productName": "pizza",
            "description": "delightful and flavorful",
            "date": "2023-08-02",
            "amount": 18,
            "category": "Food",
            "price": 10.99,
            "day": 2,
            "month": "August",
            "year": "2023"
        },
        {
            "id": 19,
            "productName": "ointment",
            "description": "restorative and comforting",
            "date": "2023-11-10",
            "amount": 75,
            "category": "HealthCare",
            "price": 8.5,
            "day": 10,
            "month": "November",
            "year": "2023"
        },
        {
            "id": 20,
            "productName": "hat",
            "description": "elegant and sophisticated",
            "date": "2023-07-30",
            "amount": 60,
            "category": "Clothing",
            "price": 20.75,
            "day": 30,
            "month": "July",
            "year": "2023"
        }
    ]);
    const [expenseData, setExpenseData] = useState([])
    const [duringMonthData, setDurigMonthData] = useState([])

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

useEffect(() => {
    setExpenseData(JSON.parse(localStorage.getItem("ExpenseData")))
}, [])

useEffect(() => {
    if(expenseData){
        const currentMonth = new Date();
        const tempArray = expenseData.filter((item) => {
            return item.month === months[currentMonth.getMonth()] || item.month === months[currentMonth.getMonth() - 1] || item.month === months[currentMonth.getMonth() - 2] || item.month === months[currentMonth.getMonth() - 3] || item.month === months[currentMonth.getMonth() - 4] || item.month === months[currentMonth.getMonth() - 5]
        })
        setDurigMonthData(tempArray)
    }
}, [expenseData])



  return (
    <div className="expenseGroup w-[100%] h-[500px] overflow-y-scroll overflow-x-hidden flex flex-col gap-4" >
        {
            duringMonthData.map(item => {
                return (
                    <div className="expense flex justify-between items-center bg-white p-4 rounded-lg" key={item.ExpenseID}>
                        <div className="logoAndName flex items-center justify-start w-20 ">
                            <p className='hidden md:flex mr-6 p-2 bg-[#e0e5ff] rounded-md hover:scale-105 shadow-sm duration-300'><AiOutlineCoffee className='text-md md:text-lg text-[#4070d8] font-bold'/></p>
                            <div className="category flex flex-col gap-1">
                                <p className='text-sm font-bold text-[#363636] text-ellipsis whitespace-nowrap overflow-hidden'>{item.productName}</p>
                                <p className="date text-[12px] md:text-sm text-[#555555] text-ellipsis whitespace-nowrap overflow-hidden">{item.day} {item.month} {item.year}</p>
                            </div>
                        </div>
                        <div className="priceAndDeleteButton flex items-end justify-end ">
                            <p className="price text-sm text-[#4e4e4e] ">{item.category}</p>
                            {/* <div className='p-2 bg-[#F1F2F7] rounded-md hover:scale-105 shadow-sm duration-300 ml-6'>
                                <AiOutlineClose className='text-md text-[#585858] font-bold'/>
                            </div> */}
                        </div>
                        <div className="priceAndDeleteButton flex items-center justify-center">
                            <p className="price font-bold text-sm md:text-md text-[#363636]">- {item.price} MMK</p>
                            {/* <div className='p-2 bg-[#F1F2F7] rounded-md hover:scale-105 shadow-sm duration-300 ml-6'>
                                <AiOutlineClose className='text-md text-[#585858] font-bold'/>
                            </div> */}
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ExpenseHistory