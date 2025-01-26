import './style.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../../../notFound/NotFound";
import Splash from "../../../splash/Splash";
import { AnimatePresence } from "motion/react";
import backButton from '../../../../assets/images/backArrow.svg'
import * as motion from "motion/react-client"



const ProductDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    const isUser = localStorage.getItem('user')
    const userToken = !!isUser && JSON.parse(isUser)
    if (!Object.keys(userToken).length) {
      navigate('/login')
    }

    if (!id || isNaN(Number(id))) {
      setError("Invalid product ID");
      return;
    }

    fetch(`https://fakestoreapi.com/products/${id}`, {
      headers: {
        'Authorization': userToken,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((json) => setProduct(json))
      .catch((err) => setError(err.message))
      .finally(() => {
      setIsLoading(false);
    });
  }, [id]);

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

  if (!product) {
    return (
      <h1>Product was removed</h1>
    );
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
      className="product-details_wrapper"
    >
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={ backButton } alt='back button'/>
      </button>
      <div className="product-details__body">
        <img src={ product.image } alt={ product.title }/>
        <div className="product_info">
          <h1 className="product_title">{ product.title }</h1>
          <h3 className="product_price">${ product.price }</h3>
          <p className="product_description">{ product.description }</p>
          <div className="product_shipping">
            <h1>Shipping & Returns</h1>
            <p>Free standard shipping and free 60-day returns</p>
          </div>
          <div className="product_reviews">
            <h1>Reviews</h1>
            <p className='product_rating'>
              <span className="rating">{ product.rating.rate }</span> Ratings
            </p>
            <p>{ product.rating.count } Reviews</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default ProductDetails