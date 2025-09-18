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
        return `#${rank}`;
      }
    },
    {
      headerName: 'Tienda',
      field: 'store_name',
      width: 200,
      cellRenderer: (params: any) => {
        const store = params.data;
        return store.store_name;
      }
    },
    {
      headerName: 'Ubicación',
      field: 'location',
      width: 150,
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
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(revenue);
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
        return new Intl.NumberFormat('en-US').format(orders);
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
        return new Intl.NumberFormat('en-US').format(customers);
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
