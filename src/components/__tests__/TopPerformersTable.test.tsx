import { render, screen } from '@testing-library/react';
import TopPerformersTable from '../TopPerformersTable';
import { TopPerformer } from '@/types/data';

const mockTopPerformers: TopPerformer[] = [
  {
    store_id: "ST001",
    store_name: "Downtown Flagship",
    location: "New York, NY",
    revenue: 456789.25,
    orders: 2345,
    customers: 1890,
    revenue_growth: 18.5,
    orders_growth: 12.3,
    customers_growth: 22.1,
    average_order_value: 194.75,
    conversion_rate: 4.2,
    rank: 1
  },
  {
    store_id: "ST002",
    store_name: "Westside Plaza",
    location: "Los Angeles, CA",
    revenue: 389456.80,
    orders: 1987,
    customers: 1456,
    revenue_growth: 15.2,
    orders_growth: 9.8,
    customers_growth: 18.7,
    average_order_value: 196.00,
    conversion_rate: 3.9,
    rank: 2
  }
];

// Mock AG Grid
jest.mock('ag-grid-react', () => {
  return {
    AgGridReact: ({ rowData, columnDefs, defaultColDef, ...props }: any) => (
      <div data-testid="ag-grid" {...props}>
        <div data-testid="grid-header">
          {columnDefs.map((col: any, index: number) => (
            <div key={index} data-testid={`header-${col.field || index}`}>
              {col.headerName}
            </div>
          ))}
        </div>
        <div data-testid="grid-body">
          {rowData.map((row: any, rowIndex: number) => (
            <div key={rowIndex} data-testid={`row-${rowIndex}`}>
              {columnDefs.map((col: any, colIndex: number) => (
                <div key={colIndex} data-testid={`cell-${rowIndex}-${col.field || colIndex}`}>
                  {col.valueFormatter ? col.valueFormatter({ value: row[col.field] }) : row[col.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  };
});

describe('TopPerformersTable', () => {
  it('renders AG Grid with correct data', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
  });

  it('displays correct column headers', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('header-rank')).toBeInTheDocument();
    expect(screen.getByTestId('header-store_name')).toBeInTheDocument();
    expect(screen.getByTestId('header-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('header-orders')).toBeInTheDocument();
    expect(screen.getByTestId('header-customers')).toBeInTheDocument();
    expect(screen.getByTestId('header-average_order_value')).toBeInTheDocument();
    expect(screen.getByTestId('header-conversion_rate')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    // Check that revenue is formatted as currency
    const revenueCells = screen.getAllByTestId(/cell-0-revenue/);
    expect(revenueCells[0]).toHaveTextContent('$456,789');
  });

  it('formats numbers correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    // Check that orders are formatted with commas
    const orderCells = screen.getAllByTestId(/cell-0-orders/);
    expect(orderCells[0]).toHaveTextContent('2,345');
  });

  it('displays all store data', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<TopPerformersTable data={[]} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('row-0')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    const gridContainer = screen.getByTestId('ag-grid').parentElement;
    expect(gridContainer).toHaveClass('ag-theme-alpine');
  });

  it('handles single store data', () => {
    const singleStore = [mockTopPerformers[0]];
    render(<TopPerformersTable data={singleStore} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.queryByTestId('row-1')).not.toBeInTheDocument();
  });

  it('displays store names and locations correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    // Check that store names are displayed
    const storeNameCells = screen.getAllByTestId(/cell-0-store_name/);
    expect(storeNameCells[0]).toHaveTextContent('Downtown Flagship');
  });

  it('handles large datasets', () => {
    const largeDataset = Array.from({ length: 100 }, (_, index) => ({
      ...mockTopPerformers[0],
      store_id: `ST${index + 1}`,
      store_name: `Store ${index + 1}`,
      rank: index + 1
    }));
    
    render(<TopPerformersTable data={largeDataset} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-99')).toBeInTheDocument();
  });

  it('formats conversion rate correctly', () => {
    render(<TopPerformersTable data={mockTopPerformers} />);
    
    const conversionCells = screen.getAllByTestId(/cell-0-conversion_rate/);
    expect(conversionCells[0]).toHaveTextContent('4.2%');
  });

  it('handles zero values correctly', () => {
    const zeroData = [{
      ...mockTopPerformers[0],
      revenue: 0,
      orders: 0,
      customers: 0,
      revenue_growth: 0,
      orders_growth: 0,
      customers_growth: 0,
      average_order_value: 0,
      conversion_rate: 0
    }];
    
    render(<TopPerformersTable data={zeroData} />);
    
    expect(screen.getByTestId('ag-grid')).toBeInTheDocument();
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
  });
});