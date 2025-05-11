
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 hero-gradient"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-secondary bg-opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Seu lar no intercâmbio começa aqui
          </h1>
          <p className="text-xl text-white mb-8 animate-fade-in">
            Encontre acomodações estudantis em destinos internacionais com atendimento personalizado e reserva simplificada.
          </p>

          {/* Search form */}
          <div className="bg-white p-4 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destino
                </label>
                <select 
                  id="destination" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione um país</option>
                  <option value="canada">Canadá</option>
                  <option value="ireland">Irlanda</option>
                  <option value="australia">Austrália</option>
                  <option value="england">Inglaterra</option>
                  <option value="dubai">Emirados Arabes Unidos</option>
                  <option value="newzealand">Nova Zelândia</option>
                  <option value="malta">Malta</option>
                  <option value="southafrica">África do Sul</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <select 
                  id="city" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione uma cidade</option>
		  <option value="dubai">Dubai</option>
                  <option value="toronto">Toronto</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="dublin">Dublin</option>
                  <option value="sydney">Sydney</option>
                  <option value="london">Londres</option>
                </select>
              </div>
              <div className="md:self-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Search size={18} className="mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
