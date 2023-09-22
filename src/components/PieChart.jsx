import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import Chart from "react-apexcharts";
import { AiOutlineCompress } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const variants = {
    open: { opacity: 1, scale: 1 } ,
    closed: { opacity: 0, scale: 0.5 },
  }

const PieChart = () => {

    const navigate = useNavigate();
    const [expenseData, setExpenseData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
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

  const [categoryCounts, setCategoryCounts] = useState({
    Clothing: 0,
    Food: 0,
    HealthCare: 0,
    Housing: 0,
    Transportation: 0,
    Education: 0
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
      countCategories()
    }

  }, [expenseData])

  useEffect(() => {
    setExpenseData(JSON.parse(localStorage.getItem("ExpenseData")))
  }, [])

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
      const newPieOptions = {
        ...pie,
        series: [
          categoryCounts.Housing,
          categoryCounts.Transportation,
          categoryCounts.Food,
          categoryCounts.HealthCare,
          categoryCounts.Education,
          categoryCounts.Clothing,
        ],
      };
      setPie(newPieOptions);
    }, [categoryCounts]);
    
  
      useEffect(() => {
        const startAnimate = () => {
          setTimeout(() => {
                setIsOpen(true)
            }, 500);
        }
        startAnimate()
    }, [])


  return (
    <>
    {
      <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}>
      <div className='bg-[white] p-6'>
        {/* <h1 className='text-xl font-bold mb-4'>Monthly Income & Outcome chart</h1> */}
        <AiOutlineCompress className='mb-4' onClick={() => navigate("/mainpage")}/>
        {
          isOpen ?    <Chart
          options={pie}
          series={pie.series}
          type="pie"
          width="600"
          animation={{
            enabled: true,
            delay: 2000, // Experiment with this value
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          }}
        /> : <div></div>
        }
      </div>
    </motion.div>
    }

    </>
  )
}

export default PieChart