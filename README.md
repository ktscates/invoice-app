# Angular Invoice Management Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [State Management](#state-management)
  - [InvoiceState](#invoicestate)
- [Live Link](#live-link)

## Introduction

This is an invoice management application built using Angular, NgRx, and TailwindCSS. The app allows users to create, edit, and manage invoices with responsive design and a dark/light mode toggle.

## Features

- Create new invoices
- Edit existing invoices
- Mark invoices as paid or draft
- Responsive layout with a sidebar and drawer for editing
- Dark and light mode toggle with persistence across sessions

## Technologies Used

- Angular for frontend framework
- NgRx for state management
- TailwindCSS for styling

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/invoice-app.git
   cd invoice-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    ng serve
    ```
    Open your browser and navigate to `http://localhost:4200/`.

## State Management

### InvoiceState

This state handles the management of invoices, including creating, updating, deleting, and fetching invoices. It also manages the currently selected invoice for editing.

## Live Link

You can access the deployed application at [Invoice App](https://ktscates-invoice-app.netlify.app/).
