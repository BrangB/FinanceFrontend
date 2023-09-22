import React, { useState, useEffect, useRef} from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ReportPage = () => {
    useEffect(() => {
        const startAnimate = () => {
            setInterval(() => {
                setIsOpen(true)
            }, 500);
        }
        startAnimate()
    }, [])

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const newDate = new Date();
    // const [data, setData] = useState(
    //     [
    //         {
    //             "id": 1,
    //             "productName": "cola",
    //             "description": "this is very good",
    //             "date": "2023-08-15",
    //             "amount": 6,
    //             "category": "Transportation",
    //             "price": 1.5,
    //             "day": 15,
    //             "month": "August",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 2,
    //             "productName": "tissue",
    //             "description": "delicious and aromatic",
    //             "date": "2023-09-03",
    //             "amount": 15,
    //             "category": "Food",
    //             "price": 0.75,
    //             "day": 3,
    //             "month": "September",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 3,
    //             "productName": "carrot",
    //             "description": "soft and comfortable",
    //             "date": "2023-07-21",
    //             "amount": 30,
    //             "category": "Clothing",
    //             "price": 0.5,
    //             "day": 21,
    //             "month": "July",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 4,
    //             "productName": "shirt",
    //             "description": "exciting and adventurous",
    //             "date": "2023-10-10",
    //             "amount": 50,
    //             "category": "Health Care",
    //             "price": 12.99,
    //             "day": 10,
    //             "month": "October",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 5,
    //             "productName": "apple",
    //             "description": "refreshing and revitalizing",
    //             "date": "2023-11-27",
    //             "amount": 3,
    //             "category": "Housing",
    //             "price": 0.4,
    //             "day": 27,
    //             "month": "November",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 6,
    //             "productName": "book",
    //             "description": "insightful and educational",
    //             "date": "2023-06-18",
    //             "amount": 25,
    //             "category": "Housing",
    //             "price": 20.99,
    //             "day": 18,
    //             "month": "June",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 7,
    //             "productName": "painting",
    //             "description": "vibrant and colorful",
    //             "date": "2023-12-05",
    //             "amount": 10,
    //             "category": "Housing",
    //             "price": 150,
    //             "day": 5,
    //             "month": "December",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 8,
    //             "productName": "bike",
    //             "description": "fast and efficient",
    //             "date": "2023-09-22",
    //             "amount": 40,
    //             "category": "Transportation",
    //             "price": 250,
    //             "day": 22,
    //             "month": "September",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 9,
    //             "productName": "pillow",
    //             "description": "soothing and relaxing",
    //             "date": "2023-08-08",
    //             "amount": 20,
    //             "category": "Housing",
    //             "price": 15.5,
    //             "day": 8,
    //             "month": "August",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 10,
    //             "productName": "table",
    //             "description": "adaptable and versatile",
    //             "date": "2023-10-01",
    //             "amount": 8,
    //             "category": "Housing",
    //             "price": 120,
    //             "day": 1,
    //             "month": "October",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 11,
    //             "productName": "lamp",
    //             "description": "cozy and inviting",
    //             "date": "2023-09-10",
    //             "amount": 70,
    //             "category": "Housing",
    //             "price": 40.75,
    //             "day": 10,
    //             "month": "September",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 12,
    //             "productName": "car",
    //             "description": "smooth and reliable",
    //             "date": "2023-08-28",
    //             "amount": 25,
    //             "category": "Transportation",
    //             "price": 20000,
    //             "day": 28,
    //             "month": "August",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 13,
    //             "productName": "chocolate",
    //             "description": "savory and satisfying",
    //             "date": "2023-09-18",
    //             "amount": 12,
    //             "category": "Food",
    //             "price": 2.99,
    //             "day": 18,
    //             "month": "September",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 14,
    //             "productName": "bandage",
    //             "description": "healing and supportive",
    //             "date": "2023-11-03",
    //             "amount": 100,
    //             "category": "Health Care",
    //             "price": 5.25,
    //             "day": 3,
    //             "month": "November",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 15,
    //             "productName": "jeans",
    //             "description": "stylish and versatile",
    //             "date": "2023-10-25",
    //             "amount": 50,
    //             "category": "Clothing",
    //             "price": 45.99,
    //             "day": 25,
    //             "month": "October",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 16,
    //             "productName": "candle",
    //             "description": "calming and tranquil",
    //             "date": "2023-07-15",
    //             "amount": 40,
    //             "category": "Housing",
    //             "price": 3.5,
    //             "day": 15,
    //             "month": "July",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 17,
    //             "productName": "bus",
    //             "description": "efficient and eco-friendly",
    //             "date": "2023-12-12",
    //             "amount": 35,
    //             "category": "Transportation",
    //             "price": 1.25,
    //             "day": 12,
    //             "month": "December",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 18,
    //             "productName": "pizza",
    //             "description": "delightful and flavorful",
    //             "date": "2023-08-02",
    //             "amount": 18,
    //             "category": "Food",
    //             "price": 10.99,
    //             "day": 2,
    //             "month": "August",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 19,
    //             "productName": "ointment",
    //             "description": "restorative and comforting",
    //             "date": "2023-11-10",
    //             "amount": 75,
    //             "category": "Health Care",
    //             "price": 8.5,
    //             "day": 10,
    //             "month": "November",
    //             "year": "2023"
    //         },
    //         {
    //             "id": 20,
    //             "productName": "hat",
    //             "description": "elegant and sophisticated",
    //             "date": "2023-07-30",
    //             "amount": 60,
    //             "category": "Clothing",
    //             "price": 20.75,
    //             "day": 30,
    //             "month": "July",
    //             "year": "2023"
    //         }
    //         ]
    // )

    const [data, setData] = useState([]);

    const [tempData, setTempData] = useState(data)
    const [backUp, setBackUp] = useState(data)

    const [isOpen, setIsOpen] = useState(false)
    const [openExpense, setOpenExpense] = useState(false)
    const [inputExpense, setInputExpense] = useState({
        day: "",
        month: "",
        year: "",
        category: "",
        amount: null,
        description: ""
    })
    const [tempDate, setTempDate] = useState(null)
    const [filter, setFilter] = useState("Show All")
    const [filterCategory, setFilterCategory ] = useState("All");

    const tableRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(inputExpense)
    }

    

    useEffect(() => {
        if(data){
            if (filter === "Order") {
                setTempData(data);
                setBackUp(tempData)
            }else if (filter === "Unorder") {
                setTempData([...data].reverse());
                setBackUp(tempData)
            }else if(filter === "Show All"){
                setTempData([...data]);
                setBackUp(tempData)
            }
        }
    }, [filter, data]);

    // useEffect(() => {
    //     switch(filterCategory){
    //         case "All":
    //             setTempData(backUp);
    //             break;
    //         case "Housing":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         case "Transportation":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         case "Food":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         case "Health Care":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         case "Education":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         case "Clothing":
    //             setTempData(backUp)
    //             setTempData(tempData.filter(item => {
    //                 return item["category"] == filterCategory
    //             }))
    //             break;
    //             //
    //         default:
    //             setTempData(backUp)
                
    //     }
    // }, [filterCategory])

    useEffect(() => {
        if(data){
            let filteredData = backUp; // Start with the backup data
    
            if (filterCategory !== "All") {
                filteredData = backUp.filter(item => item.category === filterCategory);
            }
        
            setTempData(filteredData);
        }
    
    }, [filterCategory]);

    useEffect(() => {
        const getData = () => {
          setData(JSON.parse(localStorage.getItem("ExpenseData")))
        }
        getData();
      }, [])
    
    

    const inputDate = async (e) => {
        const updatedTempDate = e.target.value;
        setTempDate(updatedTempDate);
    
        const [year, monthNum, day] = updatedTempDate.split("-");
        const monthName = months[parseInt(monthNum, 10) - 1];
        setInputExpense({
            ...inputExpense, 
            day: day,
            month: monthName,
            year: year
        });
    }

    const exportPdf = () => {
        const doc = new jsPDF();
    
        // Add title with styling
        doc.setFontSize(16);
        doc.setTextColor(44, 62, 80); // Title color
        doc.setFont('helvetica', 'bold'); // Set font and font weight
        doc.text("Expense Report", 10, 10);
    
        // Generate the table below the title
        const tableHtml = tableRef.current;
        doc.autoTable({
            html: tableHtml,
            startY: 20, // Start the table after the title
            theme: 'striped',
            styles: {
                font: 'helvetica',
                fontSize: 10,
                textColor: [0, 0, 0], // Black color
                margin: { top: 6, right: 6, bottom: 6, left: 6 },
                cellPadding: 3,
            }
        });
    
        doc.save('table_with_title.pdf');
    }
    
  return (
    <>
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={{    open: { opacity: 1, scale: 1 } ,
          closed: { opacity: 0, scale: 0.2 },}}
          transition={{ duration: 0.3 }} className='w-full h-screen md:h-full'>
            <div className='w-[100%] h-screen bg-[white] rounded-sm shadow-lg py-6 px-6 lg:px-12 flex flex-col gap-10 lg:gap-2 items-center'>
                <div className="headerAndaddExpense w-full flex justify-between items-center">
                    <h1 className='text-md md:text-lg font-semibold uppercase'>Report Page</h1>
                    <div className="addExpense flex gap-2 md:gap-4">
                        <button className='px-2 md:px-4 py-1 hover:bg-[#179221] border-[1px] border-[#179221]  uppercase hover:text-white text-[12px] md:text-[14px] duration-300 rounded-sm ' onClick={() => exportPdf()}>Export</button>
                        <button className='px-2 md:px-4 py-1 hover:bg-[#179221] border-[1px] border-[#179221]  uppercase hover:text-white text-[12px] md:text-[14px] duration-300 rounded-sm ' onClick={() => navigate("/mainpage")}>Go Back</button>
                    </div>
                </div>
                <div className="category w-full flex gap-3 md:gap-7 lg:gap-10 justify-center p-2 mt-3 lg:mt-0 md:p-6 items-center text-sm">
                    <div onClick={() => setFilter("Show All")} className={`${filter === "Show All" ? "bg-[#179221] text-[white]" : "bg-[#e7e7e7]"}  py-1 px-2 text-sm md:text-md hover:bg-[#179221] duration-300 hover:border-[#179221] rounded-sm hover:text-[white] cursor-pointer`}>Show All</div>
                    <div onClick={() => setFilter("Order")} className={`${filter === "Order" ? "bg-[#179221] text-[white]" : "bg-[#e7e7e7]"} py-1 px-2 text-sm md:text-md hover:bg-[#179221] duration-300 hover:border-[#179221] rounded-sm hover:text-[white] cursor-pointer`}>Order</div>
                    <div onClick={() => setFilter("Unorder")} className={`${filter === "Unorder" ? "bg-[#179221] text-[white]" : "bg-[#e7e7e7]"} py-1 px-2 text-sm md:text-md hover:bg-[#179221] duration-300 hover:border-[#179221] rounded-sm hover:text-[white] cursor-pointer`}>Unorder</div>
                    {/* <div onClick={() => setFilter("Category: All")} className={`${filter === "Category: All" ? "bg-[#179221] text-[white]" : "bg-[#e7e7e7]"} py-1 px-2 hover:bg-[#179221] duration-300 hover:border-[#179221] rounded-sm hover:text-[white] cursor-pointer`}>Category: All</div> */}
                    <select type="text" className={`bg-[#e7e7e7] py-1 px-2 text-sm md:text-md duration-300 w-[100px] md:w-[130px] rounded-sm cursor-pointer`} id='category' onChange={(e) => setFilterCategory(e.target.value)}>
                            <option>All</option>
                            <option>Housing</option>
                            <option>Transportation</option>
                            <option>Food</option>
                            <option>HealthCare</option>
                            <option>Clothing</option>
                            <option>Education</option>
                    </select>
                </div>
                <div className="expenseGroup w-full min-h-[480px]  lg:h-[480px] flex flex-col overflow-y-scroll lg:overflow-y-hidden">
                    <table className='w-full border-none' ref={tableRef}>
                        <thead>
                            <tr className='column border-none'>
                                <th className='text-left  p-3'>No</th>
                                <th className='text-left  p-3'>Date</th>
                                <th className='text-left  p-3'>Product</th>
                                <th className='text-left  p-3'>Description</th>
                                <th className='text-left  p-3'>Price</th>
                                <th className='text-left  p-3'>Amount</th>
                                <th className='text-left  p-3'>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                tempData && tempData.map(item => (
                                    <tr className='column border-none' key={item.ExpenseID}>
                                        <td className='text-left text-sm p-3'>{item.ExpenseID}</td>
                                        <td className='text-left text-sm p-3'>{item.date.substr(0, 10)}</td>
                                        <td className='text-left text-sm p-3'>{item.productName}</td>
                                        <td className='text-left text-sm p-3'>{item.description}</td>
                                        <td className='text-left text-sm p-3'>{item.price} MMK</td>
                                        <td className='text-left text-sm p-3'>{item.amount}</td>
                                        <td className='text-left text-sm p-3'>{item.category}</td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
        <motion.div
          animate={openExpense ? "open" : "closed"}
          variants={{    open: { opacity: 1, scale: 1 } ,
          closed: { opacity: 0, scale: 0 },}}
          transition={{ duration: 0.3 }} className='w-full h-full absolute'>
        <div className={` w-full h-full bg-[#00000069] z-10 fixed top-0 left-0 flex items-center justify-center flex-col`}>
            <div className='createExpense w-full h-full md:w-[600px] md:h-[600px] bg-[white] rounded-none lg:rounded-xl flex flex-col gap-1 overflow-hidden'>
                <div className="title w-full bg-[#EBEBEB] py-4 px-6 justify-between items-center flex ">
                    <h1 className='text-lg'>Create Expense</h1>
                    <AiOutlineClose className='text-lg font-bold' onClick={() => setOpenExpense(false)}/>
                </div>
                <div className='p-4 md:p-6 flex flex-wrap gap-2 lg:gap-5 items-center justify-center'>
                    <div>
                        <label className='block mt-3 text-sm font-semibold' htmlFor="date">Date</label>
                        <input  className='w-38 h-10 text-[12px] md:text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="date" id='date' value={inputExpense.date} onChange={(e) => inputDate(e)} />
                    </div>
                    <div>
                        <label className='block mt-3 text-sm font-semibold' htmlFor="category">Category</label>
                        <select type="text" className='w-40 h-10 text-[12px] md:text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' value={inputExpense.category} id='category' onChange={(e) => setInputExpense({...inputExpense, category: e.target.value})}>
                            <option>Housing</option>
                            <option>Transportation</option>
                            <option>Food</option>
                            <option>HealthCare</option>
                            <option>Education</option>
                            <option>Clothing</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mt-3 text-sm font-semibold' htmlFor="amount">Amount</label>
                        <input type="number" className='w-36 h-10 text-[12px] md:text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' id='amount' value={inputExpense.amount} placeholder='eg: 100000' onChange={(e) => setInputExpense({...inputExpense, amount: e.target.value})}/>
                    </div>
                </div>
                <div className='p-2 flex gap-5 items-center justify-center'>
                    <div>
                        <label className='block text-sm font-semibold' htmlFor="product">Product</label>
                        <input  className='w-32 md:w-38 h-10 text-[12px] md:text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="text" id='product' placeholder='eg: Apple' value={inputExpense.productName} onChange={(e) => setInputExpense({...inputExpense, productName: e.target.value})}/>
                    </div>
                    <div>
                        <label className='block text-sm font-semibold' htmlFor="price">Price</label>
                        <input  className='w-32 md:w-38 h-10 text-[12px] md:text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 mt-2' type="number" id='price' placeholder='eg: 9000' value={inputExpense.price} onChange={(e) => setInputExpense({...inputExpense, price: e.target.value})}/>
                    </div>
                </div>
                <div className='px-9 flex gap-3 flex-col h-40'>
                    <label className='mt-2 text-sm font-semibold' htmlFor="Description">Description</label>
                    <textarea id="Description" placeholder='Description' className='w-full h-full text-sm placeholder:text-[#7e7e7e] placeholder:text-[14px] focus:border-[#4694b3] transition-all duration-200 border-[#727272] border-[1px] rounded-sm outline-none p-2 ' value={inputExpense.description} onChange={(e) => setInputExpense({...inputExpense, description: e.target.value})}></textarea>
                </div>
                <div className='px-9 flex gap-3 flex-col mt-8'>
                    <button onClick={(e) => handleSubmit(e)} className='w-[80px] p-2 hover:bg-[#3ba044] bg-[#179221] text-white border-[1px] border-[#179221]  uppercase text-center  text-[14px] duration-300 rounded-sm'>Create</button>
                </div>

            </div>

        </div>
        </motion.div>
    </>

  )
}

export default ReportPage