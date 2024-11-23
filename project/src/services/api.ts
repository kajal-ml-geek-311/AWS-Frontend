import axios, { AxiosError } from 'axios';

export interface Order {
  order_id: string;
  order_status: string;
  order_placed_timestamp: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

const api = axios.create({
  baseURL: 'http://0.0.0.0:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    const apiError: ApiError = {
      message: 'An error occurred while fetching orders'
    };

    if (error instanceof AxiosError) {
      apiError.message = error.response?.data?.message || 
                        'Unable to connect to the server. Please check your connection and try again.';
      apiError.status = error.response?.status;
    }

    throw apiError;
  }
};