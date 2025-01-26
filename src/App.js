import './reset.css'
import './App.css';
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react"
import Splash from "./components/splash/Splash";
import Login from "./components/login/Login";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/components/productDetails/ProductDetails";
import NotFound from "./components/notFound/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  const handleLogin = (login, password) => {
    setIsLoading(true);

    const data = {
      username: login,
      password: password,
    };

    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json.token));
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <Splash key='splash'/>
      </AnimatePresence>)
  }

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Products key='products'/>}/>
          <Route path="/login" element={<Login key='login' handleLogin={handleLogin}/>}/>
          <Route path="/product/:id" element={<ProductDetails key='product-detail'/>}/>
          <Route path="*" element={<NotFound key='not-found'/>}/>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App;
