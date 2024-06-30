import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home/index'
import Invest from './pages/Invest'
import Create from './pages/Create'

const RouterConfig = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<DefaultLayout MainContentComponent={Home} />}/>
            <Route path='/invest' element={<DefaultLayout MainContentComponent={Invest} />}/>
            <Route path='/create' element={<DefaultLayout MainContentComponent={Create} />}/>
        </Routes>

    </Router>
  )
}

export default RouterConfig