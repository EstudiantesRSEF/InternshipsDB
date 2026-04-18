module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
  /* Se comenta pq se quiere acceder a main desde el proy de Vercel con mock Firebase
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://estudiantes.rsef.es/internshipsdb-maintenance/:path*',
        permanent: false,
      },
    ]
  },
  */
}