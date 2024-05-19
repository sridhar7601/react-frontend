import { useEffect, useState } from 'react';
import { fetchMyProperties, deleteProperty } from '../services/api';
import PropertyItem from '../components/Property/PropertyItem';
import PropertyForm from '../components/Property/PropertyForm';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<{ _id: string; [key: string]: any }[]>([]);
  const [editingProperty, setEditingProperty] = useState<{ _id: string; [key: string]: any } | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.userType === 'buyer') {
      
      return navigate("https://react-frontend-e23w.vercel.app/properties");
    }
  }, [user.userType]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchMyProperties(user._id);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProperties();
  }, [user._id]);

  const handleEdit = (property: { _id: string; [key: string]: any }) => {
    setEditingProperty(property);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id);
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = () => {
    setEditingProperty(null);
    const fetchUpdatedProperties = async () => {
      try {
        const response = await fetchMyProperties(user._id);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpdatedProperties();
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Properties</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyItem
            key={property._id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showButtons={true}
          />
        ))}
      </div>
      {editingProperty && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Edit Property</h2>
          <PropertyForm property={editingProperty} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default MyProperties;