// src/components/Auth/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user.userType === 'seller') {
        navigate('/my-properties');
      } else {
        navigate('/properties');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Login</h2>
        <input type="email" {...register('email')} placeholder="Email" className="w-full p-2 mb-4 border rounded" />
        <input type="password" {...register('password')} placeholder="Password" className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full py-2 bg-blue-500 rounded text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
