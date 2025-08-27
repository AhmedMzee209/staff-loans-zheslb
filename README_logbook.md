# Staff Loans System Project Logbook

This logbook documents the weekly progress, tasks, methods, learnings, and reflections for the development of the Staff Loans System project, which consists of a Spring Boot backend (2 weeks) and a React + TypeScript frontend (6 weeks).

---

## Week 1 (Backend)

**Monday:**
- Project setup: initialized Spring Boot project, configured PostgreSQL database, set up Maven dependencies.
- Created base package structure and initial entities (User, Role, LoanApplication).

**Tuesday:**
- Implemented user authentication and JWT security.
- Set up user registration and login endpoints.

**Wednesday:**
- Developed user management endpoints (CRUD for users and roles).
- Configured JPA repositories and tested database connectivity.

**Thursday:**
- Implemented loan application entity and repository.
- Created endpoints for submitting and retrieving loan applications.

**Friday:**
- Added approval workflow entities (ApprovalStage, enums for status).
- Integrated approval logic and endpoints.

**General Weekly Report:**
- **Description:** Set up backend foundation, user management, authentication, and loan application logic.
- **Methods:** Used Spring Boot, JPA, REST, JWT, PostgreSQL.
- **Learnings:** Gained experience in Spring Security, entity relationships, and RESTful API design.
- **Unanswered Questions:** How to best structure approval workflow for scalability.
- **Positive Experience:** Successfully integrated authentication and database.
- **Negative Experience:** Faced some issues with entity mapping and security configuration.

---

## Week 2 (Backend)

**Monday:**
- Added endpoints for approval stages and workflow.
- Implemented statistics endpoints for admin dashboard (user/app counts, approval rate).

**Tuesday:**
- Wrote unit and integration tests for user and loan application modules.
- Improved error handling and validation.

**Wednesday:**
- Documented API using Swagger/OpenAPI.
- Refactored code for maintainability.

**Thursday:**
- Performed end-to-end testing of backend APIs.
- Fixed bugs found during testing.

**Friday:**
- Prepared backend for deployment.
- Wrote backend documentation and usage instructions.

**General Weekly Report:**
- **Description:** Completed backend features, added statistics, testing, and documentation.
- **Methods:** TDD, Swagger, refactoring, deployment prep.
- **Learnings:** Improved skills in testing, API documentation, and debugging.
- **Unanswered Questions:** How to optimize queries for large datasets.
- **Positive Experience:** Backend is stable and feature-complete.
- **Negative Experience:** Some challenges with test data setup.

---

## Week 3 (Frontend)

**Monday:**
- Initialized React + Vite project, set up TypeScript and Tailwind CSS.
- Planned frontend folder structure.

**Tuesday:**
- Implemented authentication context and login page.
- Set up routing and protected routes.

**Wednesday:**
- Created basic layout components (Sidebar, Header, Layout).
- Integrated user authentication with backend.

**Thursday:**
- Developed user registration and management UI for admin.
- Connected user management to backend APIs.

**Friday:**
- Added role management UI and modal dialogs.
- Tested user/role management flows.

**General Weekly Report:**
- **Description:** Set up frontend foundation, authentication, and user/role management.
- **Methods:** React hooks, context API, REST API integration.
- **Learnings:** Deepened understanding of React context and protected routes.
- **Unanswered Questions:** Best way to handle global error messages.
- **Positive Experience:** Fast UI prototyping with Tailwind and Vite.
- **Negative Experience:** Some issues with async state updates.

---

## Week 4 (Frontend)

**Monday:**
- Implemented loan application submission form.
- Connected form to backend API.

**Tuesday:**
- Built loan application list and detail views.
- Added filtering and searching.

**Wednesday:**
- Developed approval workflow UI for different roles.
- Integrated approval actions with backend.

**Thursday:**
- Added notifications and status indicators.
- Improved UI responsiveness.

**Friday:**
- Performed user testing and gathered feedback.
- Fixed UI bugs and improved accessibility.

**General Weekly Report:**
- **Description:** Developed loan application and approval workflow UI.
- **Methods:** Form handling, API integration, user testing.
- **Learnings:** Improved skills in form validation and user feedback.
- **Unanswered Questions:** How to best visualize approval progress.
- **Positive Experience:** Smooth integration with backend APIs.
- **Negative Experience:** Some complexity in managing approval state.

---

## Week 5 (Frontend)

**Monday:**
- Implemented admin dashboard with statistics cards.
- Fetched real-time stats from backend.

**Tuesday:**
- Added recent applications table to dashboard.
- Improved dashboard layout and responsiveness.

**Wednesday:**
- Developed audit logs and system settings pages.
- Connected audit logs to backend (if available).

**Thursday:**
- Enhanced dashboard with monthly/weekly stats.
- Added loading and error states.

**Friday:**
- Performed cross-browser testing.
- Fixed layout and styling issues.

**General Weekly Report:**
- **Description:** Built and refined admin dashboard and supporting pages.
- **Methods:** Data visualization, responsive design, error handling.
- **Learnings:** Learned about dashboard UX and data fetching patterns.
- **Unanswered Questions:** How to optimize dashboard for large data.
- **Positive Experience:** Dashboard is visually appealing and functional.
- **Negative Experience:** Some challenges with data synchronization.

---

## Week 6 (Frontend)

**Monday:**
- Implemented user profile and settings pages.
- Added profile editing and password change features.

**Tuesday:**
- Developed notifications and messaging components.
- Integrated with backend for real-time updates (if available).

**Wednesday:**
- Improved accessibility and mobile responsiveness.
- Added more unit tests for components.

**Thursday:**
- Performed code review and refactoring.
- Updated documentation.

**Friday:**
- Deployed frontend to test environment.
- Collected feedback from users.

**General Weekly Report:**
- **Description:** Added user profile, notifications, and improved code quality.
- **Methods:** Accessibility, testing, deployment.
- **Learnings:** Gained experience in accessibility and deployment workflows.
- **Unanswered Questions:** How to automate more frontend tests.
- **Positive Experience:** Users found the UI intuitive.
- **Negative Experience:** Some deployment configuration issues.

---

## Week 7 (Frontend)

**Monday:**
- Added advanced filtering and reporting features.
- Implemented export to CSV/PDF for reports.

**Tuesday:**
- Enhanced application and approval history views.
- Improved performance for large datasets.

**Wednesday:**
- Integrated additional analytics and charts.
- Refined dashboard visualizations.

**Thursday:**
- Conducted user acceptance testing (UAT).
- Fixed bugs reported during UAT.

**Friday:**
- Prepared release notes and final documentation.
- Planned for production deployment.

**General Weekly Report:**
- **Description:** Focused on reporting, analytics, and final testing.
- **Methods:** Data export, analytics, UAT.
- **Learnings:** Learned about data visualization and user acceptance testing.
- **Unanswered Questions:** How to further optimize analytics queries.
- **Positive Experience:** Users appreciated the reporting features.
- **Negative Experience:** Some performance bottlenecks with large data.

---

## Week 8 (Frontend & Project Wrap-up)

**Monday:**
- Finalized all features and fixed remaining bugs.
- Cleaned up codebase and removed unused files.

**Tuesday:**
- Conducted final round of testing and QA.
- Ensured all documentation is up to date.

**Wednesday:**
- Deployed project to production environment.
- Monitored deployment and fixed any urgent issues.

**Thursday:**
- Collected final feedback from users and stakeholders.
- Documented lessons learned and future improvements.

**Friday:**
- Prepared project presentation and demo.
- Submitted final project deliverables.

**General Weekly Report:**
- **Description:** Wrapped up project, deployment, and documentation.
- **Methods:** QA, deployment, feedback collection, presentation.
- **Learnings:** Learned about project delivery and stakeholder communication.
- **Unanswered Questions:** How to maintain and scale the project post-launch.
- **Positive Experience:** Successful deployment and positive user feedback.
- **Negative Experience:** Some last-minute bug fixes and deployment stress.

---

# General Project Reflection

This project provided hands-on experience in full-stack development, including backend API design, frontend UI/UX, authentication, data visualization, and deployment. Each week brought new challenges and learning opportunities, from setting up secure authentication to building responsive dashboards and handling real-world data. The iterative process of development, testing, and feedback was invaluable for improving both technical and soft skills.

---
