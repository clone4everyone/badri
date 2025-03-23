import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LikeCard = ({ property,index}) => {
  const navigate=useNavigate();
  const handleCardClick = () => {
    navigate(`/projectDetail/${property.title}/${property._id}`, { state: property });
    window.location.reload()
  };

  return (
    <div className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 hover:cursor-pointer" onClick={()=>handleCardClick()}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={property.thumbnail} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
        <h2 className="text-xl font-bold flex items-center gap-2 font-[firaSans]">
                 {property.title}
                </h2>
                <p className="flex items-center gap-2 font-[Montserrat]">
                  {property.locationTitle}
                </p>
                <p className="flex items-center gap-2 font-[Montserrat]">
                 
                {property.unit === "sqft"
            ? `${property.totalArea} Sq.ft `
            :property.unit === "Acre"? `${property.totalArea} Acre`:`${property.totalArea} Cents`}
                </p>
                {property.category === "house" && (
                  <p className="flex items-center gap-2 font-[Montserrat]">
                 
                    {`${property.bhk} BHK${property.balcony ? ' - Balcony' : ''}${property.terrace ? ' - Terrace' : ''}`}
                  </p>
                )}
                <p className="font-[Montserrat] font-semibold">
                  
                  ₹ {Number(property.price).toLocaleString('en-IN')}</p>
                
                {/* Conditionally truncate description based on view mode */}
                <p className="font-[Montserrat]">
                
              
                  {  property.description.length > 16
                        ? `${property.description.substring(0, 16)}...` 
                        : property.description}
                  
                </p>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;