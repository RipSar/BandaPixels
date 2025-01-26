import './style.scss'
import * as motion from "motion/react-client"
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";


const currentInput = {
  login: 'Username',
  pass: 'Password',
}
const Login = ({ handleLogin }) => {
  const navigate = useNavigate()
  const [currentInputValue, setCurrentInputValue] = useState(currentInput['login'])
  const [text, setText] = useState('')
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const isUser = localStorage.getItem('user')
    const userToken = !!isUser && JSON.parse(isUser)
    if (Object.keys(userToken).length) {
      navigate('/')
    }
  }, []);

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleSubscribe = () => {
    if (!!text.trim()) {
      if (currentInputValue === currentInput['login']) {
        setCurrentInputValue(currentInput['pass'])
        setUserData(text)
        setText('')
      } else {
        handleLogin(userData, text)
      }
    }
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
      className='login_wrapper'
    >
      <h1>
        Sign in
      </h1>
      <AnimatePresence mode="wait">
        <InputComponent
          key={ currentInputValue }
          isLogin={ currentInputValue === currentInput['login'] }
          placeholderText={ currentInputValue }
          handleText={ handleText }
          handleSubscribe={ handleSubscribe }
          text={text}
        />
      </AnimatePresence>
      <button onClick={ handleSubscribe }>
        Continue
      </button>
    </motion.div>
  )
}

const InputComponent = ({
  placeholderText,
  text,
  handleText,
  isLogin,
  handleSubscribe,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubscribe()
    }
  }

  return (
    <motion.input
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        duration: 0.2,
        delay: 0.2,
        ease: "easeInOut",
      }}
      exit={{opacity: 0, scale: 0.5}}
      type={isLogin ? 'text' : 'password'}
      autoFocus={true}
      placeholder={placeholderText}
      onChange={handleText}
      value={text}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Login