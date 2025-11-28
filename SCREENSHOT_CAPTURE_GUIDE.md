# Screenshot Capture Guide for Practical Training Report

This guide provides detailed instructions for capturing all screenshots needed for your practical training report.

## Prerequisites

1. **Start the application:**
   ```bash
   # Terminal 1 - Start Backend
   cd backend
   mvn spring-boot:run

   # Terminal 2 - Start Frontend
   cd frontend
   npm run dev
   ```

2. **Prepare test data:**
   - Ensure you have users with different roles (Admin, Staff, CEO, HOD, Accountant)
   - Create sample loan applications in various stages
   - Have some test documents uploaded

3. **Screenshot tools:**
   - **Linux:** Use `gnome-screenshot` or `Shift+PrtScn` for selection
   - **Windows:** Use `Snipping Tool` or `Win+Shift+S`
   - **Mac:** Use `Cmd+Shift+4`

---

## Screenshot List (20 Images Total)

### Chapter 1 Images

No images required in Chapter 1.

---

### Chapter 2 Images

#### **Figure 2.1: ZHESLB Organizational Structure**
- **Location:** Create in PowerPoint/Draw.io or similar
- **What to show:** Organizational hierarchy chart with Board → CEO → Departments
- **Size:** Full width (6-7 inches)
- **File name:** `fig2-1_organizational_structure.png`
- **Description:** Shows the hierarchical structure of ZHESLB from Board of Directors down to department staff

**How to create:**
1. Use Microsoft PowerPoint or Draw.io
2. Create boxes for: Board of Directors, CEO, 4 Department Heads, Staff under each
3. Connect with lines showing reporting structure
4. Export as PNG (high resolution, 1200x800 pixels minimum)

---

### Chapter 3 Images

#### **Figure 3.1: System Architecture Diagram**
- **Location:** Create in draw.io (https://app.diagrams.net/)
- **What to show:** Three-tier architecture (Frontend ↔ Backend ↔ Database)
- **Size:** Full width (6-7 inches)
- **File name:** `fig3-1_system_architecture.png`
- **Description:** Illustrates the three-tier architecture showing React frontend, Spring Boot backend, and PostgreSQL database with connecting arrows

**How to create:**
1. Open draw.io
2. Create three layers:
   - Top: Frontend (React + TypeScript + Tailwind CSS)
   - Middle: Backend (Spring Boot + Spring Security + JWT)
   - Bottom: Database (PostgreSQL)
3. Add arrows showing HTTP/REST communication
4. Export as PNG (1200x600 pixels)

---

#### **Figure 3.2: Loan Application Workflow**
- **Location:** Create in draw.io or PowerPoint
- **What to show:** Flowchart from Draft → CEO → HOD → Accountant → Legal → Approved
- **Size:** Full width (6-7 inches)
- **File name:** `fig3-2_loan_workflow.png`
- **Description:** Flowchart depicting the complete loan application workflow from submission through multi-stage approval to final approval or rejection

**How to create:**
1. Create flowchart with decision diamonds and process boxes
2. Show all stages: DRAFT, SUBMITTED, CEO_REVIEW, HOD_REVIEW, ACCOUNTANT_REVIEW, LEGAL_REVIEW, APPROVED, REJECTED
3. Include decision points (Approve/Reject/Defer)
4. Use different colors for different outcomes
5. Export as PNG (1200x1000 pixels)

---

#### **Figure 3.3: Database Entity Relationship Diagram**
- **Location:** Create in draw.io or use database tool
- **What to show:** ERD showing all 12 tables and their relationships
- **Size:** Full page width (6-7 inches)
- **File name:** `fig3-3_database_erd.png`
- **Description:** Entity Relationship Diagram showing all database tables (users, roles, loan_applications, etc.) and their relationships with primary/foreign keys

**How to create:**
1. Use draw.io or dbdiagram.io
2. Create boxes for each table with fields
3. Draw relationship lines (1-to-1, 1-to-many, many-to-many)
4. Mark primary keys (PK) and foreign keys (FK)
5. Export as PNG (1400x1000 pixels)

---

#### **Figure 3.4: Authentication Flow Diagram**
- **Location:** Create in draw.io
- **What to show:** JWT authentication sequence diagram
- **Size:** Full width (6-7 inches)
- **File name:** `fig3-4_auth_flow.png`
- **Description:** Sequence diagram showing JWT authentication flow from login request through token generation, storage, and subsequent authenticated requests

**How to create:**
1. Create sequence diagram with: User, Frontend, Backend, Database
2. Show steps: Login → Validate → Generate JWT → Store Token → Use Token
3. Export as PNG (1200x800 pixels)

---

### Appendix A: System Screenshots (Main Screenshots)

#### **Figure A.1: Login Page**
- **URL:** http://localhost:5173/login
- **What to capture:**
  - Full login page with email and password fields
  - "Remember me" checkbox
  - Login button
  - ZHESLB branding/header
- **Size:** Browser width 1280px, capture full viewport
- **File name:** `figA-1_login_page.png`
- **Description:** User login interface with email and password authentication fields, featuring gradient design and ZHESLB branding

**How to capture:**
1. Navigate to login page
2. DO NOT fill in credentials (show empty fields)
3. Set browser to 1280x800 resolution
4. Capture full viewport
5. Save as PNG

---

#### **Figure A.2: Staff Profile Completion Modal**
- **URL:** http://localhost:5173/staff (login as staff user first)
- **What to capture:**
  - Profile completion modal overlay
  - All form fields: First Name, Last Name, Department, Position, etc.
  - Profile image upload section
  - Save/Cancel buttons
- **Size:** Centered modal, capture with background
- **File name:** `figA-2_staff_profile_modal.png`
- **Description:** Mandatory staff profile completion modal requiring personal information and profile image upload before loan application

**How to capture:**
1. Login as staff user without complete profile
2. Modal should auto-open
3. Fill sample data (optional for visual)
4. Capture entire modal with dimmed background
5. Save as PNG

---

#### **Figure A.3: Staff Dashboard - New Loan Application**
- **URL:** http://localhost:5173/staff
- **What to capture:**
  - Complete staff dashboard
  - "New Application" button prominent
  - "My Applications" tab selected
  - Statistics cards at top
  - Empty or populated applications table
- **Size:** Full viewport (1280x800)
- **File name:** `figA-3_staff_dashboard.png`
- **Description:** Staff dashboard showing overview statistics, new application button, and list of submitted loan applications with status tracking

**How to capture:**
1. Login as staff user
2. Navigate to staff dashboard
3. Ensure "Overview" or "My Applications" tab is selected
4. Capture full viewport showing header, stats, and table
5. Save as PNG

---

#### **Figure A.4: New Loan Application Form**
- **URL:** http://localhost:5173/staff (click "New Application")
- **What to capture:**
  - Complete loan application form
  - Loan Purpose textarea
  - Requested Amount input
  - Auto-calculated Monthly Deduction (read-only)
  - Deduction Period (18 months)
  - Submit and Cancel buttons
- **Size:** Full modal or form area
- **File name:** `figA-4_loan_application_form.png`
- **Description:** Loan application form interface showing purpose input, amount fields, and auto-calculated monthly deduction based on 18-month repayment period

**How to capture:**
1. Click "New Application" button
2. Fill sample data:
   - Loan Purpose: "Home renovation"
   - Requested Amount: "5000000"
   - Shows Monthly Deduction: "277,777.78"
3. Capture complete form
4. Save as PNG

---

#### **Figure A.5: Admin Dashboard - Overview**
- **URL:** http://localhost:5173/admin
- **What to capture:**
  - Admin dashboard with statistics cards
  - Tab navigation (Overview, Users, Roles, Applications, etc.)
  - Key metrics displayed
  - Quick action buttons
- **Size:** Full viewport (1280x800)
- **File name:** `figA-5_admin_dashboard.png`
- **Description:** Administrator dashboard displaying system-wide statistics including total users, active applications, pending approvals, and system health metrics

**How to capture:**
1. Login as admin user
2. Navigate to admin dashboard
3. Ensure "Overview" tab selected
4. Capture showing statistics cards and navigation
5. Save as PNG

---

#### **Figure A.6: Admin User Management Interface**
- **URL:** http://localhost:5173/admin (Users tab)
- **What to capture:**
  - "Users" tab selected
  - Users table with columns: Email, Roles, Status, Actions
  - "Add User" button
  - Edit/Delete action buttons visible
  - Role badges with different colors
- **Size:** Full viewport (1280x800)
- **File name:** `figA-6_admin_user_management.png`
- **Description:** User management interface showing user list with email addresses, assigned roles (with primary role indicator), active status, and action buttons for editing and deleting users

**How to capture:**
1. Login as admin
2. Click "Users" tab
3. Ensure table has several users visible
4. Show role badges with crown icon for primary role
5. Capture full viewport
6. Save as PNG

---

#### **Figure A.7: Multi-Role Assignment Modal**
- **URL:** http://localhost:5173/admin (Users tab → Assign Roles button)
- **What to capture:**
  - Modal title "Assign Roles to User"
  - User email dropdown or display
  - Checkboxes for multiple roles
  - Primary role radio buttons
  - Save and Cancel buttons
- **Size:** Centered modal
- **File name:** `figA-7_multi_role_assignment.png`
- **Description:** Multi-role assignment modal allowing administrators to assign multiple concurrent roles to users and designate a primary role

**How to capture:**
1. Click "Assign Roles" button for a user
2. Modal opens with role checkboxes
3. Check 2-3 roles
4. Select one as primary
5. Capture modal with selections
6. Save as PNG

---

#### **Figure A.8: Add/Edit User Modal**
- **URL:** http://localhost:5173/admin (Users tab → Add User)
- **What to capture:**
  - Modal with form fields: Email, Password, Role selection
  - Active status toggle
  - Save and Cancel buttons
- **Size:** Centered modal
- **File name:** `figA-8_add_user_modal.png`
- **Description:** User creation/editing modal with email, password, role selection, and active status fields for administrator to manage user accounts

**How to capture:**
1. Click "Add User" button
2. Fill sample data:
   - Email: "newuser@zheslb.go.tz"
   - Password: "••••••••"
   - Role: Select one
3. Capture modal
4. Save as PNG

---

#### **Figure A.9: Role Management Interface**
- **URL:** http://localhost:5173/admin (Roles tab)
- **What to capture:**
  - Roles table showing: Role Name, Description, User Count, Actions
  - "Add Role" button
  - All 9 roles visible (ADMIN, CEO, HOD, STAFF, etc.)
  - Edit/Delete buttons
- **Size:** Full viewport (1280x800)
- **File name:** `figA-9_role_management.png`
- **Description:** Role management interface displaying all system roles with descriptions, user counts, and administrative actions for creating, editing, and deleting roles

**How to capture:**
1. Login as admin
2. Click "Roles" tab
3. Ensure all roles are visible
4. Capture showing role table
5. Save as PNG

---

#### **Figure A.10: CEO Dashboard with Statistics**
- **URL:** http://localhost:5173/ceo
- **What to capture:**
  - CEO dashboard with strategic metrics
  - Statistics cards: Total Applications, Pending Review, Approved, Rejected
  - Applications by Priority chart/breakdown
  - Total Amount Approved
  - Average Processing Time
- **Size:** Full viewport (1280x800)
- **File name:** `figA-10_ceo_dashboard.png`
- **Description:** CEO strategic dashboard displaying high-level statistics including applications by priority level, total amounts approved, approval rates, and average processing times

**How to capture:**
1. Login as CEO user
2. Navigate to CEO dashboard
3. Ensure statistics are populated
4. Capture showing all metrics
5. Save as PNG

---

#### **Figure A.11: CEO Pending Applications Review**
- **URL:** http://localhost:5173/ceo (Pending Review tab)
- **What to capture:**
  - "Pending CEO Review" tab selected
  - Applications table with: Application ID, Staff Name, Amount, Purpose, Date
  - Review/Action buttons for each application
  - Priority assignment options
- **Size:** Full viewport (1280x800)
- **File name:** `figA-11_ceo_pending_review.png`
- **Description:** CEO pending review interface showing loan applications awaiting CEO approval with details and action buttons for priority assignment and approval decisions

**How to capture:**
1. Login as CEO
2. Click "Pending Review" tab
3. Show applications waiting for CEO review
4. Capture table with action buttons
5. Save as PNG

---

#### **Figure A.12: CEO Priority Assignment Modal**
- **URL:** http://localhost:5173/ceo (click Review button)
- **What to capture:**
  - Application details summary
  - Priority selection (HIGH/MEDIUM/LOW radio buttons)
  - Comments textarea
  - Decision buttons: Approve, Reject, Defer
- **Size:** Centered modal
- **File name:** `figA-12_ceo_priority_modal.png`
- **Description:** CEO decision modal for reviewing loan applications, assigning priority levels (High/Medium/Low), adding comments, and making approval decisions

**How to capture:**
1. Click "Review" on an application
2. Modal shows application details
3. Select a priority level
4. Add sample comment
5. Capture modal
6. Save as PNG

---

#### **Figure A.13: HOD Dashboard - Department Applications**
- **URL:** http://localhost:5173/hod
- **What to capture:**
  - HOD dashboard
  - Department-specific applications
  - Pending approvals for HOD
  - Approval statistics
- **Size:** Full viewport (1280x800)
- **File name:** `figA-13_hod_dashboard.png`
- **Description:** Head of Department dashboard showing applications from department staff requiring HOD approval with departmental statistics

**How to capture:**
1. Login as HOD user
2. Navigate to HOD dashboard
3. Show department applications
4. Capture viewport
5. Save as PNG

---

#### **Figure A.14: Accountant Dashboard - Financial Review**
- **URL:** http://localhost:5173/accountant
- **What to capture:**
  - Accountant dashboard
  - Applications pending financial review
  - Financial details and calculations
  - Approval/reject options
- **Size:** Full viewport (1280x800)
- **File name:** `figA-14_accountant_dashboard.png`
- **Description:** Accountant dashboard displaying loan applications requiring financial verification with amount details, deduction schedules, and approval actions

**How to capture:**
1. Login as accountant user
2. Navigate to accountant dashboard
3. Show financial review interface
4. Capture viewport
5. Save as PNG

---

#### **Figure A.15: Application Status Flow**
- **URL:** Any dashboard showing application details
- **What to capture:**
  - Application detail view
  - Status progression indicator
  - Timeline or stepper showing: Draft → CEO → HOD → Accountant → Legal → Approved
  - Current stage highlighted
- **Size:** Section of screen or full modal
- **File name:** `figA-15_application_status_flow.png`
- **Description:** Visual status flow indicator showing loan application progression through approval stages with current stage highlighted

**How to capture:**
1. Open an application in any dashboard
2. Show status progression/timeline
3. Capture status flow component
4. Save as PNG

---

#### **Figure A.16: Document Upload Interface**
- **URL:** Staff or Admin dashboard (Document section)
- **What to capture:**
  - Document upload button
  - Document type dropdown (Zanzibar ID, Payslip, etc.)
  - File selection interface
  - Uploaded documents list
- **Size:** Section or modal
- **File name:** `figA-16_document_upload.png`
- **Description:** Document upload interface allowing users to upload required documents (Zanzibar ID, payslip, ZSSF card, bank slip) with file type selection and upload status

**How to capture:**
1. Navigate to document upload section
2. Show upload interface
3. Include file type dropdown
4. Capture upload area
5. Save as PNG

---

#### **Figure A.17: Audit Log Viewer**
- **URL:** http://localhost:5173/admin (Audit Logs tab)
- **What to capture:**
  - Audit logs table
  - Columns: Date/Time, User, Action, Entity, Details
  - Filter options (by user, date, action type)
  - Pagination controls
- **Size:** Full viewport (1280x800)
- **File name:** `figA-17_audit_logs.png`
- **Description:** Comprehensive audit log viewer showing all system activities with user actions, timestamps, entity changes, and filtering capabilities for compliance tracking

**How to capture:**
1. Login as admin
2. Navigate to "Audit Logs" tab
3. Ensure logs are visible
4. Show filters if available
5. Capture viewport
6. Save as PNG

---

#### **Figure A.18: Applications Table with Status Badges**
- **URL:** Admin or Manager dashboard (Applications tab)
- **What to capture:**
  - Applications table with multiple entries
  - Status badges in different colors:
    - DRAFT (gray)
    - SUBMITTED (blue)
    - CEO_REVIEW (yellow)
    - APPROVED (green)
    - REJECTED (red)
  - Action buttons
- **Size:** Table section
- **File name:** `figA-18_applications_status_table.png`
- **Description:** Applications table displaying loan requests with color-coded status badges, priority indicators, amounts, and administrative actions

**How to capture:**
1. Navigate to applications view
2. Ensure multiple applications with different statuses
3. Show color-coded status badges
4. Capture table section
5. Save as PNG

---

#### **Figure A.19: System Architecture Deployment View**
- **Location:** Create in draw.io
- **What to show:** Deployment architecture with servers, database, frontend hosting
- **Size:** Full width (6-7 inches)
- **File name:** `figA-19_deployment_architecture.png`
- **Description:** Deployment architecture diagram showing frontend server (Vite/Nginx), backend application server (Spring Boot), database server (PostgreSQL), and file storage

**How to create:**
1. Create deployment diagram
2. Show: Frontend Server, Backend Server, Database Server, File Storage
3. Include network connections
4. Export as PNG (1200x700 pixels)

---

#### **Figure A.20: Mobile Responsive View**
- **URL:** Any dashboard page
- **What to capture:**
  - Browser in mobile view (375px width)
  - Responsive layout working
  - Mobile navigation (hamburger menu if applicable)
- **Size:** Mobile viewport (375x667)
- **File name:** `figA-20_mobile_responsive.png`
- **Description:** Mobile responsive view of the application showing adaptive layout and mobile-friendly navigation

**How to capture:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone SE or similar (375px width)
4. Navigate to any dashboard
5. Capture mobile view
6. Save as PNG

---

## Post-Capture Checklist

After capturing all screenshots:

- [ ] All 20 images captured and saved with correct filenames
- [ ] Images are high quality (minimum 1024px wide for full screenshots)
- [ ] No personal/sensitive data visible in screenshots
- [ ] Images are in PNG format
- [ ] File sizes are reasonable (compress if needed, use TinyPNG.com)
- [ ] Images are stored in organized folder: `report_images/`

---

## Image Optimization

Before inserting into Word document:

1. **Resize large images:**
   ```bash
   # Install ImageMagick if needed
   sudo apt-get install imagemagick

   # Resize maintaining aspect ratio
   convert input.png -resize 1200x output.png
   ```

2. **Compress PNG files:**
   - Visit https://tinypng.com/
   - Upload all images
   - Download compressed versions
   - Typical compression: 40-70% smaller with no visible quality loss

3. **Organize files:**
   ```
   zheslb_loans/
   ├── report_images/
   │   ├── chapter2/
   │   │   └── fig2-1_organizational_structure.png
   │   ├── chapter3/
   │   │   ├── fig3-1_system_architecture.png
   │   │   ├── fig3-2_loan_workflow.png
   │   │   ├── fig3-3_database_erd.png
   │   │   └── fig3-4_auth_flow.png
   │   └── appendix/
   │       ├── figA-1_login_page.png
   │       ├── figA-2_staff_profile_modal.png
   │       └── ... (all other appendix images)
   ```

---

## Quick Start Commands

```bash
# Create images directory
mkdir -p report_images/chapter2 report_images/chapter3 report_images/appendix

# Start the application
cd backend && mvn spring-boot:run &
cd frontend && npm run dev &

# Open browser
firefox http://localhost:5173 &
```

---

## Tips for Great Screenshots

1. **Clean Browser:** Close unnecessary tabs and bookmarks bar
2. **Consistent Size:** Use same browser window size (1280x800 recommended)
3. **Sample Data:** Use realistic but fake data (no real personal info)
4. **Highlight Important Areas:** You can add red boxes/arrows in image editor after capture
5. **Professional Look:** Ensure UI is fully loaded before capturing
6. **Good Lighting:** If photographing diagrams, use good lighting
7. **No Distractions:** Clear desktop background if visible

---

Good luck capturing your screenshots! These images will make your report professional and visually appealing.
