import './style.scss'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='not-found_wrapper'>
      <p>
        Nothing here or something wrong
      </p>
      <Link to='/' className='not-found__return-home'>
        Return Home
      </Link>
    </div>
  )
}

export default NotFound