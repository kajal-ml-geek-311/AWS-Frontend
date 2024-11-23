import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchOrders, Order, ApiError } from '../services/api';
import Pagination from '../components/common/Pagination';
import OrderDetails from '../components/orders/OrderDetails';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrdersFilters from '../components/orders/OrdersFilters';
import OrdersTable from '../components/orders/OrdersTable';

const Orders = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(data.length / prev.itemsPerPage)
      }));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to load orders. Please try again later.');
      console.error('Error loading orders:', apiError);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || order.order_status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const paginatedOrders = filteredOrders.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  return (
    <div className="space-y-6">
      <OrdersHeader />
      
      <OrdersFilters 
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="glass-card">
        {error ? (
          <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <OrdersTable
              orders={paginatedOrders}
              loading={loading}
              onOrderClick={handleRowClick}
            />

            {!loading && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
              />
            )}
          </>
        )}
      </div>

      {showDetails && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Orders;