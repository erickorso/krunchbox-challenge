'use client';

import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { TopPerformer } from '@/types/data';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface TopPerformersTableProps {
  data: TopPerformer[];
}

export default function TopPerformersTable({ data }: TopPerformersTableProps) {
  console.log('TopPerformersTable data:', data);
  console.log('Data length:', data?.length);
  console.log('Data type:', typeof data);
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
          <p>No hay datos de tiendas disponibles</p>
        </div>
      </div>
    );
  }
  
  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'Rank',
      field: 'rank',
      width: 80,
      cellRenderer: (params: any) => {
        const rank = params.value;
        let badgeClass = 'px-2 py-1 rounded-full text-xs font-bold ';
        
        if (rank === 1) badgeClass += 'bg-yellow-100 text-yellow-800';
        else if (rank === 2) badgeClass += 'bg-gray-100 text-gray-800';
        else if (rank === 3) badgeClass += 'bg-orange-100 text-orange-800';
        else badgeClass += 'bg-blue-100 text-blue-800';
        
        return `<span class="${badgeClass}">#${rank}</span>`;
      }
    },
    {
      headerName: 'Tienda',
      field: 'store_name',
      width: 200,
      cellRenderer: (params: any) => {
        const store = params.data;
        return `
          <div>
            <div class="font-semibold text-gray-900">${store.store_name}</div>
            <div class="text-sm text-gray-500">${store.location}</div>
          </div>
        `;
      }
    },
    {
      headerName: 'Ingresos',
      field: 'revenue',
      width: 120,
      type: 'numericColumn',
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(params.value);
      },
      cellRenderer: (params: any) => {
        const revenue = params.value;
        const formattedRevenue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(revenue);
        
        return `
          <div class="font-semibold text-gray-900">${formattedRevenue}</div>
        `;
      }
    },
    {
      headerName: 'Pedidos',
      field: 'orders',
      width: 100,
      type: 'numericColumn',
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('en-US').format(params.value);
      },
      cellRenderer: (params: any) => {
        const orders = params.value;
        const formattedOrders = new Intl.NumberFormat('en-US').format(orders);
        
        return `
          <div class="font-semibold text-gray-900">${formattedOrders}</div>
        `;
      }
    },
    {
      headerName: 'Clientes',
      field: 'customers',
      width: 100,
      type: 'numericColumn',
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('en-US').format(params.value);
      },
      cellRenderer: (params: any) => {
        const customers = params.value;
        const formattedCustomers = new Intl.NumberFormat('en-US').format(customers);
        
        return `
          <div class="font-semibold text-gray-900">${formattedCustomers}</div>
        `;
      }
    },
    {
      headerName: 'AOV',
      field: 'average_order_value',
      width: 100,
      type: 'numericColumn',
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(params.value);
      }
    },
    {
      headerName: 'Conversión',
      field: 'conversion_rate',
      width: 100,
      type: 'numericColumn',
      valueFormatter: (params: any) => {
        return `${params.value}%`;
      }
    }
  ], []);

  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine w-full h-96">
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="single"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        domLayout="normal"
      />
    </div>
  );
}
