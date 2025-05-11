import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Destination {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  cities: Array<{
    id: string;
    name: string;
    accommodationCount: number;
    imageSrc: string;
  }>;
}

const destinations: Destination[] = [
  {
    id: 'canada',
    name: 'Canadá',
    description: 'Descubra a beleza das paisagens canadenses e a excelente qualidade de vida enquanto estuda em cidades modernas e acolhedoras.',
    imageSrc: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cities: [
      {
        id: 'toronto',
        name: 'Toronto',
        accommodationCount: 24,
        imageSrc: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
      },
      {
        id: 'vancouver',
        name: 'Vancouver',
        accommodationCount: 18,
        imageSrc: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
      },
      {
        id: 'montreal',
        name: 'Montreal',
        accommodationCount: 15,
        imageSrc: 'https://images.unsplash.com/photo-1519178614-68673b201f36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
      },
      {
        id: 'calgary',
        name: 'Calgary',
        accommodationCount: 12,
        imageSrc: 'https://images.unsplash.com/photo-1600773612661-f97d036b7044?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
      }
    ]
  },
  {
    id: 'ireland',
    name: 'Irlanda',
    description: 'Estude inglês em um país acolhedor, com paisagens deslumbrantes e uma rica tradição cultural, perfeito para estudantes internacionais.',
    imageSrc: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    cities: [
      {
        id: 'dublin',
        name: 'Dublin',
        accommodationCount: 22,
        imageSrc: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
      },
      {
        id: 'cork',
        name: 'Cork',
        accommodationCount: 14,
        imageSrc: 'https://images.unsplash.com/photo-1601920546638-5b6eaabd5b2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
      },
      {
        id: 'galway',
        name: 'Galway',
        accommodationCount: 10,
        imageSrc: 'https://images.unsplash.com/photo-1633352615955-f0c99e8b8079?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
      }
    ]
  },
  {
    id: 'australia',
    name: 'Austrália',
    description: 'Combine estudos de alta qualidade com um estilo de vida descontraído e proximidade a praias paradisíacas neste destino icônico para estudantes.',
    imageSrc: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    cities: [
      {
        id: 'sydney',
        name: 'Sydney',
        accommodationCount: 28,
        imageSrc: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
      },
      {
        id: 'melbourne',
        name: 'Melbourne',
        accommodationCount: 25,
        imageSrc: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1266&q=80'
      },
      {
        id: 'brisbane',
        name: 'Brisbane',
        accommodationCount: 18,
        imageSrc: 'https://images.unsplash.com/photo-1600725935160-f67ee4f6258a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
      },
      {
        id: 'gold-coast',
        name: 'Gold Coast',
        accommodationCount: 12,
        imageSrc: 'https://images.unsplash.com/photo-1610425969509-839dda9c14b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1356&q=80'
      }
    ]
  },
  {
    id: 'malta',
    name: 'Malta',
    description: 'Estude inglês em uma ilha mediterrânea com clima agradável o ano todo e rica história cultural.',
    imageSrc: 'https://images.unsplash.com/photo-1514921978085-910cb0864335?ixlib=rb-4.0.3',
    cities: [
      {
        id: 'st-julians',
        name: 'St. Julians',
        accommodationCount: 15,
        imageSrc: 'https://images.unsplash.com/photo-1589489873663-42232ab0e1aa?ixlib=rb-4.0.3'
      },
      {
        id: 'sliema',
        name: 'Sliema',
        accommodationCount: 12,
        imageSrc: 'https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    id: 'south-africa',
    name: 'África do Sul',
    description: 'Experimente uma cultura única e paisagens deslumbrantes enquanto estuda em uma das cidades mais vibrantes da África.',
    imageSrc: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3',
    cities: [
      {
        id: 'cape-town',
        name: 'Cape Town',
        accommodationCount: 20,
        imageSrc: 'https://images.unsplash.com/photo-1578868837155-beb53b4ce75f?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    id: 'new-zealand',
    name: 'Nova Zelândia',
    description: 'Combine educação de qualidade com aventura e paisagens naturais de tirar o fôlego.',
    imageSrc: 'https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3',
    cities: [
      {
        id: 'auckland',
        name: 'Auckland',
        accommodationCount: 25,
        imageSrc: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3'
      },
      {
        id: 'christchurch',
        name: 'Christchurch',
        accommodationCount: 18,
        imageSrc: 'https://images.unsplash.com/photo-1579012175174-48f28b40c3b6?ixlib=rb-4.0.3'
      },
      {
        id: 'queenstown',
        name: 'Queenstown',
        accommodationCount: 15,
        imageSrc: 'https://images.unsplash.com/photo-1589485257285-44c0b83d7e89?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    id: 'uae',
    name: 'Emirados Árabes Unidos',
    description: 'Estude em uma das cidades mais modernas do mundo, onde tradição e futuro se encontram.',
    imageSrc: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3',
    cities: [
      {
        id: 'dubai',
        name: 'Dubai',
        accommodationCount: 30,
        imageSrc: 'https://images.unsplash.com/photo-1546412414-e1885259563a?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    id: 'england',
    name: 'Inglaterra',
    description: 'Estude na terra da língua inglesa, com tradição acadêmica secular e cidades históricas.',
    imageSrc: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3',
    cities: [
      {
        id: 'london',
        name: 'Londres',
        accommodationCount: 45,
        imageSrc: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3'
      },
      {
        id: 'brighton',
        name: 'Brighton',
        accommodationCount: 20,
        imageSrc: 'https://images.unsplash.com/photo-1589805180447-02b211f8bc3b?ixlib=rb-4.0.3'
      },
      {
        id: 'cambridge',
        name: 'Cambridge',
        accommodationCount: 18,
        imageSrc: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3'
      },
      {
        id: 'manchester',
        name: 'Manchester',
        accommodationCount: 25,
        imageSrc: 'https://images.unsplash.com/photo-1611895453688-1450aa7e20f0?ixlib=rb-4.0.3'
      },
      {
        id: 'liverpool',
        name: 'Liverpool',
        accommodationCount: 20,
        imageSrc: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.0.3'
      },
      {
        id: 'oxford',
        name: 'Oxford',
        accommodationCount: 15,
        imageSrc: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3'
      },
      {
        id: 'bournemouth',
        name: 'Bournemouth',
        accommodationCount: 12,
        imageSrc: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-4.0.3'
      }
    ]
  }
];

const Destinations = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Nossos Destinos</h1>
            <p className="text-lg text-gray-600">
              Explore os melhores destinos para estudar e viver ao redor do mundo.
            </p>
          </div>

          {destinations.map((destination) => (
            <div key={destination.id} className="mb-16">
              <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
                <div className="lg:w-1/3">
                  <img 
                    src={destination.imageSrc} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 lg:w-2/3">
                  <h2 className="text-2xl font-bold text-secondary mb-3">{destination.name}</h2>
                  <p className="text-gray-600 mb-6">{destination.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.cities.map((city) => (
                      <Link 
                        key={city.id} 
                        to={`/city/${destination.id}/${city.id}`}
                        className="group"
                      >
                        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm card-hover">
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={city.imageSrc} 
                              alt={city.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800">{city.name}</h3>
                            <p className="text-sm text-gray-500">{city.accommodationCount} acomodações</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destinations;