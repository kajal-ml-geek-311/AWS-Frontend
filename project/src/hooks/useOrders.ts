import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchOrders, selectOrder, setPage, setFilters } from '../store/slices/orderSlice';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    orders, 
    loading, 
    error, 
    selectedOrderId,
    pagination,
    filters 
  } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSelectOrder = (orderId: string) => {
    dispatch(selectOrder(orderId));
  };

  const handleSetPage = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSetFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setFilters(newFilters));
  };

  return {
    orders,
    selectedOrder: selectedOrderId ? orders[selectedOrderId] : null,
    loading,
    error,
    pagination,
    filters,
    selectOrder: handleSelectOrder,
    setPage: handleSetPage,
    setFilters: handleSetFilters,
  };
};