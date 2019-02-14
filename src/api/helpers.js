import axios from 'axios';

export const requestPromise = (url) => {
  if (!url) return false;

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  }

  const newUrl = `https://cors-anywhere.herokuapp.com/${url}`;

  return new Promise((resolve, reject) => {
    axios.get(newUrl, config).then(success => resolve(success)).catch(err => reject(err));
  });
};