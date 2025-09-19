# 🚀 Krunchbox Analytics Dashboard

Sales analytics dashboard built with Next.js 15, TypeScript, Redux Saga and modern technologies.

## ✨ Features

- **📊 Complete Dashboard** - Interactive metrics, charts and tables
- **⚡ Next.js 15** - React framework with App Router
- **🔷 TypeScript** - Static typing for greater robustness
- **🔄 Redux Toolkit + Redux Saga** - Professional state management
- **📱 Responsive Design** - Optimized for mobile and desktop
- **🎨 Tailwind CSS** - Modern and consistent styles
- **📈 Plotly.js** - High-quality interactive charts
- **📋 AG Grid** - Advanced data tables
- **🧪 Testing** - 75%+ coverage with Jest and RTL

## 🛠️ Technologies

- **Frontend:** Next.js 15, React 18, TypeScript
- **State:** Redux Toolkit, Redux Saga
- **Styles:** Tailwind CSS
- **Charts:** Plotly.js
- **Tables:** AG Grid
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd krunchbox-challenge

# Install dependencies
npm install

# Run in development
npm run dev

# Open in browser
open http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server

# Testing
npm test             # Run tests
npm run test:watch   # Tests in watch mode
npm run test:coverage # Tests with coverage

# Linting
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/data/          # Internal API
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── InsightCard.tsx    # Main component
│   ├── MetricsDisplay.tsx # KPI metrics
│   ├── TopPerformersTable.tsx # AG Grid table
│   └── TrendChart.tsx     # Plotly chart
├── store/                 # Redux store
│   ├── slices/           # Redux slices
│   ├── sagas/            # Redux sagas
│   └── hooks.ts          # Typed hooks
├── types/                # TypeScript definitions
└── providers/            # Context providers
```

## 🎯 Functionality

### 📊 Main Metrics
- Total revenue with growth
- Total orders
- Total customers
- Average order value
- Conversion rate

### 📈 Visualizations
- **Trend chart** - Time series with Plotly.js
- **Stores table** - Top performers with AG Grid
- **KPI metrics** - Cards with growth indicators

### 🔄 State and Data
- **Redux Saga** for side effects
- **Internal API** simulating data endpoint
- **State management** (loading, error, success)
- **Complete typing** with TypeScript

## 🧪 Testing

The project includes comprehensive tests with:
- **Jest** as test runner
- **React Testing Library** for component testing
- **75%+ coverage** in statements, branches, functions and lines
- **Redux tests** (slices, sagas, hooks)
- **API tests** (internal routes)
- **Component tests** (rendering, interactions)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Automatic configuration:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Environment Variables

```env
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=Krunchbox Analytics Dashboard
```

## 📊 Coverage Report

```
File                     | % Stmts | % Branch | % Funcs | % Lines
-------------------------|---------|----------|---------|--------
All files                |   80.4  |    76    |  78.72  |  78.46
components               |   90.36 |   90.47  |  81.81  |  88.73
store                    |   100   |   100    |   100   |   100
app/api/data             |   87.5  |   100    |   100   |  85.71
```

## 🎨 Design

- **Consistent color palette** with brand
- **Cards with shadows** and rounded borders
- **Responsive design** for all devices
- **Emoji icons** for better UX
- **Growth indicators** with semantic colors

## 🔧 Configuration

### ESLint
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "off"
  }
}
```

### Jest
```javascript
{
  "coverageThreshold": {
    "global": {
      "branches": 75,
      "functions": 75,
      "lines": 75,
      "statements": 75
    }
  }
}
```

## 📝 Development Notes

- **Redux Saga** handles all API calls
- **Dynamic imports** for Plotly.js (SSR compatible)
- **AG Grid modules** properly registered
- **Strict TypeScript** for type safety
- **Error boundaries** for error handling

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ for Krunchbox**