/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Certifique-se de que a configuração de páginas está correta
  // Se você estiver usando o diretório src/pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig