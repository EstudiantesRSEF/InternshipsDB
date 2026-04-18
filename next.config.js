module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() { // Redirección mientras trabajamos en mejorar la DB
    return [
      {
        source: '/:path*',
        destination: 'https://estudiantes.rsef.es/internshipsdb-maintenance/:path*',
        permanent: false,
      },
    ]
  },
}

