# Examo_QA

**Digital Examination Management System**  
**Software Testing and Quality Assurance Module Project**

Examo_QA is a full-stack digital examination management system developed as part of the **Software Testing and Quality Assurance** module. The project focuses on applying testing methodologies, automation tools, performance testing, and quality assurance practices alongside a functional web application.

---

##  Project Objectives

- Apply **Software Testing & QA concepts** in a real-world application
- Implement **unit, integration, system, and automation testing**
- Ensure software **quality, reliability, and performance**
- Practice CI/CD and code quality analysis

---

##  Features

###  Application Features
- User authentication and role-based access
- Exam creation and management
- Question and answer management
- Student exam participation
- Result evaluation and tracking

###  Testing & Quality Assurance
- Unit testing (backend)
- API testing
- UI automation testing (Selenium)
- Performance testing using JMeter
- Code quality analysis with SonarQube
- CI/CD pipelines using GitHub Actions

---

##  Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (Vite) |
| Backend | Java, Spring Boot |
| Database | MySQL |
| Testing | JUnit, Selenium, REST Assured |
| Performance Testing | JMeter |
| CI/CD | GitHub Actions |
| Code Quality | SonarQube |

---

##  Project Structure

```
Examo_QA/
├── frontend/              # React frontend
├── backend/               # Spring Boot backend
├── tests/                 # Test cases & automation scripts
├── performance/           # JMeter test plans
├── .github/workflows/     # CI/CD pipelines
└── README.md
```

---

##  Setup Instructions

### Backend Setup
1. Configure MySQL database
2. Update database credentials in `application.properties`
3. Run the backend:
```bash
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

##  Running Tests

### Unit & API Tests
```bash
mvn test
```

### UI Automation
- Run Selenium test suite from the test module

### Performance Testing
- Execute JMeter `.jmx` files from the `performance` folder

---

