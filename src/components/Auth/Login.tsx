import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log("no")
    try {
      const response = await login(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user.userType === 'seller') {
        navigate('/my-properties');
      } else {
        navigate('/properties');
      }
      toast.success('Login successful!');
      reset(); // Reset form state after successful login
    } catch (error: any) {
      console.log("no")
      toast.error('Failed to login.');
      // if (error.response && error.response.data && error.response.data.message) {
      //   setError('apiError', { message: error.response.data.message });
      // } else {
      //   setError('apiError', { message: 'An unknown error occurred' });
      // }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Login</h2>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
        {errors.apiError && <p className="text-red-500">{errors.apiError.message as string}</p>}
        <button type="submit" className="w-full py-2 bg-blue-500 rounded text-white">Login</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
    </div>
  );
};

export default Login;
