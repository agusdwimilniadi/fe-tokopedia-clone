import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (baseUrl, token = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: token ? token : '',
    },
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/');
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createItem = async (newItem) => {
    try {
      const response = await axiosInstance.post('/', newItem);
      setData([...data, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const response = await axiosInstance.put(`/${id}`, updatedItem);
      setData(data.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      setError(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    fetchData,
  };
};

export default useApi;
