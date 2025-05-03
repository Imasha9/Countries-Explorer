
# CountriesExplorer - React Application

## Overview

CountryExplorer is a React-based web application that allows users to explore information about countries around the world. The application consumes data from the REST Countries API and provides an intuitive interface to search, filter, and view detailed information about different countries.

![CountryExplorer Screenshot](https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22331618/blob/main/Screenshot%202025-05-03%20175356.png)

## Live Demo

[Visit CountryExplorer](https://country-explorer-react.netlify.app)

## Features

- View a list of all countries with key information
- Search for countries by name
- Filter countries by region and language
- View detailed information about each country
- Responsive design for various screen sizes
- User authentication and session management
- Save favorite countries (for authenticated users)

## Technology Stack

- **Frontend**: React (with functional components and hooks)
- **Language**: JavaScript
- **CSS Framework**: Material ui
- **State Management**: React Context API
- **Testing**: Jest and React Testing Library
- **Hosting**: Netlify
- **Version Control**: Git/GitHub

## REST Countries API Integration

The application integrates with the following endpoints from the REST Countries API:

1. `GET /all` - Retrieves a list of all countries
2. `GET /name/{name}` - Searches countries by name
3. `GET /region/{region}` - Filters countries by region
4. `GET /alpha/{code}` - Gets detailed information about a specific country

## Setup and Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22331618.git
   cd countries-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. open new terminal
   ```
   cd backend
   npm install
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. The application will be available at `http://localhost:3000`

## Building for Production

1. Create an optimized production build
   ```bash
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory

## Deployment

The application is deployed on Netlify. To deploy to your own Netlify account:

1. Create a Netlify account if you don't have one
2. Install the Netlify CLI
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify
   ```bash
   netlify login
   ```
4. Deploy the application
   ```bash
   netlify deploy --prod
   ```

## Usage Instructions

### Browsing Countries

- Upon loading the application, you'll see a list of all countries with basic information
- Use the search bar at the top to search for countries by name
- Use the region dropdown to filter countries by continent
- Use the language dropdown to filter countries by spoken languages

### Viewing Country Details

- Click on any country card to view detailed information about that country
- The details page includes information such as:
  - Official name
  - Population
  - Area
  - Capital(s)
  - Languages
  - Currencies
  - Bordering countries
  - Flag and coat of arms

### User Authentication

1. Click on the "Login" button in the top-right corner
2. Enter your credentials or register a new account
3. Once logged in, you can:
   - Save countries to your favorites list
   - View your favorite countries
   - Customize your viewing preferences

## Project Structure

```
country-explorer/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── CountryCard.jsx
│   │   ├── CountryDetails.jsx
│   │   ├── CountryList.jsx
│   │   ├── FilterDropdown.jsx
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── CountryContext.jsx
│   ├── hooks/
│   │   ├── useCountries.jsx
│   │   └── useAuth.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CountryDetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── ...
│   ├── services/
│   │   ├── api.jsx
│   │   └── auth.jsx
│   ├── utils/
│   │   
│   ├── App.jsx
│   └── index.jsx
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Testing

Run the test suite with:

```bash
npm test
```

The application includes:
- Unit tests for individual components
- Integration tests for API interactions
- End-to-end tests for user flows

## API Report

### API Selection and Implementation

The REST Countries API was chosen for this project due to its comprehensive data about countries worldwide and its well-documented, reliable endpoints. The application uses the following endpoints:

1. **GET /all**
   - Used to fetch the initial list of all countries
   - Data is cached to improve performance on subsequent visits

2. **GET /name/{name}**
   - Implements real-time search functionality
   - Debouncing is applied to minimize API calls during typing

3. **GET /region/{region}**
   - Allows filtering countries by continental regions
   - Combined with client-side filtering for optimal user experience

4. **GET /alpha/{code}**
   - Retrieves detailed information for individual country pages
   - Includes additional data not available in the basic country list

### Challenges and Solutions

1. **Challenge**: Managing large datasets returned by the API
   - **Solution**: Implemented pagination and lazy loading to improve performance and reduce initial load time

2. **Challenge**: Handling inconsistent data formats across different countries
   - **Solution**: Created normalization functions that standardize data before displaying it to the user, ensuring a consistent user experience regardless of data variations

3. **Challenge**: Implementing efficient search across multiple attributes
   - **Solution**: Developed a client-side search algorithm that filters already-fetched countries when possible, falling back to API search for more comprehensive queries

4. **Challenge**: Maintaining responsive design across various screen sizes
   - **Solution**: Used Tailwind CSS's responsive utility classes and custom media queries to ensure the application looks good on devices from mobile phones to large desktop screens

5. **Challenge**: Implementing secure user authentication
   - **Solution**: Created a separate authentication service with JWT tokens and secure storage, implementing proper token refresh mechanisms and session timeout handling





