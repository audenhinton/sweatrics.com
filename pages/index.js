import { useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
var _ = require('lodash')
var numeral = require('numeral')

const Blah = dynamic(() => import('../components/line'), { ssr: false })
const Pie = dynamic(() => import('../components/pie'), { ssr: false })

import Loading from '../components/loading'
import http from '../util/http'


export default function Home({ auth, setAuth }) {

  const [workouts, setWorkouts] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
    getWorkouts()
  }, [])

  const getWorkouts = () => {

    setLoading(true)

    http.get(`/api/workouts?peloton_user_id=${getCookie('peloton_user_id')}`).then(res => {

      setWorkouts(res.filter((item) => {
        return item.status == "COMPLETE"
      }))

      setLoading(false)

    })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

  }

  const getUser = () => {

    fetch(`/api/me?peloton_session_id=${getCookie('peloton_session_id')}`, {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {

        setUser(res)

      })
      .catch(err => console.log(err))

  }

  const signOut = () => {

    deleteCookie('peloton_session_id')
    deleteCookie('peloton_user_id')
    setAuth()

  }

  const total_workouts = workouts?.length

  const total_time = _.sumBy(workouts, (item) => {
    return item.end_time - item.start_time
  })

  const total_output = _.sumBy(workouts, (item) => {
    return item.total_work
  })

  const avg_velocity = Math.pow((total_output / total_time), 0.44) * 2.1

  const getDistance = (item) => {
    return (((item.end_time - item.start_time) / 3600) * Math.pow((item.total_work / (item.end_time - item.start_time)), 0.44) * 2.1)
  }

  let max_distance = _.maxBy(workouts, item => {
    return getDistance(item)
  })

  if (max_distance) {
    max_distance = getDistance(max_distance)
  }

  const total_distance = _.sumBy(workouts, item => {
    return getDistance(item)
  })

  return (
    <div className="prose prose-md max-w-none grid grid-cols-4 gap-5 bg-slate-50 w-full p-5">

      <div className="rounded-lg col-span-4 flex flex-row items-center justify-between">

        <div className="flex-grow flex space-x-5 items-center">

          <img src={user?.image_url} className="h-14 w-14 rounded-full p-0 m-0" />

          <p className="text-2xl">
            Hello, {user.first_name}!
            <a onClick={e => signOut()} className="text-sm block">Sign out </a>
          </p>

        </div>

        <div className="flex-none">
          
        </div>

      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Total workouts
        </SLabel>
        <SMetric>
          {numeral(total_workouts).format('0,0')}
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Total distance
        </SLabel>
        <SMetric>
          {numeral(total_distance).format('0,0.00')} miles
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Total time
        </SLabel>
        <SMetric>
          {numeral(total_time / 3600).format('0,0.00')} hours
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Total output
        </SLabel>
        <SMetric>
          {numeral(total_output / 1000).format('0,0')} kj
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Total calories burned
        </SLabel>
        <SMetric>
          {numeral((total_output / 1000) / 2.3).format('0,0')} kcal
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Calculated fat burned &nbsp; <a href="https://www.nal.usda.gov/legacy/fnic/i-want-lose-pound-weight-how-many-calories-do-i-need-burn" target="_BLANK"><i className="bi bi-info-circle-fill text-slate-400 hover:text-slate-700 transition-all"></i></a>
        </SLabel>
        <SMetric>
          {numeral(((total_output / 1000) / 2.3) / 3500).format('0,0')} lbs
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Avg. output
        </SLabel>
        <SMetric>
          {numeral(total_output / total_time).format('0,0')} watts
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Avg. velocity
        </SLabel>
        <SMetric>
          {numeral(avg_velocity).format('0,0.00')} mph
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          Avg. workout duration
        </SLabel>
        <SMetric>
          {numeral((total_time / total_workouts) / 60).format('0,0')} Min
        </SMetric>
      </div>

      <div className="card col-span-4 md:col-span-2 xl:col-span-1">
        <SLabel>
          PR distance
        </SLabel>
        <SMetric>
          {numeral(max_distance).format('0,0.00')} miles
        </SMetric>
      </div>

      <Blah workouts={workouts} className="col-span-4 rounded-lg shadow-md bg-white p-8" />
      {/* <Pie workouts={workouts} className="col-span-4 rounded-lg shadow-md bg-white p-8" /> */}

      {loading && <Loading text="Crunching abs (and numbers)" />}

    </div>
  )
}


const SLabel = (props) => (
  <label className={`uppercase text-sm tracking-wide font-bold ${props.text || 'text-slate-700'} block w-full mb-5`}>
    {props.children}
  </label>
)

const SMetric = (props) => (
  <p className={`uppercase text-3xl tracking-wide font-light ${props.text || 'text-slate-500'} block w-full p-0 m-0`}>
    {props.children}
  </p>
)





