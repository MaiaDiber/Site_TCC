import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages'

export default function Navegation() {
    return (

        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
        </Routes>
        </BrowserRouter>
    )
}