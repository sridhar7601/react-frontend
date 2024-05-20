import { useEffect, useState } from 'react';
import { fetchMyProperties, deleteProperty } from '../services/api';
import PropertyItem from '../components/Property/PropertyItem';
import PropertyForm from '../components/Property/PropertyForm';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MyProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<{ _id: string; [key: string]: any }[]>([]);
  const [editingProperty, setEditingProperty] = useState<{ _id: string; [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.userType === 'buyer') {
      navigate("/properties");
    }
  }, [user.userType, navigate]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchMyProperties(user._id);
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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

  const renderSkeletons = (count: number) => (
    Array.from({ length: count }, (_, index) => (
      <div key={index} className="border rounded p-4">
        <Skeleton height={200} />
        <Skeleton count={3} />
      </div>
    ))
  );

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Properties</h1>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderSkeletons(6)}
        </div>
      ) : (
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
      )}
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
