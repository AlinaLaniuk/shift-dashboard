import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

export const shiftApi = {
  getShiftData: async () => {
    try {
      const { data } = await axios.get('/shift');
      return data;
    } catch (err) {
      console.error('API error', err);
      throw err;
    }
  },

  updateComment: async (payload?: unknown) => {
    const { data } = await api.patch('/shift', payload);
    return data;
  },
};
