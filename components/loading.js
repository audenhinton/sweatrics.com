import Loader from '../public/loader.svg'

export default function Loading({text = ""}) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-none bg-slate-500/50 backdrop-blur-sm">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <Loader className="w-24 fill-white mx-auto" />
                <p className="text-white mt-12 mx-auto text-lg">{text}</p>
            </div>

        </div>
    )
}