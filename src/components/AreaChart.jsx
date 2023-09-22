import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import Chart from "react-apexcharts";
import { AiOutlineCompress } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const variants = {
    open: { opacity: 1, scale: 1 } ,
    closed: { opacity: 0, scale: 0.5 },
  }

const AreaChart = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [expenseData, setExpenseData] = useState([])
    const [incomeData, setIncomeData] = useState([])
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

    const [state, setState] = useState({
      options: {
        chart: {
          id: "basic-bar",
          background: '#fff'
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
          max: 600000,     // Set the maximum value
          tickAmount: 6,  // Set the number of ticks (approximate)
          labels: {
            formatter: function (value) {
              // You can format the y-axis labels here (e.g., adding currency symbols or units)
              if(value){
                return value.toFixed(0); // Example: format to two decimal places
              }else{
                return value; // Example: format to two decimal places
              }

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

      useEffect(() => {
        setExpenseData(JSON.parse(localStorage.getItem("ExpenseData")))
      }, [])

      useEffect(() => {

        if(expenseData){
    
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
          console.log(priceWithMonth)
        }
    
      }, [expenseData])

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
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}>
            <div className='bg-[white] p-6'>
            {/* <h1 className='text-xl font-bold mb-4'>Monthly Income & Outcome chart</h1> */}
            <AiOutlineCompress className='mb-4 text-xl font-bold text-[#6147E5]' onClick={() => navigate("/mainpage")}/>
            {
                isOpen && priceWithMonth ? <div className='w-[300px] md:w-[600px] lg:w-[800px] overflow-x-scroll overflow-y-hidden'><Chart
                options={state.options}
                series={state.series}
                type="area"
                width="800"
              /> </div>: <div></div>
              }
          </div>
        </motion.div>
    </>
  )
}

export default AreaChart