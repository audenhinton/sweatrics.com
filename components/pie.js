import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import moment from 'moment'
var _ = require('lodash')

export default function Blah2({ workouts, className }) {

    const [data, setData] = useState([])

    useEffect(() => {

        setData(workouts)

        console.log(workouts)

    }, [workouts])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className={className}>
            <SLabel>Workout Type</SLabel>
                <PieChart width={300} height={300} >
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="metric_type"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Pie
                        data={data}
                        cx={420}
                        cy={200}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="metric_type"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
        </div>
    )
}

const SLabel = (props) => (
    <label className={`uppercase text-sm tracking-wide font-bold ${props.text || 'text-slate-700'} block w-full mb-5`}>
        {props.children}
    </label>
)

