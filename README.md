# 🚀 Krunchbox Analytics Dashboard

Dashboard de análisis de ventas construido con Next.js 15, TypeScript, Redux Saga y tecnologías modernas.

## ✨ Características

- **📊 Dashboard Completo** - Métricas, gráficos y tablas interactivas
- **⚡ Next.js 15** - Framework React con App Router
- **🔷 TypeScript** - Tipado estático para mayor robustez
- **🔄 Redux Toolkit + Redux Saga** - Manejo de estado profesional
- **📱 Responsive Design** - Optimizado para móvil y desktop
- **🎨 Tailwind CSS** - Estilos modernos y consistentes
- **📈 Plotly.js** - Gráficos interactivos de alta calidad
- **📋 AG Grid** - Tablas de datos avanzadas
- **🧪 Testing** - 75%+ de cobertura con Jest y RTL

## 🛠️ Tecnologías

- **Frontend:** Next.js 15, React 18, TypeScript
- **Estado:** Redux Toolkit, Redux Saga
- **Estilos:** Tailwind CSS
- **Gráficos:** Plotly.js
- **Tablas:** AG Grid
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd krunchbox-challenge

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
open http://localhost:3000
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción

# Testing
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura

# Linting
npm run lint         # Ejecutar ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/data/          # API interna
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── InsightCard.tsx    # Componente principal
│   ├── MetricsDisplay.tsx # Métricas KPI
│   ├── TopPerformersTable.tsx # Tabla AG Grid
│   └── TrendChart.tsx     # Gráfico Plotly
├── store/                 # Redux store
│   ├── slices/           # Redux slices
│   ├── sagas/            # Redux sagas
│   └── hooks.ts          # Hooks tipados
├── types/                # Definiciones TypeScript
└── providers/            # Context providers
```

## 🎯 Funcionalidades

### 📊 Métricas Principales
- Ingresos totales con crecimiento
- Total de pedidos
- Total de clientes
- Valor promedio del pedido
- Tasa de conversión

### 📈 Visualizaciones
- **Gráfico de tendencias** - Series temporales con Plotly.js
- **Tabla de tiendas** - Top performers con AG Grid
- **Métricas KPI** - Cards con indicadores de crecimiento

### 🔄 Estado y Datos
- **Redux Saga** para efectos secundarios
- **API interna** simulando endpoint de datos
- **Manejo de estados** (loading, error, success)
- **Tipado completo** con TypeScript

## 🧪 Testing

El proyecto incluye tests completos con:
- **Jest** como test runner
- **React Testing Library** para testing de componentes
- **Cobertura del 75%+** en statements, branches, functions y lines
- **Tests de Redux** (slices, sagas, hooks)
- **Tests de API** (rutas internas)
- **Tests de componentes** (renderizado, interacciones)

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio:**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Configuración automática:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Variables de Entorno

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

## 🎨 Diseño

- **Paleta de colores** consistente con la marca
- **Cards con sombras** y bordes redondeados
- **Responsive design** para todos los dispositivos
- **Iconos emoji** para mejor UX
- **Indicadores de crecimiento** con colores semánticos

## 🔧 Configuración

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

## 📝 Notas de Desarrollo

- **Redux Saga** maneja todas las llamadas a la API
- **Dynamic imports** para Plotly.js (compatible con SSR)
- **AG Grid modules** registrados correctamente
- **TypeScript** estricto para type safety
- **Error boundaries** para manejo de errores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ para Krunchbox**