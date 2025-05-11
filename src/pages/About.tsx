
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Sobre a AcomodaFácil</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Conectando estudantes internacionais a acomodações de qualidade desde 2020.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-secondary mb-6">Nossa Missão</h2>
              <p className="text-gray-600 mb-4">
                A AcomodaFácil nasceu da necessidade de simplificar a vida de estudantes internacionais, 
                oferecendo uma plataforma segura e confiável para encontrar acomodações de qualidade ao redor do mundo.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa missão é proporcionar uma experiência tranquila e sem complicações para estudantes 
                que desejam morar no exterior, garantindo que possam focar no que realmente importa: 
                seus estudos e a experiência cultural.
              </p>
            </div>
            <div className="bg-gray-200 h-72 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Estudantes internacionais"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 bg-gray-200 h-72 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Nossa equipe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold text-secondary mb-6">Nossa Equipe</h2>
              <p className="text-gray-600 mb-4">
                Somos uma equipe multicultural de profissionais apaixonados por viagens, educação 
                e tecnologia. Muitos de nós já foram estudantes internacionais e entendem os desafios 
                que essa jornada apresenta.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa diversidade é nossa força, combinando experiências globais para criar uma 
                plataforma que verdadeiramente atende às necessidades dos estudantes ao redor do mundo.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-secondary mb-8 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-t-4 border-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Qualidade</h3>
                  <p className="text-gray-600">
                    Garantimos que todas as acomodações atendam a rigorosos padrões de qualidade e conforto.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Transparência</h3>
                  <p className="text-gray-600">
                    Informações claras sobre acomodações, sem surpresas ou custos ocultos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Segurança</h3>
                  <p className="text-gray-600">
                    Priorizamos a segurança dos estudantes em todas as nossas operações e escolhas de parceiros.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Suporte</h3>
                  <p className="text-gray-600">
                    Oferecemos suporte multilíngue para auxiliar em cada etapa da jornada do estudante.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-6">Nossa História</h2>
            <p className="text-gray-600 mb-4">
              Fundada em 2020 por ex-estudantes internacionais, a AcomodaFácil surgiu da experiência 
              pessoal de seus fundadores com os desafios de encontrar moradia adequada no exterior.
            </p>
            <p className="text-gray-600 mb-4">
              O que começou como um pequeno projeto para ajudar estudantes brasileiros na Irlanda, 
              rapidamente se expandiu para outros países populares entre estudantes internacionais.
            </p>
            <p className="text-gray-600 mb-4">
              Hoje, orgulhamo-nos de ter ajudado milhares de estudantes a encontrar seu novo lar 
              temporário, facilitando uma das partes mais estressantes da experiência de estudar no exterior.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
