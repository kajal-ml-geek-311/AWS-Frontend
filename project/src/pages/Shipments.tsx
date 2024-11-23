import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import NewShipmentModal from '../components/shipping/NewShipmentModal';
import ShippingFilters from '../components/shipping/ShippingFilters';
import { useShipments } from '../hooks/useShipments';
import Pagination from '../components/common/Pagination';
import DateRangeFilter from '../components/common/DateRangeFilter';
import ShipmentDetails from '../components/shipping/ShipmentDetails';
import ShipmentCard from '../components/shipping/ShipmentCard';

const Shipments = () => {
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const { shipments, loading, pagination, filters, setPage, setFilters } = useShipments();

  const handleShipmentClick = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
        >
          Shipments
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewShipmentModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-accent-600"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Shipment</span>
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <ShippingFilters
          orderId={filters?.search || ''}
          onOrderIdChange={(value) => setFilters({ search: value })}
        />
        
        <DateRangeFilter
          dateRange={filters?.dateRange || null}
          customDateRange={filters?.customDateRange || { start: null, end: null }}
          onDateRangeChange={(range) => setFilters({ dateRange: range })}
          onCustomDateChange={(dates) => setFilters({ customDateRange: dates })}
        />

        <select
          value={filters?.status || ''}
          onChange={(e) => setFilters({ status: e.target.value || null })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(shipments)
            .slice(
              (pagination.currentPage - 1) * pagination.itemsPerPage,
              pagination.currentPage * pagination.itemsPerPage
            )
            .map((shipment) => (
              <ShipmentCard
                key={shipment.id}
                shipment={shipment}
                onClick={() => handleShipmentClick(shipment.id)}
              />
            ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

      {showNewShipmentModal && (
        <NewShipmentModal 
          onClose={() => setShowNewShipmentModal(false)}
          orderId={filters?.search || ''}
        />
      )}

      {selectedShipmentId && (
        <ShipmentDetails
          shipment={shipments[selectedShipmentId]}
          onClose={() => setSelectedShipmentId(null)}
        />
      )}
    </div>
  );
};

export default Shipments;