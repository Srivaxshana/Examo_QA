# SonarQube Setup (Local)

1) Start SonarQube locally (Docker):
```
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```
2) Open http://localhost:9000, create a project and generate a token.
3) Export token before analysis:
```
export SONAR_TOKEN=YOUR_TOKEN
```
4) Run Maven scanner from backend dir:
```
cd examo-backend/examo-backend
mvn -DskipTests clean verify sonar:sonar \
  -Dsonar.projectKey=examo-backend \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$SONAR_TOKEN
```
5) Review dashboard: code smells, duplicates, vulnerabilities. Capture screenshots and add remediation notes.
