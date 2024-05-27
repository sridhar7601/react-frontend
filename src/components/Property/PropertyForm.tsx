import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addProperty, updateProperty } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PropertyForm = ({ property, onSubmit }: { property?: any, onSubmit: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: property || {
      state: '',
      city: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      furnished: false,
      description: '',
      cost: '',
      petsAllowed: false,
    }
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user.userType === 'buyer') {
      return navigate("/properties");
    }
    if(!user.userType){
      return navigate ("/login")
    }
  }, [user.userType]);

  useEffect(() => {
    if (property) {
      reset(property);
    }
  }, [property, reset]);

  const submitHandler = async (data: any) => {
    try {
      data.userId = user._id;
      if (property) {
        await updateProperty(property._id, data);
        toast.success('Property updated successfully');
        navigate('/my-properties');
      } else {
        await addProperty(data);
        toast.success('Property added successfully');
        navigate('/my-properties');
      }
      onSubmit();
    } catch (error) {
      toast.error('Failed to add/update property');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(submitHandler)} className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="mb-4 text-xl font-bold">{property ? 'Edit Property' : 'Add Property'}</h2>
        
        <div className="mb-4">
          <input 
            type="text" 
            {...register('state', { required: 'State is required' })} 
            placeholder="State" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.state?.message && <p className="text-red-500 text-sm">{String(errors.state.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="text" 
            {...register('city', { required: 'City is required' })} 
            placeholder="City" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.city?.message && <p className="text-red-500 text-sm">{String(errors.city.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="text" 
            {...register('area', { required: 'Area is required' })} 
            placeholder="Area" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.area?.message && <p className="text-red-500 text-sm">{String(errors.area.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="number" 
            {...register('bedrooms', { required: 'Number of bedrooms is required', min: { value: 1, message: 'At least 1 bedroom is required' } })} 
            placeholder="Bedrooms" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.bedrooms?.message && <p className="text-red-500 text-sm">{String(errors.bedrooms.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="number" 
            {...register('bathrooms', { required: 'Number of bathrooms is required', min: { value: 1, message: 'At least 1 bathroom is required' } })} 
            placeholder="Bathrooms" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.bathrooms?.message && <p className="text-red-500 text-sm">{String(errors.bathrooms.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="checkbox" 
            {...register('furnished')} 
            className="mr-2" 
          /> 
          Furnished
        </div>
        
        <div className="mb-4">
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            placeholder="Description" 
            className="w-full p-2 mb-1 border rounded"
          ></textarea>
          {errors.description?.message && <p className="text-red-500 text-sm">{String(errors.description.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="number" 
            {...register('cost', { required: 'Cost is required', min: { value: 1, message: 'Cost must be at least 1' } })} 
            placeholder="Cost" 
            className="w-full p-2 mb-1 border rounded" 
          />
          {errors.cost?.message && <p className="text-red-500 text-sm">{String(errors.cost.message)}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="checkbox" 
            {...register('petsAllowed')} 
            className="mr-2" 
          /> 
          Pets Allowed
        </div>
        
        <button type="submit" className="w-full py-2 bg-blue-500 rounded text-white">{property ? 'Update' : 'Add'} Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
