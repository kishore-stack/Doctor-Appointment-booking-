import React, { useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Login = () => {
  const{backendUrl,token,setToken}=useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(state==='Sign up'){
        const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }

      }else{
         const {data}=await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }

      }
    }
    catch(error){
      toast.error(error.message)
  };
}
useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md shadow-md flex flex-col gap-4 w-full">
        <p className="text-2xl font-semibold">
          {state === 'Sign up' ? 'Create Account' : 'Login'}
        </p>

        <p className="text-gray-600">
          Please {state === 'Sign up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        {/* Show name input only in Sign up mode */}
        {state === 'Sign up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          {state === 'Sign up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign up' ? (
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <span
              onClick={() => setState('Sign up')}
              className="text-primary underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
