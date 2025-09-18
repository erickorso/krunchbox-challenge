import { NextResponse } from 'next/server';
import { AnalyticsData } from '@/types/data';

// Sample data that simulates the testdata.json
const sampleData: AnalyticsData = {
  summary: {
    total_revenue: 456789.25 + 389456.80 + 345678.90 + 312456.75 + 298765.40 + 275432.60 + 262345.30 + 248765.45 + 235678.90 + 223456.75 + 211234.60 + 199876.45 + 188543.30 + 177654.15 + 167432.80,
    total_orders: 2345 + 1987 + 1765 + 1654 + 1543 + 1421 + 1356 + 1287 + 1223 + 1165 + 1108 + 1054 + 1001 + 951 + 902,
    total_customers: 1890 + 1456 + 1234 + 1123 + 1089 + 987 + 923 + 876 + 834 + 798 + 765 + 732 + 698 + 667 + 635,
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
    },
    {
      store_id: "ST006",
      store_name: "Northside Commons",
      location: "Seattle, WA",
      revenue: 275432.60,
      orders: 1421,
      customers: 987,
      revenue_growth: 7.8,
      orders_growth: 4.9,
      customers_growth: 9.6,
      average_order_value: 193.85,
      conversion_rate: 3.1,
      rank: 6
    },
    {
      store_id: "ST007",
      store_name: "East Bay Center",
      location: "San Francisco, CA",
      revenue: 262345.30,
      orders: 1356,
      customers: 923,
      revenue_growth: 6.9,
      orders_growth: 4.2,
      customers_growth: 8.7,
      average_order_value: 193.50,
      conversion_rate: 3.0,
      rank: 7
    },
    {
      store_id: "ST008",
      store_name: "Southside Plaza",
      location: "Miami, FL",
      revenue: 248765.45,
      orders: 1287,
      customers: 876,
      revenue_growth: 6.1,
      orders_growth: 3.8,
      customers_growth: 7.9,
      average_order_value: 193.25,
      conversion_rate: 2.9,
      rank: 8
    },
    {
      store_id: "ST009",
      store_name: "Midtown District",
      location: "Boston, MA",
      revenue: 235678.90,
      orders: 1223,
      customers: 834,
      revenue_growth: 5.4,
      orders_growth: 3.5,
      customers_growth: 7.2,
      average_order_value: 192.80,
      conversion_rate: 2.8,
      rank: 9
    },
    {
      store_id: "ST010",
      store_name: "West End Mall",
      location: "Denver, CO",
      revenue: 223456.75,
      orders: 1165,
      customers: 798,
      revenue_growth: 4.8,
      orders_growth: 3.1,
      customers_growth: 6.6,
      average_order_value: 191.85,
      conversion_rate: 2.7,
      rank: 10
    },
    {
      store_id: "ST011",
      store_name: "Downtown Crossing",
      location: "Philadelphia, PA",
      revenue: 211234.60,
      orders: 1108,
      customers: 765,
      revenue_growth: 4.2,
      orders_growth: 2.8,
      customers_growth: 6.1,
      average_order_value: 190.70,
      conversion_rate: 2.6,
      rank: 11
    },
    {
      store_id: "ST012",
      store_name: "Riverside Walk",
      location: "San Diego, CA",
      revenue: 199876.45,
      orders: 1054,
      customers: 732,
      revenue_growth: 3.7,
      orders_growth: 2.5,
      customers_growth: 5.7,
      average_order_value: 189.55,
      conversion_rate: 2.5,
      rank: 12
    },
    {
      store_id: "ST013",
      store_name: "Central Station",
      location: "Atlanta, GA",
      revenue: 188543.30,
      orders: 1001,
      customers: 698,
      revenue_growth: 3.2,
      orders_growth: 2.2,
      customers_growth: 5.3,
      average_order_value: 188.40,
      conversion_rate: 2.4,
      rank: 13
    },
    {
      store_id: "ST014",
      store_name: "North Point",
      location: "Portland, OR",
      revenue: 177654.15,
      orders: 951,
      customers: 667,
      revenue_growth: 2.8,
      orders_growth: 1.9,
      customers_growth: 4.9,
      average_order_value: 186.85,
      conversion_rate: 2.3,
      rank: 14
    },
    {
      store_id: "ST015",
      store_name: "South Gate",
      location: "Las Vegas, NV",
      revenue: 167432.80,
      orders: 902,
      customers: 635,
      revenue_growth: 2.4,
      orders_growth: 1.6,
      customers_growth: 4.5,
      average_order_value: 185.60,
      conversion_rate: 2.2,
      rank: 15
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
