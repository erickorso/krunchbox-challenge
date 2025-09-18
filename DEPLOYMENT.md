# 🚀 Deployment Guide - Krunchbox Analytics Dashboard

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository with the code

### Steps to Deploy

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables** (Optional)
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_APP_NAME`: `Krunchbox Analytics Dashboard`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at `https://your-project.vercel.app`

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Start production server
npm start
```

### Features Included

✅ **Next.js 15** with TypeScript
✅ **Redux Toolkit** + Redux Saga
✅ **Tailwind CSS** for styling
✅ **AG Grid** for data tables
✅ **Plotly.js** for charts
✅ **Jest** + React Testing Library
✅ **Responsive Design**
✅ **Error Handling**
✅ **Loading States**

### Performance Optimizations

- Dynamic imports for heavy libraries
- SSR disabled for client-only components
- Optimized bundle size
- Lazy loading for charts

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
