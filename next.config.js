/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Certifique-se de que a configuração de páginas está correta
  // Se você estiver usando o diretório src/pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  webpack: (config, { isServer }) => {
    // Aumenta o limite de aviso de tamanho do chunk para 1MB (ou o valor que preferir)
    config.performance = {
      ...config.performance,
      maxEntrypointSize: 1000000, // 1MB
      maxAssetSize: 1000000 // 1MB
    };
    
    return config;
  },
}

module.exports = nextConfig