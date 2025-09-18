// TypeScript interfaces for the retail analytics data structure

export interface Summary {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  revenue_growth: number;
  orders_growth: number;
  customers_growth: number;
  average_order_value: number;
  conversion_rate: number;
}

export interface TopPerformer {
  store_id: string;
  store_name: string;
  location: string;
  revenue: number;
  orders: number;
  customers: number;
  revenue_growth: number;
  orders_growth: number;
  customers_growth: number;
  average_order_value: number;
  conversion_rate: number;
  rank: number;
}

export interface TrendDataPoint {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
  average_order_value: number;
  conversion_rate: number;
}

export interface AnalyticsData {
  summary: Summary;
  top_performers: TopPerformer[];
  trend_data: TrendDataPoint[];
  period: {
    start_date: string;
    end_date: string;
  };
  last_updated: string;
}
