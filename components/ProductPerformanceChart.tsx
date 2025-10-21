"use client"
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type productPerformance = {
    name: string,
    retention: number
}

function ProductPerformanceChart() {
    const [productPerformance, setProductPerformance] = useState<productPerformance[]>([]);

    useEffect(()=>{
        fetch("data/data.json").then((res)=>res.json()).then((data)=>setProductPerformance(data.productPerformance))
    },[])

  return (
    <div className="bg-neutral-800 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-neutral-900 md:mx-0">
    <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
      Order Overview
    </h2>
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={productPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke='#374151'/>
            <XAxis dataKey="name" stroke='#9ca3af' tick={{fontSize: 12}} interval="preserveStartEnd"/>
            <YAxis stroke='#9ca3af' tick={{fontSize: 12}} width={40}/>
            <Tooltip contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#4b5563",
                fontSize: "12px",
            }}
            itemStyle={{color: "#e5e7eb"}}
            />
            <Legend wrapperStyle={{fontSize: 12}}/>
            <Bar dataKey="Retention" fill="#ff7043" radius={[4,4,0,0]} barSize={20}/>
            <Bar dataKey="Revenue" fill="#29b6f6" radius={[4,4,0,0]} barSize={20}/>
            <Bar dataKey="Profit" fill="#66bb6a" radius={[4,4,0,0]} barSize={20}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  )
}

export default ProductPerformanceChart