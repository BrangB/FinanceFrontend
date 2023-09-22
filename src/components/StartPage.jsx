import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StartPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login")
    }, [])

  return (
    <div></div>
  )
}

export default StartPage