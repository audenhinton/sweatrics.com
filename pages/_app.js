import '../public/app.css'
import { useState, useEffect } from 'react'
import { getCookie, hasCookie } from 'cookies-next';

import Login from './login'

function Sweatrics({ Component, pageProps }) {

  const [auth, setAuth] = useState()

  useEffect(() => {

    if (hasCookie('peloton_session_id') && hasCookie('peloton_user_id')) {
      setAuth({
        'peloton_session_id': getCookie('peloton_session_id'),
        'peloton_user_id': getCookie('peloton_user_id')
      })
    }

  }, [])

  useEffect(() => {

  }, [auth])

  return <>
    {auth ? <Component {...pageProps} auth={auth} setAuth={setAuth} /> : <Login setAuth={setAuth} />}
  </>
}

export default Sweatrics