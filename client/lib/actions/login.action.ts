'use server';

import axios from 'axios';

export async function loginAction(email: string) {
  try {
    const response = await axios.post('http://tickets.dev/api/users/signup', {
      email,
      password: 'aaaaaa',
    });
    return response.data;
  } catch (error) {
    // Ceci est important :
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error('Unexpected error:', error);
    }

    throw new Error('Erreur lors de la requête');
  }
}
