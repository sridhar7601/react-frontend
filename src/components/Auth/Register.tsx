import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      navigate('/login');
      toast.success('Registration successful!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to register.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            {...register('firstName', { required: 'First Name is required' })}
            placeholder="First Name"
            className="w-full p-2 border rounded"
          />
          {errors.firstName?.message && <p className="text-red-500">{String(errors.firstName.message)}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            {...register('lastName', { required: 'Last Name is required' })}
            placeholder="Last Name"
            className="w-full p-2 border rounded"
          />
          {errors.lastName?.message && <p className="text-red-500">{String(errors.lastName.message)}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email?.message && <p className="text-red-500">{String(errors.email.message)}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            {...register('phoneNumber', { required: 'Phone Number is required' })}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber?.message && <p className="text-red-500">{String(errors.phoneNumber.message)}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          {errors.password?.message && <p className="text-red-500">{String(errors.password.message)}</p>}
        </div>
        <div className="mb-4">
          <select
            {...register('userType', { required: 'User Type is required' })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select User Type</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.userType?.message && <p className="text-red-500">{String(errors.userType.message)}</p>}
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 rounded text-white">Register</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Register;
