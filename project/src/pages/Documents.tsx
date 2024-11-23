import React, { useState } from 'react';
import { 
  ArrowUpTrayIcon, 
  MagnifyingGlassIcon,
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useDocuments } from '../hooks/useDocuments';
import DocumentCard from '../components/documents/DocumentCard';
import Pagination from '../components/common/Pagination';
import DocumentViewer from '../components/documents/DocumentViewer';

const Documents = () => {
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const { documents, loading, pagination, filters, setPage, setFilters } = useDocuments(selectedOrderId);

  const documentStatuses = ['All Statuses', 'Draft', 'Final', 'Approved', 'Rejected'];

  const groupedDocuments = Object.values(documents).reduce((acc, doc) => {
    if (!acc[doc.orderId]) {
      acc[doc.orderId] = [];
    }
    acc[doc.orderId].push(doc);
    return acc;
  }, {} as Record<string, typeof documents[keyof typeof documents][]>);

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
        >
          Documents
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-accent-600"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
          <span>Upload Document</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <select
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Orders</option>
          {Object.keys(groupedDocuments).map((orderId) => (
            <option key={orderId} value={orderId}>{orderId}</option>
          ))}
        </select>

        <select
          value={filters.status || 'All Statuses'}
          onChange={(e) => setFilters({ status: e.target.value === 'All Statuses' ? null : e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {documentStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedDocuments).map(([orderId, docs]) => (
            <div key={orderId} className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Order #{orderId}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    document={doc} 
                    onView={() => handleViewDocument(doc)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default Documents;