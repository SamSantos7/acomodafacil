
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Política de Privacidade</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A AcomodaFácil está comprometida com a proteção da sua privacidade.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="prose max-w-none">
            <p className="mb-6">
              Última atualização: Maio de 2023
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">1. Informações que Coletamos</h2>
            <p className="mb-4">
              Coletamos informações quando você se registra em nosso site, faz uma reserva, 
              preenche um formulário ou interage com nossa plataforma. As informações podem incluir:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Nome, endereço de e-mail e informações de contato</li>
              <li>Dados demográficos como país de origem e idioma preferido</li>
              <li>Informações de pagamento (processadas por gateways de pagamento seguros)</li>
              <li>Cópias de documentos de identificação necessários para verificação</li>
              <li>Detalhes sobre suas preferências e requisitos de acomodação</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">2. Como Usamos suas Informações</h2>
            <p className="mb-4">
              As informações que coletamos podem ser usadas para:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Processar reservas e transações</li>
              <li>Personalizar sua experiência e atender às suas necessidades individuais</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Entrar em contato com você sobre sua conta ou reservas</li>
              <li>Enviar e-mails periódicos, incluindo informações e atualizações</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">3. Proteção de Informações</h2>
            <p className="mb-6">
              Implementamos uma variedade de medidas de segurança para manter a segurança de suas 
              informações pessoais quando você faz uma reserva, envia ou acessa suas informações pessoais. 
              Utilizamos criptografia avançada para proteger informações sensíveis transmitidas online.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">4. Uso de Cookies</h2>
            <p className="mb-6">
              Nosso site usa cookies para melhorar a experiência do usuário. Os cookies são pequenos 
              arquivos que um site ou seu provedor de serviços transfere para o disco rígido do seu 
              computador através do navegador da web (se você permitir) que permite que os sistemas do 
              site reconheçam seu navegador e capturem e lembrem determinadas informações.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">5. Divulgação a Terceiros</h2>
            <p className="mb-6">
              Não vendemos, comercializamos ou transferimos suas informações pessoalmente identificáveis 
              para terceiros, exceto para provedores de acomodação com os quais você está fazendo uma reserva. 
              Isso não inclui terceiros confiáveis que nos auxiliam na operação do nosso site, condução 
              de nossos negócios ou no atendimento a você, desde que essas partes concordem em manter 
              essas informações confidenciais.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">6. Seus Direitos</h2>
            <p className="mb-4">
              Você tem os seguintes direitos relacionados às suas informações pessoais:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Direito de acessar suas informações pessoais</li>
              <li>Direito de retificar informações imprecisas</li>
              <li>Direito de excluir suas informações pessoais ("direito de ser esquecido")</li>
              <li>Direito de restringir o processamento de suas informações pessoais</li>
              <li>Direito à portabilidade de dados</li>
              <li>Direito de se opor ao processamento de suas informações pessoais</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">7. Alterações na Política de Privacidade</h2>
            <p className="mb-6">
              Podemos atualizar esta política de privacidade periodicamente. Quando o fizermos, 
              atualizaremos a data de "última atualização" no topo desta página. Recomendamos que 
              você verifique esta página periodicamente para estar ciente de quaisquer alterações.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">8. Como Entrar em Contato Conosco</h2>
            <p className="mb-6">
              Se você tiver dúvidas sobre esta política de privacidade, você pode entrar em contato conosco:
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li>Por e-mail: privacidade@acomodafacil.com</li>
              <li>Por telefone: +55 11 9999-9999</li>
              <li>Por correio: Av. Paulista, 1000, São Paulo - SP, 01310-100, Brasil</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
