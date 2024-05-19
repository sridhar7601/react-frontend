import React, { useEffect, useState } from 'react';
import { fetchMyProperties, deleteProperty } from '../services/api';
import PropertyItem from '../components/Property/PropertyItem';
import PropertyForm from '../components/Property/PropertyForm';
import { Navigate } from 'react-router-dom';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
 
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

  const handleEdit = (property: any) => {
    setEditingProperty(property);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id);
      setProperties(properties.filter((property: any) => property._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = () => {
    setEditingProperty(null);
    // Fetch the updated properties after adding or editing
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
          <PropertyItem key={property._id} property={property} onEdit={handleEdit} onDelete={handleDelete} showButtons={true} />
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
