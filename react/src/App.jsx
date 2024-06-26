import { useState, useEffect } from 'react'
import './App.css'
import Cart from './components/Cart'
import Checkout  from './components/Checkout'
import TestPage from './components/TestPage'
import Home from './components/Home'
import Duck from './components/Duck'
import Login from './components/Login'
import Search from './components/Search'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import logo from '../../images/logo.png'

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchData = async ()=> {
      try {
        const response = await fetch("http://localhost:3001/ducks")
        if(!response.ok) {
          throw new Error('Data could not be fetched')
        }
        const json_response = await response.json()
        setData(json_response)
      } catch(error) {
        console.log('error fetching ducks:', error)
      }
    }
    fetchData()
  },[])
  //new code
  
  const addToCart = (duck) => {
    const updatedCart = [...cart, duck]
    setCart(updatedCart)
    alert("Duck added to cart")
    console.log(duck)
  }
  
  // end new code
  const handleDelete = async (duck_id) => {
     try{
      const response = await fetch(`http://localhost:3001/ducks/${duck_id}`, {
        method:'DELETE',
      })
      if(!response.ok) {
        throw new Error('Duck could not be deleted')
      }
  
     } catch (error) {
      console.log('error deleting duck')
     }
  }

  return (
    <>
      <Router>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav className="navbar">
        <div className="container-fluid">
          <img src = {logo} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                    Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                    Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="checkout">
                  Checkout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <Search setData={setData} />
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

        <div className="container-fluid">
          <div className="row">
          
            
              <Routes>
                <Route exact path="/" element={<Home data ={data} cart={cart} setCart={setCart} addToCart={addToCart}/>} />
                <Route exact path="/Cart" element={<Cart  cart={cart} setCart={setCart}/>}/>
                <Route exact path="Checkout" element={ 
                
                  <Checkout cart={cart} setCart={setCart}/>
                
                }/>
                <Route exact path="Login" element={ <Login /> } />
                {/* <Route path="/test" element={<TestPage data={data}/>} /> */}
                <Route path=":id" element={<Duck cart={cart} setCart={setCart} addToCart={addToCart} />} />
                {/* <Route path="/Login" element={<LoginForm />} /> */}
              </Routes>
              
              
            
          </div>
        </div>
        </main>
      </Router>
    </>
  )
}

export default App
