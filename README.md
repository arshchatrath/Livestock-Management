# 🐄 Community Livestock Health Management System

A comprehensive web application designed to help rural farmers manage livestock health, vaccinations, and veterinary connections.

![System Preview](https://res.cloudinary.com/dwxqmdtjk/image/upload/v1747940882/a5fa7f92-f99f-4f99-bb25-e1416812ad7f.png)

## Table of Contents

- [🌟 Overview](#-overview)
- [🔑 Key Features](#-key-features)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [📘 Usage Guide](#-usage-guide)
- [🔮 Future Roadmap](#-future-roadmap)
- [👥 Contributors](#-contributors)

## 🌟 Overview

### Bridging Technology and Animal Husbandry

A digital solution designed to empower rural farming communities through modern livestock management tools. The system enables:

- Digital health records for animals
- Vaccination schedule tracking
- Veterinary service coordination
- Community health trend analysis
- Mobile-first accessibility

## 🔑 Key Features

### Farmer Portal
- **📝 Livestock Registration**  
  Create digital profiles with unique IDs and biometric data
- **💉 Vaccination Tracker**  
  Automated reminders and history logging
- **🩺 Health Monitoring**  
  Symptom checker and treatment records
- **👨⚕️ Vet Connect**  
  Real-time veterinary availability check

### Admin Dashboard
- **📊 Analytics Hub**  
  Community health insights and trend visualization
- **📅 Health Camp Planner**  
  Event management with participation tracking
- **🔔 Alert System**  
  Disease outbreak notifications
- **📋 Resource Management**  
  Vaccine inventory and vet directory

## 💻 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React** + TypeScript
- **Tailwind CSS** with shadcn/ui
- **Chart.js** for data visualization

### Backend
- **Node.js** runtime
- **Next.js API** Routes
- **MySQL** Database
- **Prisma** ORM

### Infrastructure
- **Docker** containerization
- **NGINX** reverse proxy
- **AWS EC2** deployment

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- PNPM package manager

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/livestock-system.git
cd livestock-system

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
```

### Database Setup
```bash
# Start MySQL service
sudo systemctl start mysql

# Initialize database
pnpm db:init
```

### Running the Application
```bash
# Development mode
pnpm dev

# Production build
pnpm build && pnpm start
```

## 📂 Project Structure

```plaintext
livestock-system/
├── app/                   # Next.js 14 App Router
│   ├── (admin)/           # Admin route group
│   ├── (farmer)/          # Farmer route group
│   ├── api/               # API endpoints
│   └── auth/              # Authentication handlers
├── components/
│   ├── dashboard/         # Interactive widgets
│   └── livestock/         # Animal management UI
├── lib/
│   ├── database/          # DB connection
│   └── validators/        # Form validation
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets
```

## 📘 Usage Guide

### Farmer Workflow
1. **Registration**
   - Create account with phone verification
   - Set up farm profile

2. **Add Livestock**
   - Scan RFID tags or manual entry
   - Upload animal photos

3. **Health Management**
   - Record daily observations
   - Schedule vet visits

4. **Vaccination Tracking**
   - Receive SMS reminders
   - Log vaccine batches

### Admin Operations
1. **Community Overview**
   - Monitor vaccination rates
   - Track disease patterns

2. **Resource Allocation**
   - Manage vaccine inventory
   - Coordinate vet assignments

3. **Reporting**
   - Generate health certificates
   - Export compliance reports

## 🔮 Future Roadmap

- **Mobile Offline Support**  
  PWA implementation for low-connectivity areas

- **AI Diagnostics**  
  Machine learning models for symptom analysis

- **Blockchain Integration**  
  Immutable health record keeping

- **IoT Compatibility**  
  Sensor integration for vital monitoring

- **Multi-language Support**  
  Local dialect interfaces

## 👥 Contributors

- **Arsh Chatrath**  
  [![GitHub](https://img.shields.io/badge/GitHub-arshchatrath-blue)](https://github.com/arshchatrath)  
  Backend Architecture & Database Design

- **Rhea Singhal**  
  [![GitHub](https://img.shields.io/badge/GitHub-RheaSinghal-green)](https://github.com/RheaSinghal)  
  Frontend Development & UI/UX

- **Kanav Dhandha**  
  [![GitHub](https://img.shields.io/badge/GitHub-kanavdhanda-blue)](https://github.com/kanavdhanda)  
  Backend Integration
