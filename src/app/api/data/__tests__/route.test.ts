import { GET } from '../route';
// import { NextRequest } from 'next/server';

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
    
    // Should take at least 400ms due to the delay (allowing some tolerance)
    expect(endTime - startTime).toBeGreaterThanOrEqual(400);
  });

  it('returns consistent data structure across multiple calls', async () => {
    const response1 = await GET();
    const response2 = await GET();
    
    expect(response1.data).toEqual(response2.data);
  });

  it('has valid date formats in period', async () => {
    const response = await GET();
    
    const startDate = new Date(response.data.period.start_date);
    const endDate = new Date(response.data.period.end_date);
    
    expect(startDate).toBeInstanceOf(Date);
    expect(endDate).toBeInstanceOf(Date);
    expect(startDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
  });

  it('has valid last_updated timestamp', async () => {
    const response = await GET();
    
    const lastUpdated = new Date(response.data.last_updated);
    expect(lastUpdated).toBeInstanceOf(Date);
    expect(lastUpdated.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('has valid summary data types', async () => {
    const response = await GET();
    const summary = response.data.summary;
    
    expect(typeof summary.total_revenue).toBe('number');
    expect(typeof summary.total_orders).toBe('number');
    expect(typeof summary.total_customers).toBe('number');
    expect(typeof summary.revenue_growth).toBe('number');
    expect(typeof summary.orders_growth).toBe('number');
    expect(typeof summary.customers_growth).toBe('number');
    expect(typeof summary.average_order_value).toBe('number');
    expect(typeof summary.conversion_rate).toBe('number');
  });

  it('has valid top_performers array structure', async () => {
    const response = await GET();
    const topPerformers = response.data.top_performers;
    
    expect(Array.isArray(topPerformers)).toBe(true);
    expect(topPerformers.length).toBeGreaterThan(0);
    
    topPerformers.forEach((performer, index) => {
      expect(performer).toHaveProperty('store_id');
      expect(performer).toHaveProperty('store_name');
      expect(performer).toHaveProperty('location');
      expect(performer).toHaveProperty('revenue');
      expect(performer).toHaveProperty('orders');
      expect(performer).toHaveProperty('customers');
      expect(performer).toHaveProperty('rank');
      expect(performer.rank).toBe(index + 1);
    });
  });

  it('has valid trend_data array structure', async () => {
    const response = await GET();
    const trendData = response.data.trend_data;
    
    expect(Array.isArray(trendData)).toBe(true);
    expect(trendData.length).toBeGreaterThan(0);
    
    trendData.forEach((dataPoint) => {
      expect(dataPoint).toHaveProperty('date');
      expect(dataPoint).toHaveProperty('revenue');
      expect(dataPoint).toHaveProperty('orders');
      expect(dataPoint).toHaveProperty('customers');
      expect(dataPoint).toHaveProperty('average_order_value');
      expect(dataPoint).toHaveProperty('conversion_rate');
    });
  });
});
