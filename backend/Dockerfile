# docker caches each RUN step, so we split up the steps to make subsequent builds faster

FROM openjdk:11-jdk as builder
WORKDIR /src
COPY gradlew /src/
COPY gradle /src/gradle
RUN ./gradlew assemble --no-daemon > /dev/null 2>&1 || true
COPY build.gradle.kts settings.gradle.kts /src/
RUN ./gradlew assemble --no-daemon > /dev/null 2>&1 || true
COPY . /src
WORKDIR /src
RUN ./gradlew assemble --no-daemon
#RUN ./gradlew test --no-daemon -Ptest
RUN ./gradlew bootJar --no-daemon




# Production Stage
FROM openjdk:11-jre
WORKDIR /app
COPY  --from=builder src/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
VOLUME /app/data
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar", "--spring.profiles.active=server", "--spring.config.additional-location=file:/config.yml"]
