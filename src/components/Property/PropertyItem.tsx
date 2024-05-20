import { useState,useEffect } from 'react';
// import axios from 'axios';
import { updateLikeCount } from '../../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5050');

const PropertyItem = ({ property, onEdit, onDelete, showButtons }: { property: any; onEdit?: (property: any) => void; onDelete?: (id: string) => void; showButtons?: boolean }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [likes, setLikes] = useState(property.likes || 0);
  const toggleEmail = () => {
    setShowEmail((prev) => !prev);
  };
  useEffect(() => {
    // Listen for updates to likes
    socket.on('updateLikes', (data) => {
      if (data.propertyId === property._id) {
        setLikes(data.likes);
      }
    });

    return () => {
      socket.off('updateLikes');
    };
  }, [property._id]);
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateLikeCount(property._id, true, token || undefined);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking property:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-bold">
        {property.city}, {property.state}
      </h3>
      <p>{property.area}</p>
      <p>{property.bedrooms} Bedrooms</p>
      <p>{property.bathrooms} Bathrooms</p>
      <p>Cost: ${property.cost}</p>
      <p>{property.furnished ? 'Furnished' : 'Not Furnished'}</p>
      <p>{property.petsAllowed ? 'Pets Allowed' : 'No Pets Allowed'}</p>
      <p>{property.description}</p>

      {showEmail && <p>{property.seller.email}</p>}
      
     {!showButtons && <button onClick={toggleEmail} className="text-blue-500">
        {showEmail ? 'Hide Email' : 'Show Email'}
      </button>
      }

      <div>
        {!showButtons &&
        <button onClick={handleLike} className="text-blue-500">
          Like &nbsp;
        </button>}
        <span>{likes} Likes</span>
      </div>

      {showButtons && (
        <div className="mt-4">
          <button
            onClick={() => onEdit && onEdit(property)}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(property._id)}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyItem;
