# Naveena AutomationLabs Testing Project
https://naveenautomationlabs.com/opencart/

## Overview
This repository contains automated tests for the Naveena AutomationLabs platform, implemented using Playwright for comprehensive testing scenarios. The project covers smoke tests and regression tests to ensure functionality and reliability.

## Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

## Setup
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/SiMail03/QA-Project.git
   cd QA-Project

2. Initialize the project with npm.
    ```bash
    npm init

3. Install Playwright.
     ```bash
     npm install @playwright/test
     npx playwright install

## Running Tests

### Run All Tests 
     npx playwright test 

### Run All Tests (Headed Mode)
    npx playwright test --headed
    
### Run Tests in Specific Browsers
1. Chromium:
   ```bash
   npx playwright test --browser=chromium

2. WebKit:
    ```bash
   npx playwright test --browser=webkit

3. Firefox:
     ```bash
    npx playwright test --browser=firefox

### Run Smoke Tests Only
   
    
    npx playwright test tests/smoke
    
    
### Run Regression Tests Only
    
    
    npx playwright test tests/regression

## Test Scenarios

### Smoke Tests
    Create Account
    Home Page
    Log in/Log out
    Search Item
    Shopping Cart

### Regression Tests
    Create Account
    Footer
    Forgot Password
    Login
    Order History
    Product Details
    Search Item
    User Profile
    Wishlist
   
