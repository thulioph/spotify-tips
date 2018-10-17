import axios from 'axios';

export const requestPromise = (url) => {
  if (!url) return false;

  return new Promise((resolve, reject) => {
    axios.get(url).then(success => resolve(success)).catch(err => reject(err));
  });
};