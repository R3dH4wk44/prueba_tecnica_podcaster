import { Link } from "react-router-dom"
import './navbar.css'
import { useSelector } from "react-redux"
export const Navbar = () => {
    const visibility = useSelector((state) => state.loader.visible);
    return (<>

        <div className="w-screen h-10 flex justify-between items-center p-10 top-0 sticky bg-slate-900">
            <div>
                <Link to='/' >
                    <h1 className="text-2xl font-bold">Podcaster</h1>
                </Link>
            </div>
            <div className="loader__container">
                { visibility && <div className="loader"></div>}
            </div>

        </div>
    </>)
}