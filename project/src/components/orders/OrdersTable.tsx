import React from 'react';
import { motion } from 'framer-motion';
import { Order } from '../../services/api';

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  onOrderClick: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, loading, onOrderClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/50 divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
                </div>
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <motion.tr
                key={order.order_id}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                onClick={() => onOrderClick(order.order_id)}
                className="cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.order_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.order_placed_timestamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.order_status === 'Open' ? 'bg-blue-100 text-blue-800' :
                    order.order_status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.order_status}
                  </span>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;