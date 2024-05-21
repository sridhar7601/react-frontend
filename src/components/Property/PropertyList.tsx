import { useEffect, useState, ChangeEvent } from 'react';
import { fetchProperties } from '../../services/api';
import PropertyItem from './PropertyItem';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {io } from "socket.io-client";
interface Property {
  _id: string;
  state: string;
  city: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  petsAllowed: boolean;
  cost: number;
  likes: number;
}

const PropertyList = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    furnished: false,
    petsAllowed: false,
    cost: '',
  });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(()=>{
    const socket = io("http://34.204.63.196:4040");
  
    socket.on("connect", () => {
  
  
      socket.on("like", (data:any) => { 
        console.log("fghjklkvhjkmnb n",filteredProperties,properties) 

let temp = [...filteredProperties];
let index = temp.findIndex((item) => item._id === data.property);
temp[index]["likes"] = data["likes"] || 0;
setFilteredProperties(temp) 

      //  setLikes(data.'likes)
      });
    })
  },[filteredProperties])

  useEffect(() => {
    if (user.userType === 'seller') {
      navigate("/my-properties");
    }
  }, [user.userType, navigate]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.state) {
      filtered = filtered.filter((property) => property.state.toLowerCase().includes(filters.state.toLowerCase()));
    }
    if (filters.city) {
      filtered = filtered.filter((property) => property.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.area) {
      filtered = filtered.filter((property) => property.area.toLowerCase().includes(filters.area.toLowerCase()));
    }
    if (filters.bedrooms) {
      filtered = filtered.filter((property) => property.bedrooms.toString() === filters.bedrooms);
    }
    if (filters.bathrooms) {
      filtered = filtered.filter((property) => property.bathrooms.toString() === filters.bathrooms);
    }
    if (filters.furnished) {
      filtered = filtered.filter((property) => property.furnished === filters.furnished);
    }
    if (filters.petsAllowed) {
      filtered = filtered.filter((property) => property.petsAllowed === filters.petsAllowed);
    }
    if (filters.cost) {
      filtered = filtered.filter((property) => property.cost <= parseFloat(filters.cost));
    }

    setFilteredProperties(filtered);
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
      <h1 className="mb-4 text-2xl font-bold">All Properties</h1>
      <div className="grid gap-4 mb-4">
        <input type="text" name="state" value={filters.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" />
        <input type="text" name="city" value={filters.city} onChange={handleInputChange} placeholder="City" className="p-2 border rounded" />
        <input type="text" name="area" value={filters.area} onChange={handleInputChange} placeholder="Area" className="p-2 border rounded" />
        <input type="number" name="bedrooms" value={filters.bedrooms} onChange={handleInputChange} placeholder="Bedrooms" className="p-2 border rounded" />
        <input type="number" name="bathrooms" value={filters.bathrooms} onChange={handleInputChange} placeholder="Bathrooms" className="p-2 border rounded" />
        <input type="number" name="cost" value={filters.cost} onChange={handleInputChange} placeholder="Cost" className="p-2 border rounded" />
        <label>
          <input type="checkbox" name="furnished" checked={filters.furnished} onChange={handleCheckboxChange} className="mr-2" />
          Furnished
        </label>
        <label>
          <input type="checkbox" name="petsAllowed" checked={filters.petsAllowed} onChange={handleCheckboxChange} className="mr-2" />
          Pets Allowed
        </label>
      </div>
      {loading ? ( 
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderSkeletons(6)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyItem key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
