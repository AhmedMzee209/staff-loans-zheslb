# ZHESLB Staff Loan Management System

A comprehensive web-based loan management system for ZHESLB (Zanzibar Higher Education Students' Loan Board) staff members. This system streamlines the loan application, approval, and contract management process with multi-role support and complete audit trails.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [User Roles & Responsibilities](#user-roles--responsibilities)
- [Loan Workflow](#loan-workflow)
- [Setup Instructions](#setup-instructions)
- [Backend Roadmap](#backend-roadmap)
- [Frontend Roadmap](#frontend-roadmap)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Current Implementation Status](#current-implementation-status)
- [Future Enhancements](#future-enhancements)

---

## Overview

The ZHESLB Staff Loan Management System is a full-stack application designed to digitize and automate the staff loan application and approval process. It supports multi-stage approvals, document management, contract versioning, and comprehensive audit logging.

**Key Objectives:**
- Streamline loan application submission and tracking
- Implement hierarchical approval workflows
- Ensure transparency and compliance through audit trails
- Provide role-based dashboards for different stakeholders
- Manage loan contracts with version control
- Support document upload and storage

---

## Technology Stack

### Backend
- **Framework:** Spring Boot 3.5.4
- **Language:** Java 17
- **Database:** PostgreSQL
- **ORM:** Spring Data JPA (Hibernate)
- **Security:** Spring Security + JWT
- **Documentation:** OpenAPI 3.0 (Swagger)
- **Build Tool:** Maven
- **Additional:** Lombok, Jakarta Validation

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2
- **Routing:** React Router DOM 7.8.1
- **Styling:** Tailwind CSS 3.4.1
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Infrastructure
- **API Server:** localhost:8080
- **Frontend Dev Server:** localhost:5173
- **File Storage:** Local filesystem (uploads directory)
- **Authentication:** JWT tokens (24-hour expiration)

---

## System Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────┐
│           Frontend (React + TS)             │
│  ┌─────────────────────────────────────┐   │
│  │  Pages (Role-based Dashboards)      │   │
│  ├─────────────────────────────────────┤   │
│  │  Components (Shared & Specific)     │   │
│  ├─────────────────────────────────────┤   │
│  │  Services (API Integration)         │   │
│  ├─────────────────────────────────────┤   │
│  │  Context (Auth State Management)    │   │
│  └─────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │ HTTP/REST (JSON)
                   │ JWT Authentication
┌──────────────────▼──────────────────────────┐
│           Backend (Spring Boot)             │
│  ┌─────────────────────────────────────┐   │
│  │  Controllers (REST Endpoints)       │   │
│  ├─────────────────────────────────────┤   │
│  │  Services (Business Logic)          │   │
│  ├─────────────────────────────────────┤   │
│  │  Repositories (Data Access)         │   │
│  ├─────────────────────────────────────┤   │
│  │  Security (JWT + Role-based)        │   │
│  └─────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │ JPA/Hibernate
┌──────────────────▼──────────────────────────┐
│         PostgreSQL Database                 │
│  - Users & Roles (Multi-role support)       │
│  - Loan Applications & Details              │
│  - Approval Stages & Workflow               │
│  - Contracts & Versions                     │
│  - Documents & File Metadata                │
│  - Audit Logs (JSONB)                       │
└─────────────────────────────────────────────┘
```

### Database Schema Overview

**Core Entities:**
- `users` - User accounts with email authentication
- `roles` - System roles (ADMIN, CEO, HOD, ACCOUNTANT, LEGAL, STAFF)
- `user_roles` - Many-to-many junction with assignment tracking
- `staff_profiles` - Extended staff information with profile images
- `loan_applications` - Loan requests with status tracking
- `loan_application_details` - Loan purpose, amount, deduction details
- `approval_stages` - Multi-stage approval workflow (CEO, HOD, Accountant, Legal)
- `staff_approvals` - Hierarchical approval tracking
- `contracts` - Loan contracts with CEO approval and staff signature
- `contract_versions` - Contract revision history
- `documents` - File metadata (Zanzibar ID, payslips, contracts, etc.)
- `audit_logs` - Comprehensive CRUD operation tracking

---

## Key Features

### Current Features (Implemented)

#### User Management
- Multi-role user accounts (users can have multiple roles simultaneously)
- Role assignment tracking with audit trail
- Primary role designation
- Email-based authentication
- Password encryption with BCrypt
- Active/inactive user status

#### Loan Application System
- Draft creation and submission
- Staff profile requirement (mandatory before application)
- Profile image upload (JPG, 120x150px)
- Loan purpose and amount specification
- Auto-calculated monthly deductions (18-month period)
- Application status tracking (DRAFT → SUBMITTED → CEO_REVIEW → HOD_REVIEW → ACCOUNTANT_REVIEW → LEGAL_REVIEW → APPROVED/REJECTED)
- Priority assignment by CEO (HIGH/MEDIUM/LOW)

#### Approval Workflow
- Multi-stage approval process
- CEO initial review and priority assignment
- HOD department-level approval
- Accountant financial verification
- Legal contract review
- Stage-specific comments and action dates
- Rejection and deferral support
- Return for revision capability

#### Contract Management
- One contract per loan application
- Legal officer assignment
- Two-phase approval: CEO approval → Staff signature
- Contract versioning with change tracking
- Download count tracking
- Document path storage

#### Document Management
- Multipart file upload (max 10MB)
- Document types: Zanzibar ID, Payslip, ZSSF Card, Bank Slip, Contract, Signed Contract
- Type-based file organization (subdirectories)
- UUID-based unique filenames
- File replacement capability
- Download as Spring Resource

#### Audit & Compliance
- Complete CRUD operation logging
- JSONB storage for old/new values
- IP address tracking
- User action attribution
- Query by user, entity, action, date range, IP
- Audit statistics and reporting

#### Dashboards & Analytics
- CEO statistics (applications by priority, total amounts, processing times)
- Admin statistics
- Role-specific dashboards (9 roles)
- Application counts by status
- Pending review indicators

#### Security
- JWT token-based authentication (24-hour expiration)
- Role-based access control (RBAC)
- Method-level authorization (@PreAuthorize)
- CORS configuration
- Password hashing
- Session stateless design

---

## User Roles & Responsibilities

The system supports **9 distinct roles**:

| Role | Code | Responsibilities |
|------|------|------------------|
| Administrator | `ADMIN` | System configuration, user management, role assignment, system oversight |
| Chief Executive Officer | `CEO` | Strategic decisions, priority assignment, final approvals |
| Head of Department | `HOD` | Department-level approvals, team oversight |
| Manager | `MANAGER` | Operational oversight, team performance tracking |
| Accountant | `ACCOUNTANT` | Financial verification, payment schedule validation |
| Legal Officer | `LEGAL` | Contract preparation, legal review |
| Auditor | `AUDITOR` | Compliance monitoring, audit trail review |
| Chief Officer | `CO` | Senior management oversight |
| Secretary | `SECRETARY` | Administrative support |
| Staff Member | `STAFF` | Base role for all users, loan application submission |

**Note:** All users must have the STAFF role. Users can have multiple concurrent roles for flexibility.

---

## Loan Workflow

### Standard Loan Application Flow

```
1. Staff Profile Setup (Mandatory)
   └─> Complete profile information
   └─> Upload profile image
   └─> Verify Zanzibar ID, salary number, ZSSF number

2. Loan Application Creation
   └─> Status: DRAFT
   └─> Specify loan purpose
   └─> Request loan amount
   └─> Auto-calculate monthly deduction (amount ÷ 18)
   └─> Upload required documents

3. Application Submission
   └─> Status: SUBMITTED
   └─> System creates CEO approval stage

4. CEO Review
   └─> Status: CEO_REVIEW
   └─> Assign priority (HIGH/MEDIUM/LOW)
   └─> Decision:
       ├─> APPROVED → Forward to HOD_REVIEW
       ├─> REJECTED → End workflow
       └─> DEFERRED → Return to DRAFT

5. HOD Approval
   └─> Status: HOD_REVIEW
   └─> Department head reviews and approves/rejects
   └─> Add comments
   └─> Forward to Accountant if approved

6. Accountant Review
   └─> Status: ACCOUNTANT_REVIEW
   └─> Financial verification
   └─> Validate monthly deduction feasibility
   └─> Forward to Legal if approved

7. Legal Review
   └─> Status: LEGAL_REVIEW
   └─> Contract preparation
   └─> Legal compliance check
   └─> Create contract document

8. Contract Approval
   └─> CEO reviews and approves contract
   └─> Staff signs contract
   └─> Status: APPROVED

9. Contract Finalization
   └─> Completed contract stored
   └─> Download tracking enabled
   └─> Audit trail complete
```

---

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL 14+
- Maven 3.8+
- Git

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd zheslb_loans/backend
   ```

2. **Configure database:**
   ```bash
   # Create PostgreSQL database
   createdb staffloans_zheslb_db
   ```

3. **Update application.properties:**
   ```properties
   # backend/src/main/resources/application.properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/staffloans_zheslb_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   jwt.secret=your_secure_secret_key
   ```

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access API documentation:**
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - API Docs: http://localhost:8080/v3/api-docs

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Access application:**
   - Frontend: http://localhost:5173
   - Default admin credentials (if seeded):
     - Email: admin@zheslb.go.tz
     - Password: (check seed data)

### Production Build

**Backend:**
```bash
mvn clean package
java -jar target/staffloan-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
npm run build
npm run preview
```

---

## Backend Roadmap

### Phase 1: Core Infrastructure ✅ COMPLETED
- [x] Project setup with Spring Boot 3.5.4
- [x] PostgreSQL database configuration
- [x] Entity models with JPA relationships
- [x] Repository layer with Spring Data JPA
- [x] Service layer with business logic
- [x] RESTful controllers
- [x] DTO pattern implementation
- [x] Exception handling

### Phase 2: Authentication & Authorization ✅ COMPLETED
- [x] JWT token generation and validation
- [x] Spring Security configuration
- [x] Custom UserDetailsService
- [x] JWT authentication filter
- [x] Role-based access control
- [x] Multi-role user support
- [x] Password encryption (BCrypt)
- [x] CORS configuration

### Phase 3: User & Role Management ✅ COMPLETED
- [x] User CRUD operations
- [x] Role CRUD operations
- [x] Multi-role assignment system
- [x] UserRole junction entity with tracking
- [x] Primary role designation
- [x] Email uniqueness validation
- [x] Active/inactive user status
- [x] Role synchronization methods

### Phase 4: Loan Application System ✅ COMPLETED
- [x] Loan application entity and DTOs
- [x] Application details (purpose, amount, deduction)
- [x] Status workflow (DRAFT → APPROVED/REJECTED)
- [x] Priority assignment by CEO
- [x] Application CRUD endpoints
- [x] Get applications by status
- [x] Get my applications endpoint
- [x] CEO decision handling

### Phase 5: Approval Workflow ✅ COMPLETED
- [x] Approval stage entity
- [x] Multi-stage workflow (CEO, HOD, Accountant, Legal)
- [x] Stage status tracking (PENDING, APPROVED, REJECTED, RETURNED)
- [x] Approve/reject/return actions
- [x] Comments and action dates
- [x] Auto-create CEO stage on submission
- [x] Stage progression logic
- [x] Staff approval entity

### Phase 6: Document & Contract Management ✅ COMPLETED
- [x] Document entity with types
- [x] File upload endpoint (multipart)
- [x] File storage in organized directories
- [x] Document download endpoint
- [x] Document replacement
- [x] Contract entity with versioning
- [x] Contract version tracking
- [x] CEO contract approval
- [x] Staff contract signature
- [x] Download count tracking

### Phase 7: Staff Profile Management ✅ COMPLETED
- [x] Staff profile entity
- [x] Profile CRUD operations
- [x] Profile image upload (JPG, 120x150px)
- [x] Zanzibar ID, salary number, ZSSF number fields
- [x] OneToOne relationship with User
- [x] Department and position tracking

### Phase 8: Audit & Compliance ✅ COMPLETED
- [x] Audit log entity with JSONB
- [x] CRUD operation tracking
- [x] Old/new values storage
- [x] IP address tracking
- [x] Audit log query endpoints
- [x] Filter by user, entity, action, date, IP
- [x] Audit statistics
- [x] UserRoleInitializationService for data integrity

### Phase 9: Analytics & Reporting ✅ COMPLETED
- [x] CEO dashboard statistics
- [x] Applications by priority breakdown
- [x] Total amount approved calculation
- [x] Average processing time
- [x] Admin statistics
- [x] Audit log statistics

### Phase 10: API Documentation ✅ COMPLETED
- [x] OpenAPI/Swagger configuration
- [x] Security scheme documentation
- [x] Endpoint descriptions
- [x] DTO schemas
- [x] Example values

### Phase 11: Testing & Quality Assurance 🔄 IN PROGRESS
- [ ] Unit tests for services
- [ ] Integration tests for controllers
- [ ] Repository tests
- [ ] Security tests
- [ ] Test coverage > 80%
- [ ] Load testing
- [ ] Performance optimization

### Phase 12: Production Readiness 📋 PLANNED
- [ ] Environment-based configuration
- [ ] Externalized secrets (JWT secret, DB credentials)
- [ ] Database migration scripts (Flyway/Liquibase)
- [ ] Production logging configuration
- [ ] Error monitoring (Sentry/ELK)
- [ ] Rate limiting
- [ ] API versioning
- [ ] Health check endpoints
- [ ] Metrics and monitoring (Actuator)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

### Phase 13: Advanced Features 🔮 FUTURE
- [ ] Email notifications (application status changes)
- [ ] SMS notifications for approvals
- [ ] Scheduled reports generation
- [ ] Bulk import/export
- [ ] Advanced analytics dashboard
- [ ] Loan repayment tracking
- [ ] Integration with payroll system
- [ ] Mobile app API support
- [ ] Real-time notifications (WebSocket)
- [ ] Document OCR for auto-filling
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Advanced search with Elasticsearch

---

## Frontend Roadmap

### Phase 1: Project Setup ✅ COMPLETED
- [x] React + TypeScript + Vite setup
- [x] Tailwind CSS configuration
- [x] Folder structure organization
- [x] ESLint and TypeScript configuration
- [x] Environment variable setup
- [x] Git repository initialization

### Phase 2: Authentication ✅ COMPLETED
- [x] Login page with gradient design
- [x] JWT token storage (localStorage)
- [x] AuthContext for global state
- [x] Protected route component
- [x] Role-based route guards
- [x] Automatic token injection
- [x] Logout functionality
- [x] Current user display

### Phase 3: Core Components ✅ COMPLETED
- [x] Layout component with header
- [x] Sidebar navigation (role-based)
- [x] Reusable Modal component
- [x] Table component with actions
- [x] StatCard for dashboards
- [x] Card wrapper component
- [x] Loading states
- [x] Error boundaries (basic)

### Phase 4: Admin Features ✅ COMPLETED
- [x] Admin dashboard
- [x] User management (CRUD)
- [x] Role management (CRUD)
- [x] Multi-role assignment modal
- [x] User table with role display
- [x] Add/edit user modals
- [x] Delete confirmation
- [x] View all applications

### Phase 5: Staff Features ✅ COMPLETED
- [x] Staff dashboard
- [x] Profile completion modal (mandatory)
- [x] Profile image upload
- [x] New loan application form
- [x] My applications table
- [x] Application status display
- [x] Auto-calculated monthly deduction
- [x] Application submission

### Phase 6: API Integration ✅ COMPLETED
- [x] Centralized API service (axios)
- [x] AuthService for authentication
- [x] LoanService for applications
- [x] UserService for user management
- [x] RoleService for role management
- [x] DocumentService for file uploads
- [x] Error handling
- [x] TypeScript types for all DTOs

### Phase 7: Role-Based Dashboards ✅ COMPLETED
- [x] CEO dashboard structure
- [x] HOD dashboard structure
- [x] Accountant dashboard structure
- [x] Manager dashboard structure
- [x] Auditor dashboard structure
- [x] Secretary dashboard structure
- [x] CO dashboard structure
- [x] Tab-based navigation
- [x] Statistics display

### Phase 8: Multi-Role Support ✅ COMPLETED
- [x] Multiple role handling in AuthContext
- [x] Primary role identification
- [x] Role checking utilities
- [x] Dashboard routing by primary role
- [x] Role display with crown icon
- [x] Active/inactive role status

### Phase 9: UI/UX Enhancements 🔄 IN PROGRESS
- [x] Gradient design system
- [x] Color-coded status badges
- [x] Responsive grid layouts
- [x] Form validation (basic)
- [x] Success/error notifications
- [ ] Loading skeletons
- [ ] Toast notifications library
- [ ] Improved error messages
- [ ] Empty state illustrations
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Dark mode support

### Phase 10: Approval Workflows 🔄 IN PROGRESS
- [x] Review modal structure
- [x] Approval modal structure
- [ ] CEO priority assignment UI
- [ ] CEO decision actions (Approve/Reject/Defer)
- [ ] HOD approval interface
- [ ] Accountant review interface
- [ ] Legal review interface
- [ ] Stage progression indicators
- [ ] Comments and notes system
- [ ] Application history timeline

### Phase 11: Document Management 📋 PLANNED
- [ ] Document upload interface
- [ ] Document type selector
- [ ] File preview
- [ ] Document list by application
- [ ] Download document button
- [ ] Replace document functionality
- [ ] Document status indicators
- [ ] Drag-and-drop upload
- [ ] Multiple file upload
- [ ] File size/type validation

### Phase 12: Contract Management 📋 PLANNED
- [ ] Contract creation interface
- [ ] Contract version list
- [ ] CEO contract approval UI
- [ ] Staff signature interface (e-signature)
- [ ] Contract download
- [ ] Version comparison view
- [ ] Change reason modal
- [ ] Download count display

### Phase 13: Analytics & Reporting 📋 PLANNED
- [ ] CEO statistics integration
- [ ] Applications by priority chart
- [ ] Processing time graphs
- [ ] Amount approved trends
- [ ] Department-wise statistics
- [ ] Monthly/yearly comparisons
- [ ] Export to PDF/Excel
- [ ] Custom date range filters
- [ ] Chart libraries (Chart.js/Recharts)

### Phase 14: Advanced Features 🔄 IN PROGRESS
- [ ] Search and filtering
- [ ] Pagination controls
- [ ] Sorting on table columns
- [ ] Advanced filters modal
- [ ] Bulk actions
- [ ] Data export functionality
- [ ] Print views
- [ ] Keyboard shortcuts
- [ ] Real-time notifications
- [ ] Activity feed

### Phase 15: Testing 🔮 FUTURE
- [ ] Unit tests with Jest
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Visual regression tests
- [ ] Accessibility tests
- [ ] Performance testing
- [ ] Test coverage > 80%

### Phase 16: Production Readiness 🔮 FUTURE
- [ ] Environment-specific builds
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Service Worker for offline support
- [ ] PWA manifest
- [ ] Code splitting optimization
- [ ] Bundle size optimization
- [ ] CDN setup
- [ ] Deployment pipeline
- [ ] Monitoring and analytics

### Phase 17: Mobile Optimization 🔮 FUTURE
- [ ] Mobile-first redesign
- [ ] Touch-friendly interactions
- [ ] Native mobile app (React Native)
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Offline mode
- [ ] App store deployment

---

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication
All endpoints (except login and email check) require JWT token:
```
Authorization: Bearer <token>
```

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register user (Admin only)
- `GET /auth/me` - Get current user
- `GET /auth/check-email?email=...` - Check email availability

#### Loan Applications
- `POST /loan-applications` - Create application
- `GET /loan-applications` - Get all applications
- `GET /loan-applications/{id}` - Get application by ID
- `PUT /loan-applications/{id}` - Update application
- `PUT /loan-applications/{id}/priority` - Set priority
- `PUT /loan-applications/{id}/ceo-decision` - CEO decision
- `GET /loan-applications/getMyLoanApplicationsWithDetails` - My applications
- `GET /loan-applications/ceo-stats` - CEO statistics

#### Approval Stages
- `POST /approval-stages` - Create stage
- `GET /approval-stages/application/{applicationId}` - Get stages by application
- `PUT /approval-stages/{id}/approve` - Approve stage
- `PUT /approval-stages/{id}/reject` - Reject stage
- `PUT /approval-stages/{id}/return` - Return for revision

#### Users & Roles
- `GET /users` - Get all users
- `POST /users` - Create user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /admin/role-management/users` - Get users with roles
- `POST /admin/role-management/assign-roles` - Assign multiple roles

#### Documents
- `POST /documents/upload` - Upload document
- `GET /documents/download/{id}` - Download document
- `GET /documents/application/{applicationId}` - Get application documents

#### Contracts
- `POST /contracts` - Create contract
- `GET /contracts/application/{applicationId}` - Get contract
- `PUT /contracts/{id}/ceo-approve` - CEO approval
- `PUT /contracts/{id}/staff-sign` - Staff signature

For complete API documentation, visit: **http://localhost:8080/swagger-ui.html**

---

## Security

### Authentication
- **JWT Tokens:** 24-hour expiration, HMAC-SHA signing
- **Password Hashing:** BCrypt with configurable strength
- **Token Storage:** Frontend localStorage (consider httpOnly cookies for production)

### Authorization
- **Role-Based Access Control (RBAC):** 9 distinct roles
- **Method-Level Security:** `@PreAuthorize` annotations
- **Route Guards:** Protected routes based on user roles
- **Multi-Role Support:** Users can have multiple active roles

### Data Protection
- **Input Validation:** Jakarta Validation on all DTOs
- **SQL Injection Prevention:** JPA parameterized queries
- **XSS Prevention:** React automatic escaping
- **CSRF:** Disabled (stateless JWT, not cookie-based)
- **CORS:** Restricted to specific origins

### File Security
- **Upload Size Limit:** 10MB max
- **File Type Validation:** Document type restrictions
- **UUID Filenames:** Prevent path traversal
- **Organized Storage:** Type-based subdirectories

### Audit Trail
- **Complete Logging:** All CRUD operations tracked
- **IP Tracking:** Source IP for all actions
- **User Attribution:** Who did what and when
- **Immutable Logs:** Audit logs cannot be modified

### Production Recommendations
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/TLS
- [ ] Implement rate limiting
- [ ] Add CSRF protection if using cookies
- [ ] Use httpOnly cookies for tokens
- [ ] Implement refresh token mechanism
- [ ] Add IP whitelisting for admin operations
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

---

## Current Implementation Status

### Backend Status: 90% Complete

**Completed:**
- Core infrastructure and architecture
- Database schema and entities
- Authentication and authorization
- User and role management (multi-role)
- Loan application CRUD
- Approval workflow system
- Document upload/download
- Contract management with versioning
- Staff profile with image upload
- Audit logging system
- CEO and admin statistics
- API documentation (Swagger)

**In Progress:**
- Unit and integration testing
- Performance optimization

**Pending:**
- Production configuration
- Email notification system
- Advanced analytics
- Deployment pipeline

### Frontend Status: 75% Complete

**Completed:**
- Project setup and architecture
- Authentication system
- Role-based routing
- Admin dashboard and user management
- Staff dashboard and loan application
- Multi-role support
- API integration layer
- Core UI components
- Responsive design

**In Progress:**
- Approval workflow UI integration
- Document management interface
- Analytics dashboards

**Pending:**
- Contract management UI
- Advanced search and filtering
- Real-time notifications
- Testing suite
- Production build optimization

---

## Future Enhancements

### Short-Term (Next 3 months)
1. Complete approval workflow UI integration
2. Implement document management interface
3. Add contract signing with e-signature
4. Email notifications for status changes
5. Advanced search and filtering
6. Complete test coverage
7. Production deployment

### Mid-Term (3-6 months)
1. Mobile application (React Native)
2. Real-time notifications (WebSocket)
3. Payment gateway integration
4. Payroll system integration
5. Advanced analytics and reporting
6. Multi-language support (English/Swahili)
7. Loan repayment tracking
8. Bulk operations

### Long-Term (6-12 months)
1. AI-powered risk assessment
2. Predictive analytics for loan approval
3. Automated document verification (OCR)
4. Blockchain-based contract verification
5. Integration with government systems
6. Mobile biometric authentication
7. Voice-enabled interface
8. Advanced fraud detection

---

## Project Structure

```
zheslb_loans/
├── backend/
│   ├── src/main/java/com/zheslb/staffloan/
│   │   ├── config/              # Security, CORS, OpenAPI
│   │   ├── controller/          # REST endpoints
│   │   ├── dto/                 # Request/Response DTOs
│   │   ├── enums/               # Status, types constants
│   │   ├── exception/           # Custom exceptions
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Spring Data repositories
│   │   ├── security/            # JWT, UserDetails
│   │   └── service/             # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── target/                  # Compiled classes
│   ├── uploads/                 # File storage
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Role-based pages (60+)
│   │   ├── services/            # API integration
│   │   ├── context/             # React Context
│   │   ├── hooks/               # Custom hooks
│   │   ├── types/               # TypeScript definitions
│   │   ├── constants/           # App constants
│   │   └── utils/               # Utility functions
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linters and tests
4. Submit pull request
5. Code review
6. Merge to main

### Coding Standards
- **Backend:** Follow Java naming conventions, use Lombok
- **Frontend:** TypeScript strict mode, functional components
- **Git:** Conventional commits (feat, fix, docs, etc.)
- **Testing:** Minimum 80% coverage

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

---

## License

Copyright © 2025 ZHESLB (Zanzibar Higher Education Students' Loan Board)

---

## Contact & Support

**Developer:** ZHESLB IT Department
**Email:** it@zheslb.go.tz
**Documentation:** http://localhost:8080/swagger-ui.html
**Version:** 1.0.0
**Last Updated:** January 2025

---

## Acknowledgments

Built with modern technologies to serve ZHESLB staff with efficient, transparent, and secure loan management.

**Key Technologies:**
- Spring Boot Team
- React Team
- Tailwind CSS Team
- PostgreSQL Global Development Group

---

**Status:** 🚧 Active Development | ✅ Production Ready (Backend 90%, Frontend 75%)
