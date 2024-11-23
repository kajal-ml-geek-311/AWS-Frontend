import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const OrdersHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Orders
      </motion.h1>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-accent-600"
      >
        <PlusIcon className="h-5 w-5" />
        <span>New Order</span>
      </motion.button>
    </div>
  );
};

export default OrdersHeader;