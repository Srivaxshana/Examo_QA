# Security, Performance, and Quality Documentation

## Performance Testing (JMeter)
- Test plan: `performance/jmeter/student_exams_load.jmx`
- Target endpoint: `GET /api/student/exams`
- Load profile: 20 users, 10 loops (200 requests), 10s ramp-up
- How to run (CLI):
```bash
jmeter -n -t performance/jmeter/student_exams_load.jmx -l performance/jmeter/student_exams_results.jtl -e -o performance/jmeter/report
```
- Metrics to capture: average response time, 90th percentile, throughput, error rate.

## OWASP Top 10 Review and Fixes
- Issue 1: Passwords stored in plain text for `Student` entity.
  - Risk: Sensitive Data Exposure (A02:2021)
  - Before (example):
```java
// Student.setStudentPassword("1234");
```
  - Fix: Use BCrypt hashing in service layer before persisting.
```java
// Example approach
// String hash = passwordEncoder.encode(rawPassword);
// student.setStudentPassword(hash);
```
  - Evidence: Add unit test asserting password is not raw and `passwordEncoder.matches` returns true.

- Issue 2: Missing validation on input DTOs (e.g., `ExamDto.title` can be empty)
  - Risk: Injection/Validation issues (A03/A01)
  - Fix: Add Bean Validation annotations like `@NotBlank`, `@Min`, `@Max` in DTOs and enforce via `@Valid` in controllers.
  - Evidence: BDD scenario already expects failure on empty title; add validation to make it systematic.

## Defect Tracking
- Tool: Jira/Bugzilla (external). Provide screenshots/links during viva.
- Logged bugs (examples to create):
  1. Major: Login accepts plain text passwords; root cause: no hashing; fix: BCrypt with `PasswordEncoder`.
  2. Minor: Exam creation allows empty title; root cause: missing `@NotBlank`; fix: add validation annotations and handle errors.
- RCA Template (for one major bug):
  - What happened: Passwords persisted in plain text.
  - Why: Missing password hashing and auth layer.
  - Fix: Introduced BCrypt hashing and tests.
  - Prevention: Add security checklist and unit test coverage gates in CI.

## Software Quality Metrics
- Defect Density
  - Example module: `service` package
  - LOC: collect via `cloc` or IDE.
  - Defects found: count from Jira for this module.
  - Formula: Defect Density = defects / KLOC.
- MTTF
  - Approach: From test cycles, estimate time between observed failures. If synthetic, assume 1 failure per 4 hours of exploratory testing → MTTF ≈ 4h. Document rationale.

## SonarQube
- Local Developer Flow:
```bash
# Start SonarQube (Docker)
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
# Create a token in Sonar UI and set SONAR_TOKEN env var

# Using Maven Scanner
mvn -DskipTests clean verify sonar:sonar \
  -Dsonar.projectKey=examo-backend \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$SONAR_TOKEN
```
- Capture and include: code smells, duplicate code, vulnerabilities; add short remediation notes.

## Presentation Checklist
- Include screenshots of: JMeter summary, SonarQube dashboard, Jira issues, before/after code for OWASP fixes.
