
import React from 'react';
import { Link } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  imageSrc: string;
  cityCount: number;
}

const destinations: Destination[] = [
  {
    id: 'canada',
    name: 'Canadá',
    imageSrc: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cityCount: 4
  },
  {
    id: 'ireland',
    name: 'Irlanda',
    imageSrc: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    cityCount: 3
  },
  {
    id: 'australia',
    name: 'Austrália',
    imageSrc: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cityCount: 5
  },
  {
    id: 'england',
    name: 'Inglaterra',
    imageSrc: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cityCount: 2
  },
  {
    id: 'dubai',
    name: 'Dubai',
    imageSrc: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cityCount: 1
  },
  {
    id: 'newzealand',
    name: 'Nova Zelândia',
    imageSrc: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
    cityCount: 3
  },
  {
    id: 'malta',
    name: 'Malta',
    imageSrc: 'https://images.unsplash.com/photo-1513543806865-85e29a7c0352?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cityCount: 2
  },
  {
    id: 'southafrica',
    name: 'África do Sul',
    imageSrc: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    cityCount: 2
  },
];

const DestinationSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Destinos Disponíveis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossas opções de acomodações em destinos populares para intercâmbio ao redor do mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link 
              key={destination.id} 
              to={`/destinations/${destination.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.imageSrc} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-semibold">{destination.name}</h3>
                    <p className="text-white/80 text-sm">{destination.cityCount} cidades</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
