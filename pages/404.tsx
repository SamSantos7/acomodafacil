import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-secondary mb-4">404 - Página Não Encontrada</h1>
      <p className="text-gray-600 mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link href="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
        Voltar para a página inicial
      </Link>
    </div>
  );
}