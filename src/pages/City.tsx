import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const cityData = {
  'toronto': {
    id: 'toronto',
    name: 'Toronto',
    countryId: 'canada',
    countryName: 'Canadá',
    description: 'Toronto é a maior cidade do Canadá e um centro multicultural vibrante, oferecendo uma excelente qualidade de vida para estudantes internacionais.',
    imageSrc: 'https://images.unsplash.com/photo-1542704792-e30dac463c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: [
        {
          id: 'acc1',
          name: 'Student Residence Toronto',
          location: 'Downtown Toronto',
          imageSrc: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          price: 950,
          rating: 4.8,
          type: 'residence',
          distanceToCenter: 1.2
        },
        {
          id: 'acc5',
          name: 'Maple Leaf Student Housing',
          location: 'North York',
          imageSrc: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          price: 850,
          rating: 4.5,
          type: 'residence',
          distanceToCenter: 7.4
        },
        {
          id: 'acc6',
          name: 'CN Tower View Apartments',
          location: 'Entertainment District',
          imageSrc: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          price: 1150,
          rating: 4.9,
          type: 'apartment',
          distanceToCenter: 0.6
        },
        {
          id: 'acc7',
          name: 'Yorkville Student Suites',
          location: 'Yorkville',
          imageSrc: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          price: 1250,
          rating: 4.7,
          type: 'apartment',
          distanceToCenter: 2.3
        },
        {
          id: 'acc8',
          name: 'Canadian Family Homestay',
          location: 'Etobicoke',
          imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          price: 800,
          rating: 4.6,
          type: 'homestay',
          distanceToCenter: 15.2
        }
      ]
  },
  'vancouver': {
    id: 'vancouver',
    name: 'Vancouver',
    countryId: 'canada',
    countryName: 'Canadá',
    description: 'Vancouver é conhecida por sua extraordinária beleza natural e qualidade de vida excepcional.',
    imageSrc: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
    accommodations: [
      {
        id: 'acc9',
        name: 'Downtown Vancouver Apartments',
        location: 'Downtown Vancouver',
        imageSrc: 'https://images.unsplash.com/photo-1540518614846-7e627e48c658?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80',
        price: 1300,
        rating: 4.7,
        type: 'apartment',
        distanceToCenter: 0.5
      },
      {
        id: 'acc10',
        name: 'Kitsilano Beachside Residences',
        location: 'Kitsilano',
        imageSrc: 'https://images.unsplash.com/photo-1568605114967-8a59ba35e9e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        price: 1100,
        rating: 4.5,
        type: 'residence',
        distanceToCenter: 5.1
      },
      {
        id: 'acc11',
        name: 'Gastown Lofts',
        location: 'Gastown',
        imageSrc: 'https://images.unsplash.com/photo-1541188392-72ca2f8e5c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        price: 1400,
        rating: 4.9,
        type: 'apartment',
        distanceToCenter: 1.2
      },
      {
        id: 'acc12',
        name: 'UBC Student Housing',
        location: 'University of British Columbia',
        imageSrc: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        price: 900,
        rating: 4.6,
        type: 'residence',
        distanceToCenter: 12.5
      },
      {
        id: 'acc13',
        name: 'West End Family Homestay',
        location: 'West End',
        imageSrc: 'https://images.unsplash.com/photo-1606075228444-3af045651698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        price: 850,
        rating: 4.4,
        type: 'homestay',
        distanceToCenter: 3.8
      }
    ]
  },
  'montreal': {
    id: 'montreal',
    name: 'Montreal',
    countryId: 'canada',
    countryName: 'Canadá',
    description: 'Montreal é uma cidade única que combina charme europeu com modernidade norte-americana, oferecendo uma experiência bilíngue única.',
    imageSrc: 'https://images.unsplash.com/photo-1519178614-68673b201f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'calgary': {
    id: 'calgary',
    name: 'Calgary',
    countryId: 'canada',
    countryName: 'Canadá',
    description: 'Calgary é uma cidade moderna e dinâmica, conhecida por sua qualidade de vida e proximidade com as Montanhas Rochosas.',
    imageSrc: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'dublin': {
    id: 'dublin',
    name: 'Dublin',
    countryId: 'ireland',
    countryName: 'Irlanda',
    description: 'Dublin é uma cidade histórica e acolhedora, combinando tradição com modernidade e oferecendo uma experiência estudantil única.',
    imageSrc: 'https://images.unsplash.com/photo-1564959130024-95a988ac8d14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'cork': {
    id: 'cork',
    name: 'Cork',
    countryId: 'ireland',
    countryName: 'Irlanda',
    description: 'Cork é a segunda maior cidade da Irlanda, conhecida por sua rica história e vibrante cena cultural e estudantil.',
    imageSrc: 'https://images.unsplash.com/photo-1591535554317-f3905146df53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'galway': {
    id: 'galway',
    name: 'Galway',
    countryId: 'ireland',
    countryName: 'Irlanda',
    description: 'Galway é uma cidade costeira encantadora, famosa por seus festivais culturais e ambiente estudantil acolhedor.',
    imageSrc: 'https://images.unsplash.com/photo-1591311337241-cecfd26f1da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'sydney': {
    id: 'sydney',
    name: 'Sydney',
    countryId: 'australia',
    countryName: 'Austrália',
    description: 'Sydney é a maior cidade da Austrália, oferecendo uma combinação única de praias deslumbrantes e oportunidades educacionais de classe mundial.',
    imageSrc: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'melbourne': {
    id: 'melbourne',
    name: 'Melbourne',
    countryId: 'australia',
    countryName: 'Austrália',
    description: 'Melbourne é conhecida por sua excelente qualidade de vida, diversidade cultural e vibrante cena artística.',
    imageSrc: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'brisbane': {
    id: 'brisbane',
    name: 'Brisbane',
    countryId: 'australia',
    countryName: 'Austrália',
    description: 'Brisbane oferece um clima subtropical perfeito e uma atmosfera relaxada, ideal para estudantes internacionais.',
    imageSrc: 'https://images.unsplash.com/photo-1452859030914-b44b89314cef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'gold-coast': {
    id: 'gold-coast',
    name: 'Gold Coast',
    countryId: 'australia',
    countryName: 'Austrália',
    description: 'Gold Coast é conhecida por sua tranquilidade e excelente sistema educacional, além de belas praias e regiões vinícolas.',
    imageSrc: 'https://images.unsplash.com/photo-1530088460146-70396bd8bdf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'st-julians': {
    id: 'st-julians',
    name: 'St. Julians',
    countryId: 'malta',
    countryName: 'Malta',
    description: 'St. Julians é um destino turístico popular em Malta, oferecendo uma combinação perfeita de estudo e lazer.',
    imageSrc: 'https://images.unsplash.com/photo-1589489873663-42232ab0e1aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'sliema': {
    id: 'sliema',
    name: 'Sliema',
    countryId: 'malta',
    countryName: 'Malta',
    description: 'Sliema é uma cidade costeira moderna em Malta, ideal para estudantes que buscam combinar estudos com um estilo de vida mediterrâneo.',
    imageSrc: 'https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'cape-town': {
    id: 'cape-town',
    name: 'Cape Town',
    countryId: 'south-africa',
    countryName: 'África do Sul',
    description: 'Cape Town é uma das cidades mais bonitas do mundo, oferecendo uma experiência única de estudo com paisagens deslumbrantes.',
    imageSrc: 'https://images.unsplash.com/photo-1578868837155-beb53b4ce75f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'auckland': {
    id: 'auckland',
    name: 'Auckland',
    countryId: 'new-zealand',
    countryName: 'Nova Zelândia',
    description: 'Auckland é a maior cidade da Nova Zelândia, oferecendo uma qualidade de vida excepcional e instituições de ensino de primeira linha.',
    imageSrc: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'queenstown': {
    id: 'queenstown',
    name: 'Queenstown',
    countryId: 'new-zealand',
    countryName: 'Nova Zelândia',
    description: 'Queenstown é conhecida como a capital mundial dos esportes de aventura, oferecendo uma experiência única de estudo.',
    imageSrc: 'https://images.unsplash.com/photo-1589485257285-44c0b83d7e89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'christchurch': {
    id: 'christchurch',
    name: 'Christchurch',
    countryId: 'new-zealand',
    countryName: 'Nova Zelândia',
    description: 'Christchurch é uma cidade em constante renovação, oferecendo excelentes oportunidades educacionais em um ambiente único.',
    imageSrc: 'https://images.unsplash.com/photo-1579012175174-48f28b40c3b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'dubai': {
    id: 'dubai',
    name: 'Dubai',
    countryId: 'uae',
    countryName: 'Emirados Árabes Unidos',
    description: 'Dubai é uma cidade futurística que oferece uma experiência educacional única em um ambiente multicultural e inovador.',
    imageSrc: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'london': {
    id: 'london',
    name: 'Londres',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Londres é uma das cidades mais vibrantes do mundo, oferecendo infinitas oportunidades educacionais e culturais.',
    imageSrc: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'brighton': {
    id: 'brighton',
    name: 'Brighton',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Brighton é uma cidade costeira vibrante, conhecida por sua atmosfera jovem e criativa.',
    imageSrc: 'https://images.unsplash.com/photo-1583425875562-a0c0514ea4af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'cambridge': {
    id: 'cambridge',
    name: 'Cambridge',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Cambridge é sinônimo de excelência acadêmica, oferecendo uma experiência educacional em uma cidade histórica.',
    imageSrc: 'https://images.unsplash.com/photo-1597586014756-30234ad8dd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'manchester': {
    id: 'manchester',
    name: 'Manchester',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Manchester é uma cidade dinâmica com rica história industrial e vibrante cena cultural e estudantil.',
    imageSrc: 'https://images.unsplash.com/photo-1611410887619-f5a1f31fcb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'liverpool': {
    id: 'liverpool',
    name: 'Liverpool',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Liverpool é famosa por sua história musical e cultural, oferecendo uma experiência estudantil única.',
    imageSrc: 'https://images.unsplash.com/photo-1563361900-36c0d602e02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'oxford': {
    id: 'oxford',
    name: 'Oxford',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Oxford é uma cidade universitária histórica, oferecendo uma experiência acadêmica incomparável.',
    imageSrc: 'https://images.unsplash.com/photo-1590510296369-ce07e3ad784c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  },
  'bournemouth': {
    id: 'bournemouth',
    name: 'Bournemouth',
    countryId: 'england',
    countryName: 'Inglaterra',
    description: 'Bournemouth é uma cidade costeira encantadora, popular entre estudantes internacionais por suas praias e qualidade de vida.',
    imageSrc: 'https://images.unsplash.com/photo-1599739490570-65ce2b0bddd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    accommodations: []
  }
};

const City = () => {
  const { countryId, cityId } = useParams<{ countryId: string; cityId: string }>();
  const city = cityData[cityId as keyof typeof cityData];

  if (!city) {
    return <div>City not found</div>;
  }

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

  return (
    <div>
      <Navbar />

      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${city.imageSrc}')`,
        }}
      >
        <div className="absolute inset-0 bg-secondary bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end pb-8">
          <div className="flex items-center text-white mb-2">
            <Link to={`/destinations/${countryId}`} className="flex items-center hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              <span>{city.countryName}</span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{city.name}</h1>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold text-secondary mb-3">Sobre {city.name}</h2>
            <p className="text-gray-600">{city.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold text-secondary mb-4">Filtros</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Preço por mês</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">$500</span>
                    <span className="text-sm text-gray-500">$2000+</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full w-3/4"></div>
                  </div>
                </div>
                
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
                
                <Button className="w-full">Aplicar Filtros</Button>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-bold text-secondary mb-6">Acomodações em {city.name}</h2>
              
              <div className="space-y-6">
                {city.accommodations.map((accommodation) => (
                  <Link 
                    key={accommodation.id} 
                    to={`/accommodation/${accommodation.id}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={accommodation.imageSrc} 
                          alt={accommodation.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">{accommodation.name}</h3>
                            <Badge className="bg-primary hover:bg-primary">
                              {getAccommodationTypeLabel(accommodation.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center mb-4">
                            <MapPin size={16} className="text-primary mr-1" />
                            <span className="text-sm text-gray-500">{accommodation.location} ({accommodation.distanceToCenter} km do centro)</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                            <span className="text-sm font-medium">{accommodation.rating}</span>
                          </div>
                          <div>
                            <span className="text-primary font-semibold text-lg">${accommodation.price}</span>
                            <span className="text-sm text-gray-500">/mês</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-10 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-2" />
                  <p className="text-gray-500">Mapa interativo com localização das acomodações</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default City;