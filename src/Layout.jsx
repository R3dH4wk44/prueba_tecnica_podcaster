import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'

import { Home } from "./views/home";

export const Layout = () => {

    const basename = '/';

    return (<>
        <BrowserRouter basename={basename}>
        
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </BrowserRouter>
    </>)
}