import React, { useEffect, useState } from 'react';
import { AreaChart, Area, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
var _ = require('lodash')

export default function Blah({ workouts, className }) {

  const [data, setData] = useState([])

  useEffect(() => {

    var groups = _.groupBy(workouts, function (item) {
      return moment.unix(item.end_time).startOf('Week').format().split("T")[0];
    });

    let items = []

    Object.keys(groups).map((group, index) => {
      items.push({
        key: group,
        total: _.sumBy(groups[group], item => {
          return item.total_work
        })
      })
    })

    setData(_.sortBy(items, item => {
      return item.key
    }))

  }, [workouts])


  return (
    <div className={className}>
      <SLabel>Output Trend</SLabel>

      <ResponsiveContainer width={'100%'} aspect={10}>
        <AreaChart

          data={data}
        >

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b91c1c" stopOpacity={1} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={1} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0.1} />
            </linearGradient>
          </defs>


          <XAxis dataKey="key" stroke="#94a3b8" />
          {/* <YAxis tickFormatter={tick => (tick / 1000) +  " kj"} stroke="#ffffff"/> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            dot={false}
            stroke="url(#colorUv)"
            fill="url(#gradientFill)"
            isAnimationActive={false}
          />

          <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const SLabel = (props) => (
  <label className={`uppercase text-sm tracking-wide font-bold ${props.text || 'text-slate-700'} block w-full mb-5`}>
    {props.children}
  </label>
)