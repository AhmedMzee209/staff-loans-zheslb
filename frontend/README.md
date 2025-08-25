# ZHELSB Staff Loan Management System - Frontend

## 🏗️ Project Architecture

This frontend application follows a clean, modular architecture with clear separation of concerns.

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── shared/          # Common components used across the app
│   │   │   ├── Button.tsx   # Reusable button with variants
│   │   │   ├── Card.tsx     # Content container component
│   │   │   ├── Modal.tsx    # Modal dialog component
│   │   │   ├── Table.tsx    # Data table component
│   │   │   ├── StatCard.tsx # Statistics display component
│   │   │   └── index.ts     # Shared components exports
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── Login.tsx        # Authentication form
│   │
│   ├── pages/               # Page components organized by role
│   │   ├── admin/           # Admin-specific pages
│   │   ├── staff/           # Staff-specific pages
│   │   ├── hod/             # HOD-specific pages
│   │   ├── manager/         # Manager-specific pages
│   │   ├── accountant/      # Accountant-specific pages
│   │   ├── auditor/         # Auditor-specific pages
│   │   ├── ceo/             # CEO-specific pages
│   │   ├── secretary/       # Secretary-specific pages
│   │   └── [Role]Dashboard.tsx  # Main dashboard for each role
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.ts  # Local storage state management
│   │   ├── useDebounce.ts      # Debounced value hook
│   │   └── index.ts            # Hooks exports
│   │
│   ├── services/            # API and business logic services
│   │   ├── api.ts           # Centralized HTTP client
│   │   ├── authService.ts   # Authentication service
│   │   └── index.ts         # Services exports
│   │
│   ├── constants/           # Application constants
│   │   ├── roles.ts         # User roles and permissions
│   │   ├── loanStatus.ts    # Loan application statuses
│   │   └── index.ts         # Constants exports
│   │
│   ├── utils/               # Utility functions
│   │   ├── format.ts        # Data formatting utilities
│   │   ├── validation.ts    # Form validation utilities
│   │   └── index.ts         # Utils exports
│   │
│   ├── context/             # React context providers
│   │   └── AuthContext.tsx  # Authentication context
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Global types
│   │
│   ├── data/                # Mock data and fixtures
│   │   └── dummyData.ts     # Sample data for development
│   │
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
│
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🎯 Key Principles

### 1. **Separation of Concerns**
- Each role has its own folder with specific pages
- Shared components are centralized in `components/shared/`
- Business logic is separated into services
- Constants and types are clearly defined

### 2. **Component Reusability**
- Shared components can be imported from `@/components/shared`
- Consistent UI patterns across all dashboards
- Props interfaces for type safety

### 3. **Role-Based Organization**
- Dashboard pages are organized by user role
- Each role folder contains only relevant functionality
- No cross-contamination between different user types

### 4. **Service Layer**
- Centralized API calls through `apiService`
- Authentication logic in `authService`
- Easy to mock for testing

## 🚀 Usage Examples

### Using Shared Components
```tsx
import { Button, Card, Table } from '@/components/shared';

function MyPage() {
  return (
    <Card title="My Data" subtitle="Important information">
      <Button variant="primary" onClick={handleClick}>
        Action
      </Button>
      <Table data={data} columns={columns} />
    </Card>
  );
}
```

### Using Custom Hooks
```tsx
import { useLocalStorage, useDebounce } from '@/hooks';

function MyComponent() {
  const [value, setValue] = useLocalStorage('myKey', 'default');
  const debouncedValue = useDebounce(value, 500);
  
  // ... rest of component
}
```

### Using Services
```tsx
import { authService, apiService } from '@/services';

// Login
const user = await authService.login({ email, password });

// API call
const data = await apiService.get('/users');
```

### Using Constants
```tsx
import { USER_ROLES, LOAN_STATUS, ROLE_COLORS } from '@/constants';

const isAdmin = user.role === USER_ROLES.ADMIN;
const statusColor = ROLE_COLORS[user.role];
```

## 🔧 Development Guidelines

### 1. **Adding New Components**
- Place role-specific components in their respective role folders
- Place reusable components in `components/shared/`
- Export from appropriate index files

### 2. **Adding New Pages**
- Create in the appropriate role folder
- Import and use in the corresponding dashboard
- Follow the existing naming conventions

### 3. **Adding New Services**
- Create in `services/` folder
- Export from `services/index.ts`
- Follow the existing service pattern

### 4. **Adding New Constants**
- Create in `constants/` folder
- Export from `constants/index.ts`
- Use TypeScript for type safety

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Consistent color scheme** defined in constants
- **Responsive design** for all screen sizes
- **Accessibility** considerations built-in

## 🔒 Security

- **JWT-based authentication**
- **Role-based access control**
- **Secure API communication**
- **Input validation** on all forms

## 🧪 Testing

- **TypeScript** for compile-time error checking
- **Component isolation** for easy unit testing
- **Service mocking** capabilities
- **Consistent patterns** for testable code

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoint-based layouts**
- **Touch-friendly interactions**
- **Optimized for all devices**

This architecture ensures maintainability, scalability, and developer experience while keeping the codebase clean and organized. 