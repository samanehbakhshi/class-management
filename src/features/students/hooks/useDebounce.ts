"use client"
import React, { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay: number= 400) : T{
    const [debounce, setDebounce] = useState(value)
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounce(value)
        }, delay)
        
        return ()=> clearTimeout(timer)
    }
    , [value, delay])
    return  debounce;
}
