import React from 'react';
import '../index.css'; // Ajuste o caminho conforme necessário para seu arquivo CSS principal

export const metadata = {
  title: 'AcomodaFácil',
  description: 'Encontre acomodações perfeitas para sua estadia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}