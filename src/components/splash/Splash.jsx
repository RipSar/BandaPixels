import logo from '../../assets/images/logo_black.svg'
import './style.scss'
import * as motion from "motion/react-client"

const Splash = () => {
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
      className='logo_wrapper'
    >
      <img src={ logo } alt='logo'/>
    </motion.div>
  )
}

export default Splash