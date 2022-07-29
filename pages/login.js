import { useState } from 'react'
import { setCookie } from 'cookies-next';
import Icon from '../public/icon.svg'

import http from '../util/http';
import Loading from '../components/loading';

export default function Login({ setAuth }) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const connect = async (e) => {
        e.preventDefault()

        setLoading(true)

        http.post('/api/proxy?url=https://api.onepeloton.com/auth/login', {
            "username_or_email": username,
            "password": password
        }).then(res => {

                setLoading(false)

                if (!res.error_code) {
                    setCookie('peloton_session_id', res.session_id);
                    setCookie('peloton_user_id', res.user_id);
                    setAuth({
                        'peloton_session_id': res.session_id,
                        'peloton_user_id': res.user_id
                    })
                } else {
                    alert("Something went wrong while connecting to Peloton, check your credentials.")
                }

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    return (
        <div className="prose prose-md max-w-none grid grid-cols-2 md:h-screen">

            <div className="col-span-2 md:col-span-1 px-5">

                <div className="pt-5 md:pt-48">

                    <Icon className="color-blue-700 w-16 mx-auto" />

                    <h1 className="uppercase text-slate-700 text-center p-0 m-0 mt-5">Sweatrics</h1>
                    <p className="text-center font-light p-0 m-0">(Sweat Metrics)</p>
                    <p className="text-center text-xl m-0 mt-5">An analytics app for Peloton.</p>

                </div>

                <Disclaimer className="hidden md:block" />

            </div>
            <div className="col-span-2 md:col-span-1 md:bg-slate-100 md:pt-48 px-5">

                <div className="w-full max-w-lg mx-auto">

                    <p className="text-center m-0 md:text-xl text-slate-500 md:text-slate-700">Sign in with your Peloton credentials.</p>

                    <form onSubmit={e => connect(e)} className="flex flex-col gap-3 mt-10">
                        <input type="text" onChange={e => setUsername(e.target.value)} required placeholder="Email or username" />
                        <input type="password" autoComplete="new-password" onChange={e => setPassword(e.target.value)} required placeholder="Password" />
                        <button type="submit">Connect</button>
                    </form>

                </div>

                <Disclaimer className="md:hidden" />

            </div>

            {loading && <Loading text="Connecting to Peloton" />}

        </div>
    )
}


const Disclaimer = ({ className }) => (
    <p className={`flex-none text-xs w-full mx-auto max-w-xl text-center mt-12 text-slate-400 ${className}`}>
        Sweatrics is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Peloton, or any of its subsidiaries or its affiliates.
        The name Peloton as well as related names, marks, emblems and images are registered trademarks of their respective owners.
    </p>
)