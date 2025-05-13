
import React from 'react';
import { CheckCircle, ShieldCheck, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={48} className="text-primary" />,
    title: "Acomodações Verificadas",
    description: "Todas as acomodações são verificadas pessoalmente pela nossa equipe para garantir qualidade e segurança."
  },
  {
    icon: <ShieldCheck size={48} className="text-primary" />,
    title: "Reserva Segura",
    description: "Processo de reserva 100% seguro e transparente, sem taxas ocultas ou surpresas."
  },
  {
    icon: <Clock size={48} className="text-primary" />,
    title: "Resposta Rápida",
    description: "Receba confirmação e informações detalhadas sobre sua acomodação em até 24 horas."
  },
  {
    icon: <Headphones size={48} className="text-primary" />,
    title: "Suporte Personalizado",
    description: "Atendimento exclusivo em português para ajudar em todas as etapas do seu processo de intercâmbio."
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Por que Reservar Conosco?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Na AcomodaFácil, nos dedicamos a oferecer o melhor serviço para estudantes internacionais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
