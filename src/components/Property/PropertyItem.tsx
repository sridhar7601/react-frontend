import React from 'react';

const PropertyItem = ({
  property,
  onEdit,
  onDelete,
  showButtons,
}: {
  property: any;
  onEdit?: (property: any) => void;
  onDelete?: (id: string) => void;
  showButtons?: boolean;
}) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-bold">
        {property.city}, {property.state}
      </h3>
      <p>{property.area}</p>
      <p>{property.bedrooms} Bedrooms</p>
      <p>{property.bathrooms} Bathrooms</p>
      <p>Cost: ${property.cost}</p>
      <p>{property.furnished ? "Furnished" : "Not Furnished"}</p>
      <p>{property.petsAllowed ? "Pets Allowed" : "No Pets Allowed"}</p>
      <p>{property.description}</p>
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
