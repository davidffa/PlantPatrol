# Build the spring boot project
FROM eclipse-temurin:21-alpine AS builder

WORKDIR /app
COPY . .

RUN ./mvnw -Dmaven.test.skip=true clean package

# Copy the fat-jar and build a smaller docker image
FROM eclipse-temurin:21-alpine

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
