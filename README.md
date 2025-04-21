
![image](https://github.com/user-attachments/assets/db599890-f4b7-4245-b235-d4e038e2ba97)

# Keycloak .NET & Angular Integration

This project demonstrates a full-stack integration of [Keycloak](https://www.keycloak.org/) for authentication and authorization using:

- **Backend**: ASP.NET Core Web API  
- **Frontend**: Angular  
- **Authentication**: Keycloak  

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Keycloak Configuration](#keycloak-configuration)
- [Keycloak Concepts](#keycloak-concepts)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository provides a foundational setup for integrating Keycloak with an ASP.NET Core backend and an Angular frontend. It showcases how to implement secure authentication and authorization mechanisms in a modern web application.

## Features

- User authentication via Keycloak
- Role-based access control
- Secure API endpoints
- Token-based authentication using JWT
- Angular guards for route protection
- Role claim transformation for .NET authorization

## Technologies Used

### Backend
- ASP.NET Core
- C#
- JWT Authentication

### Frontend
- Angular
- TypeScript
- `keycloak-js` npm package

### Authentication
- Keycloak

### Containerization
- Docker
- Docker Compose

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js and npm](https://nodejs.org/)
- [.NET SDK](https://dotnet.microsoft.com/download)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Mohamed-Gnana/keycloak-dotnet-angular.git
cd keycloak-dotnet-angular
```

### Set up Keycloak using Docker Compose:

```bash
docker-compose up -d
```

### Configure Keycloak:

- Access the Keycloak admin console at http://localhost:8080.
- Create a new realm (e.g., MyRealm).
- Create a new client (e.g., my-angular-app) with access type set to confidential.
- Define roles (e.g., user, admin) and assign them to users.
- Create test users and assign them to the created roles.

### Configure the Backend:

In the Keycloak.Authentication project, update appsettings.json:

"Keycloak": {
  "Authority": "http://localhost:8080/auth/realms/MyRealm",
  "ClientId": "my-angular-app",
  "ClientSecret": "your-client-secret"
}

### Configure the Frontend:

In the angular-keycloak-demo directory:

```bash
npm install
```
Update the Keycloak initialization using keycloak-js in a service or app initializer.

### Running the Application
Start the Backend:

```bash
cd Keycloak.TestAPI
dotnet run
```
Start the Frontend:

```bash
cd angular-keycloak-demo
ng serve
```
### Project Structure

keycloak-dotnet-angular/
├── Keycloak.Authentication/       # ASP.NET Core backend
├── Keycloak.TestApi/              # Test API project
├── angular-keycloak-demo/         # Angular frontend
├── docker-compose.yml             # Docker Compose setup for Keycloak
├── Keycloak.sln                   # Solution file
└── README.md                      # Project documentation

### Keycloak Configuration
- Realm: Logical partition in Keycloak for managing users and clients independently.
- Client: An application that wants to use Keycloak for authentication.
- Roles: Define access permissions. Can be realm roles or client-specific roles.
- Users: Registered individuals. Each user can be assigned roles and credentials.
- Groups: Collections of users.
- Identity Providers: External services (e.g., Google, Facebook).
- Mappers: Used to map claims or roles into tokens.

### Keycloak Concepts
- Realms: Isolated groups of users, credentials, roles, and clients.
- Users: Can be created manually or via federated identity providers.
- Roles: Can be associated at the realm or client level. Assigned to users.
- Clients: Represent apps or services connecting to Keycloak.
- Groups: Users can be grouped for easier role management.
- Protocol Mappers: Transform user/role info into token claims.
- Admin Console: UI for managing all of the above.

---

## 📚 Resources

Here are some helpful resources to learn more about Keycloak and how to configure and integrate it:

### 🔗 Official Documentation

- [Keycloak Documentation](https://www.keycloak.org/documentation) — The main reference for installing, configuring, and using Keycloak.
- [Securing Applications and Services Guide](https://www.keycloak.org/docs/latest/securing_apps/) — Learn how to secure different types of applications with Keycloak.
- [Server Administration Guide](https://www.keycloak.org/docs/latest/server_admin/) — Detailed guide for setting up and managing Keycloak servers.
- [Keycloak REST API Docs](https://www.keycloak.org/docs-api/21.1.1/rest-api/index.html) — Explore available Keycloak API endpoints.

### 📘 Community & Learning

- [Keycloak GitHub Repository](https://github.com/keycloak/keycloak) — The source code and issue tracker for Keycloak.
- [Keycloak Discourse](https://keycloak.discourse.group/) — Community discussion forum.
- [Keycloak YouTube Tutorials](https://www.youtube.com/results?search_query=keycloak+tutorial) — Search YouTube for many hands-on Keycloak walkthroughs.
- [Keycloak with Angular Article]([https://www.baeldung.com/keycloak-angular](https://medium.com/%40syedabdullahrahman/keycloak-angular-integration-securing-angular-application-step-by-step-bd185333a304)) — Great article explaining Angular integration.

