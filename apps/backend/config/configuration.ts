export default () => ({
  ports: parseInt(process.env.PORT || '3000', 10),
  services: {
    mobula: { apiKey: process.env.MOBULA_API_KEY },
  },
});
