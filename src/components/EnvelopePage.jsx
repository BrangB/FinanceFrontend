import React, { useEffect, useState } from 'react'
import { useLottie } from "lottie-react";
import comingsoon from '../img/lottieAnimation/comingsoon.json'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const EnvelopePage = () => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(true)
    }, [])

    const navigate = useNavigate()

    const variants = {
        open: { opacity: 1, scale: 1 } ,
        closed: { opacity: 0, scale: 0.5 },
      }

    const options = {
        animationData: comingsoon,
        loop: true
      };

      const coming = useLottie(options);

  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-12'>
        <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }} className='w-[300px] md:w-[600px]'>
            {coming.View}
        </motion.div>
        <p className='px-4 py-1 hover:bg-[#179221] border-[1px] border-[#179221] uppercase hover:text-white text-[14px] duration-300 rounded-sm ' onClick={() => navigate("/mainpage")}>Go to Back</p>
    </div>
  )
}

export default EnvelopePage