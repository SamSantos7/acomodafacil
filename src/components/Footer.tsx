
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-white font-bold text-xl">
                Acomoda<span className="text-primary">Fácil</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Conectando estudantes internacionais a acomodações em todo o mundo com atendimento personalizado e reserva fácil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Destinos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* All Accommodations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acomodações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/accommodations" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Todas as Acomodações
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-gray-300 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">booking@acomodafacil.com.br</span>
              </li>
              <li className="flex items-start">
                <Globe size={18} className="mr-2 text-gray-300 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">www.acomodafacil.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} AcomodaFácil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
