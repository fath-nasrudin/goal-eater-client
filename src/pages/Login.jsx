import { useEffect, useState } from "react"
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const {email, password} = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, isLoading, message} = useSelector((state) => state.auth)


  useEffect(()=> {
    if(isError) {
      toast.error(message)
    }

    // if logged in, navigate to dashboard
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if(isLoading) {
    <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1><FaUser /> Login</h1>
        <p>Please login first</p>
      </section>

      <section className="form">
         <form onSubmit={onSubmit}>

           <div className="form-group">
             <input 
              type="email" 
              className="form-control" 
              id="email"
              name="email"
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              />
           </div>

           <div className="form-group">
             <input 
              type="password" 
              className="form-control" 
              id="password"
              name="password"
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
              />
           </div>

           <div className="form-group">
             <button 
              type="submit"
              className="btn btn-block"
              >Login</button>
           </div>

         </form>
      </section>
    </>
  )
}
export default Login