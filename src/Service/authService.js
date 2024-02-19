import axios from 'axios';
import apiConfig from '../env'
export const signIn = async (userName, password) => {

  try {
    console.log(apiConfig.baseUrl);
    const loginEndpoint = '/login';
    console.log(`http://10.1.1.15:5000/login`)
    
    const response = await axios.post(`${apiConfig.baseUrl}${loginEndpoint}`, { email: userName, password: password });
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
};