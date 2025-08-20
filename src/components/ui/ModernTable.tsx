'use client'

import { ReactNode } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface ModernTableProps {
  headers: string[];
  data: Array<Record<string, any>>;
  actions?: Array<{
    label: string;
    onClick: (row: any) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ElementType;
  }>;
  className?: string;
  variant?: 'glass' | 'solid';
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function ModernTable({
  headers,
  data,
  actions,
  className = '',
  variant = 'glass',
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: ModernTableProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-lg border border-white/20';
      case 'solid':
        return 'bg-white border border-gray-200';
      default:
        return 'bg-white/10 backdrop-blur-lg border border-white/20';
    }
  };

  const getActionVariantClasses = (actionVariant: string = 'primary') => {
    switch (actionVariant) {
      case 'primary':
        return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30';
      case 'secondary':
        return 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-gray-500/30';
      case 'danger':
        return 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30';
    }
  };

  return (
    <div className={`${getVariantClasses()} rounded-2xl overflow-hidden ${className}`}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-white/5 transition-colors duration-200"
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  >
                    {row[header.toLowerCase().replace(/\s+/g, '_')] || row[header]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      {actions.map((action, actionIndex) => {
                        const ActionIcon = action.icon;
                        return (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            className={`
                              inline-flex items-center space-x-2 px-3 py-2 
                              rounded-lg border text-xs font-medium 
                              transition-all duration-200 
                              hover:scale-105
                              ${getActionVariantClasses(action.variant)}
                            `}
                          >
                            {ActionIcon && <ActionIcon className="w-4 h-4" />}
                            <span>{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <p className="text-sm text-gray-400">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300
                       bg-white/10 border border-white/20 hover:bg-white/20
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            >
              Anterior
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange?.(pageNum)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                      ${pageNum === currentPage
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-300 bg-white/10 border border-white/20 hover:bg-white/20'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300
                       bg-white/10 border border-white/20 hover:bg-white/20
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
