import { GET } from '../route';
import { NextRequest } from 'next/server';

// Mock NextResponse
const mockNextResponse = {
  json: jest.fn(),
  status: jest.fn(() => mockNextResponse),
};

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({ ...mockNextResponse, data })),
  },
}));

describe('/api/data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns analytics data successfully', async () => {
    const response = await GET();
    
    expect(response).toBeDefined();
    // The response should contain the sample data structure
    expect(response.data).toHaveProperty('summary');
    expect(response.data).toHaveProperty('top_performers');
    expect(response.data).toHaveProperty('trend_data');
    expect(response.data).toHaveProperty('period');
    expect(response.data).toHaveProperty('last_updated');
  });

  it('returns data with correct summary structure', async () => {
    const response = await GET();
    
    const summary = response.data.summary;
    expect(summary).toHaveProperty('total_revenue');
    expect(summary).toHaveProperty('total_orders');
    expect(summary).toHaveProperty('total_customers');
    expect(summary).toHaveProperty('revenue_growth');
    expect(summary).toHaveProperty('orders_growth');
    expect(summary).toHaveProperty('customers_growth');
    expect(summary).toHaveProperty('average_order_value');
    expect(summary).toHaveProperty('conversion_rate');
  });

  it('returns data with correct top_performers structure', async () => {
    const response = await GET();
    
    const topPerformers = response.data.top_performers;
    expect(Array.isArray(topPerformers)).toBe(true);
    expect(topPerformers.length).toBeGreaterThan(0);
    
    const firstPerformer = topPerformers[0];
    expect(firstPerformer).toHaveProperty('store_id');
    expect(firstPerformer).toHaveProperty('store_name');
    expect(firstPerformer).toHaveProperty('location');
    expect(firstPerformer).toHaveProperty('revenue');
    expect(firstPerformer).toHaveProperty('orders');
    expect(firstPerformer).toHaveProperty('customers');
    expect(firstPerformer).toHaveProperty('rank');
  });

  it('returns data with correct trend_data structure', async () => {
    const response = await GET();
    
    const trendData = response.data.trend_data;
    expect(Array.isArray(trendData)).toBe(true);
    expect(trendData.length).toBeGreaterThan(0);
    
    const firstDataPoint = trendData[0];
    expect(firstDataPoint).toHaveProperty('date');
    expect(firstDataPoint).toHaveProperty('revenue');
    expect(firstDataPoint).toHaveProperty('orders');
    expect(firstDataPoint).toHaveProperty('customers');
    expect(firstDataPoint).toHaveProperty('average_order_value');
    expect(firstDataPoint).toHaveProperty('conversion_rate');
  });

  it('returns data with correct period structure', async () => {
    const response = await GET();
    
    const period = response.data.period;
    expect(period).toHaveProperty('start_date');
    expect(period).toHaveProperty('end_date');
    expect(typeof period.start_date).toBe('string');
    expect(typeof period.end_date).toBe('string');
  });

  it('returns data with last_updated timestamp', async () => {
    const response = await GET();
    
    const lastUpdated = response.data.last_updated;
    expect(typeof lastUpdated).toBe('string');
    expect(new Date(lastUpdated)).toBeInstanceOf(Date);
  });

  it('simulates API delay', async () => {
    const startTime = Date.now();
    await GET();
    const endTime = Date.now();
    
    // Should take at least 500ms due to the delay
    expect(endTime - startTime).toBeGreaterThanOrEqual(500);
  });
});
