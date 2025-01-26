import './style.scss'
import * as motion from "motion/react-client"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AnimatePresence} from "motion/react";
import NotFound from "../notFound/NotFound";
import Splash from "../splash/Splash";

const Products = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const isUser = localStorage.getItem('user')
    const userToken = !!isUser && JSON.parse(isUser)
    if (!Object.keys(userToken).length) {
      navigate('/login')
    }

    fetch('https://fakestoreapi.com/products', {
      headers: {
        'Authorization': userToken,
      }
    })
      .then(res => res.json())
      .then(json => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => {
      setIsLoading(false)
      });
  }, []);

  if (error) {
    return (
      <AnimatePresence mode="wait">
        <NotFound key='not-found' />
      </AnimatePresence>
    );
  }

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <Splash key='splash' />
      </AnimatePresence>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.2,
        ease: "easeInOut",
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      className='products_wrapper'
    >
      <h1>Products</h1>

      <div className='products_wrapper__grid'>
        {data.length > 0
          ? data.map((product) => (
            <Link
              to={`/product/${ product.id }`}
              className='products_wrapper__product'
              key={ product.id }
            >
              <img src={ product.image } alt={ product.title + ' image' }/>
              <div className='product_description'>
                <p className="title">{ product.title }</p>
                <h3 className="price">${ product.price }</h3>
              </div>
            </Link>
          ))
          : "No products yet..."}
      </div>
    </motion.div>
  )
}
export default Products