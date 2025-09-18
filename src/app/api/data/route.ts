import { NextResponse } from 'next/server';
import { AnalyticsData } from '@/types/data';

// Sample data that simulates the testdata.json
const sampleData: AnalyticsData = {
  summary: {
    total_revenue: 2456789.50,
    total_orders: 12456,
    total_customers: 8934,
    revenue_growth: 12.5,
    orders_growth: 8.3,
    customers_growth: 15.2,
    average_order_value: 197.25,
    conversion_rate: 3.8
  },
  top_performers: [
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
    },
    {
      store_id: "ST003",
      store_name: "Central Mall",
      location: "Chicago, IL",
      revenue: 345678.90,
      orders: 1765,
      customers: 1234,
      revenue_growth: 11.8,
      orders_growth: 7.2,
      customers_growth: 14.5,
      average_order_value: 196.15,
      conversion_rate: 3.6,
      rank: 3
    },
    {
      store_id: "ST004",
      store_name: "Metro Center",
      location: "Houston, TX",
      revenue: 312456.75,
      orders: 1654,
      customers: 1123,
      revenue_growth: 9.4,
      orders_growth: 6.1,
      customers_growth: 12.8,
      average_order_value: 188.90,
      conversion_rate: 3.4,
      rank: 4
    },
    {
      store_id: "ST005",
      store_name: "Riverside Square",
      location: "Phoenix, AZ",
      revenue: 298765.40,
      orders: 1543,
      customers: 1089,
      revenue_growth: 8.7,
      orders_growth: 5.5,
      customers_growth: 11.2,
      average_order_value: 193.80,
      conversion_rate: 3.3,
      rank: 5
    }
  ],
  trend_data: [
    { date: "2024-01-01", revenue: 2100000, orders: 10500, customers: 7800, average_order_value: 200.00, conversion_rate: 3.5 },
    { date: "2024-01-08", revenue: 2150000, orders: 10800, customers: 8000, average_order_value: 199.07, conversion_rate: 3.6 },
    { date: "2024-01-15", revenue: 2200000, orders: 11000, customers: 8200, average_order_value: 200.00, conversion_rate: 3.7 },
    { date: "2024-01-22", revenue: 2250000, orders: 11200, customers: 8400, average_order_value: 200.89, conversion_rate: 3.8 },
    { date: "2024-01-29", revenue: 2300000, orders: 11400, customers: 8600, average_order_value: 201.75, conversion_rate: 3.9 },
    { date: "2024-02-05", revenue: 2350000, orders: 11600, customers: 8800, average_order_value: 202.59, conversion_rate: 4.0 },
    { date: "2024-02-12", revenue: 2400000, orders: 11800, customers: 8900, average_order_value: 203.39, conversion_rate: 4.1 },
    { date: "2024-02-19", revenue: 2456789.50, orders: 12456, customers: 8934, average_order_value: 197.25, conversion_rate: 3.8 }
  ],
  period: {
    start_date: "2024-01-01",
    end_date: "2024-02-19"
  },
  last_updated: "2024-02-19T10:30:00Z"
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(sampleData);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
