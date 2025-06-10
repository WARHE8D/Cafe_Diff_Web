//for server API calls
const httpClient = require('./httpClient');

const getHome = async () => {
  const response = await httpClient.get('/auth/');
  return response.data;
};

module.exports = getHome;