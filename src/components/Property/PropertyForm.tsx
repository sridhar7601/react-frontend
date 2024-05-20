import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addProperty, updateProperty } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PropertyForm = ({ property, onSubmit }: { property?: any, onSubmit: () => void }) => {
  const { register, handleSubmit, reset } = useForm({
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
      return navigate("/properties")
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
        alert('Property updated successfully');
        navigate('/my-properties');

      } else {
        await addProperty(data);
        alert('Property added successfully');
        navigate('/my-properties');
      }
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(submitHandler)} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">{property ? 'Edit Property' : 'Add Property'}</h2>
        <input type="text" {...register('state')} placeholder="State" className="w-full p-2 mb-4 border rounded" />
        <input type="text" {...register('city')} placeholder="City" className="w-full p-2 mb-4 border rounded" />
        <input type="text" {...register('area')} placeholder="Area" className="w-full p-2 mb-4 border rounded" />
        <input type="number" {...register('bedrooms')} placeholder="Bedrooms" className="w-full p-2 mb-4 border rounded" />
        <input type="number" {...register('bathrooms')} placeholder="Bathrooms" className="w-full p-2 mb-4 border rounded" />
        <div className="mb-4">
          <input type="checkbox" {...register('furnished')} className="mr-2" /> Furnished
        </div>
        <textarea {...register('description')} placeholder="Description" className="w-full p-2 mb-4 border rounded"></textarea>
        <input type="number" {...register('cost')} placeholder="Cost" className="w-full p-2 mb-4 border rounded" />
        <div className="mb-4">
          <input type="checkbox" {...register('petsAllowed')} className="mr-2" /> Pets Allowed
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 rounded text-white">
          {property ? 'Update Property' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
