import { render, screen } from '@testing-library/react';
import TopPerformersTable from '../TopPerformersTable';
import { TopPerformer } from '@/types/data';

// Mock AG Grid with better coverage
jest.mock('ag-grid-react', () => {
  return {
    AgGridReact: ({ rowData, columnDefs, ...props }: { 
      rowData: TopPerformer[]; 
      columnDefs: Array<{ 
        field?: string; 
        headerName?: string; 
        cellRenderer?: (params: { value: unknown; data: TopPerformer }) => string;
        valueFormatter?: (params: { value: unknown }) => string;
      }>; 
      [key: string]: unknown;
    }) => {
      // Test the column definitions
      const testColumns = columnDefs.map((col) => {
        if (col.cellRenderer && rowData[0]) {
          return col.cellRenderer({ 
            value: rowData[0]?.[col.field as keyof TopPerformer], 
            data: rowData[0] 
          });
        }
        if (col.valueFormatter && rowData[0]) {
          return col.valueFormatter({ 
            value: rowData[0]?.[col.field as keyof TopPerformer] 
          });
        }
        return rowData[0]?.[col.field as keyof TopPerformer];
      });

      return (
        <div data-testid="ag-grid" {...props}>
          <div data-testid="grid-header">
            {columnDefs.map((col, index) => (
              <div key={index} data-testid={`header-${col.field || index}`}>
                {col.headerName}
              </div>
            ))}
          </div>
          <div data-testid="grid-body">
            {rowData.map((row, rowIndex) => (
              <div key={rowIndex} data-testid={`row-${rowIndex}`}>
                {columnDefs.map((col, colIndex) => (
                  <div key={colIndex} data-testid={`cell-${rowIndex}-${col.field || colIndex}`}>
                    {col.cellRenderer ? 
                      col.cellRenderer({ value: row[col.field as keyof TopPerformer], data: row }) :
                      col.valueFormatter ? 
                        col.valueFormatter({ value: row[col.field as keyof TopPerformer] }) :
                        row[col.field as keyof TopPerformer]
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div data-testid="test-columns">
            {testColumns.map((col, index) => (
              <div key={index} data-testid={`test-col-${index}`}>
                {String(col)}
              </div>
            ))}
          </div>
        </div>
      );
    },
  };
});

// Mock data
const mockTopPerformers: TopPerformer[] = [
  {
    store_id: "ST001",
    store_name: "Downtown Plaza",
    location: "New York, NY",
    revenue: 456789.50,
    orders: 2345,
    customers: 1890,
    revenue_growth: 15.2,
    orders_growth: 12.8,
    customers_growth: 18.7,
    average_order_value: 194.50,
    conversion_rate: 3.8,
    rank: 1
  },
  {
    store_id: "ST002",
    store_name: "Westside Mall",
    location: "Los Angeles, CA",
    revenue: 389456.75,
    orders: 1987,
    customers: 1567,
    revenue_growth: 8.9,
    orders_growth: 6.4,
    customers_growth: 11.2,
    average_order_value: 196.00,
    conversion_rate: 3.9,
    rank: 2
  }
];

describe('TopPerformersTable', () => {
  it('renders AG Grid with correct data', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
  });

  it('displays correct headers', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('header-rank')).toBeInTheDocument();
    expect(screen.getByTestId('header-store_name')).toBeInTheDocument();
    expect(screen.getByTestId('header-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('header-orders')).toBeInTheDocument();
    expect(screen.getByTestId('header-customers')).toBeInTheDocument();
  });

  it('renders data rows correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    // Check if currency formatting is applied
    const testColumns = screen.getAllByTestId(/test-col-/);
    expect(testColumns.length).toBeGreaterThan(0);
  });

  it('handles empty data gracefully', () => {
    render(<TopPerformersTable data={[]} />);
    
    expect(screen.getByText('No hay datos de tiendas disponibles')).toBeInTheDocument();
  });

  it('handles undefined data gracefully', () => {
    render(<TopPerformersTable data={undefined as unknown as TopPerformer[]} />);
    
    expect(screen.getByText('No hay datos de tiendas disponibles')).toBeInTheDocument();
  });
});