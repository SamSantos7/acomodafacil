
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const accommodations = [
  {
    id: 'acc1',
    name: 'Student Residence Toronto',
    location: 'Downtown Toronto',
    city: 'Toronto',
    country: 'Canada',
    currency: 'CAD',
    imageSrc: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    weeklyPrice: 250,
    rating: 4.8,
    type: 'residence',
    distanceToCenter: 1.2
  },
  {
    id: 'acc2',
    name: 'Dublin Student Apartments',
    location: 'Temple Bar',
    city: 'Dublin',
    country: 'Ireland',
    currency: 'EUR',
    imageSrc: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    weeklyPrice: 275,
    rating: 4.5,
    type: 'apartment',
    distanceToCenter: 0.8
  },
  {
    id: 'acc3',
    name: 'Sydney Harbor View',
    location: 'Sydney CBD',
    city: 'Sydney',
    country: 'Australia',
    currency: 'AUD',
    imageSrc: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    weeklyPrice: 310,
    rating: 4.9,
    type: 'apartment',
    distanceToCenter: 0.5
  },
  {
    id: 'acc4',
    name: 'London Student Home',
    location: 'Westminster',
    city: 'London',
    country: 'England',
    currency: 'GBP',
    imageSrc: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    weeklyPrice: 350,
    rating: 4.7,
    type: 'homestay',
    distanceToCenter: 1.5
  }
];

const Accommodations = () => {
  const getAccommodationTypeLabel = (type: string) => {
    switch (type) {
      case 'residence':
        return 'Residência';
      case 'apartment':
        return 'Apartamento';
      case 'homestay':
        return 'Homestay';
      default:
        return 'Acomodação';
    }
  };

  const uniqueCountries = [...new Set(accommodations.map(acc => acc.country))];
  const uniqueCities = [...new Set(accommodations.map(acc => acc.city))];

  return (
    <div>
      <Navbar />
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary mb-4">Todas as Acomodações</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossa seleção completa de acomodações estudantis premium em destinos internacionais.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold text-secondary mb-4">Filtros</h3>
                
                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Preço por Semana</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">200</span>
                    <span className="text-sm text-gray-500">500+</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full w-3/4"></div>
                  </div>
                </div>
                
                {/* Accommodation Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Tipo de Acomodação</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="residence" className="mr-2" />
                      <label htmlFor="residence" className="text-gray-700">Residência Estudantil</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="apartment" className="mr-2" />
                      <label htmlFor="apartment" className="text-gray-700">Apartamento</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="homestay" className="mr-2" />
                      <label htmlFor="homestay" className="text-gray-700">Homestay</label>
                    </div>
                  </div>
                </div>
                
                {/* Distance */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Distância do Centro</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">0 km</span>
                    <span className="text-sm text-gray-500">20+ km</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full w-1/2"></div>
                  </div>
                </div>

                {/* Country Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">País</h4>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Todos os países</option>
                    {uniqueCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Cidade</h4>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Todas as cidades</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <Button className="w-full">Aplicar Filtros</Button>
              </div>
            </div>

            {/* Accommodations List */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.map((accommodation) => (
                  <Link 
                    key={accommodation.id}
                    to={`/accommodation/${accommodation.id}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full card-hover">
                      <div className="relative h-48">
                        <img 
                          src={accommodation.imageSrc}
                          alt={accommodation.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-primary hover:bg-primary">
                            {getAccommodationTypeLabel(accommodation.type)}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <MapPin size={16} className="text-primary mr-1" />
                          <span className="text-sm text-gray-500">
                            {accommodation.location} ({accommodation.distanceToCenter} km do centro)
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{accommodation.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{accommodation.city}, {accommodation.country}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                            <span className="text-sm font-medium">{accommodation.rating}</span>
                          </div>
                          <div>
                            <span className="text-primary font-semibold">{accommodation.currency} {accommodation.weeklyPrice}</span>
                            <span className="text-sm text-gray-500">/semana</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accommodations;
