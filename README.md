# UEX - Hubert Ryan (Test)

Interactive Map Project with React, Vite, and Google Maps API

## Description

This project is a web application developed with React and Vite that integrates the Google Maps API to provide information about contacts and locations. I use the Google Maps API's Places and Geocode services, as well as the Viacep API for ZIP code information and the IBGE API for additional data about Brazilian states.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Modern build tool that provides a fast development experience.
- **Google Maps API**: API for integrating maps and advanced functionalities.
- **Viacep API**: API for querying ZIP code information.
- **IBGE API**: API for obtaining information about Brazilian states and municipalities.

To simulate a database, I use **local storage** to store, persist and update your data and your session within the service.

## Features

- **Map Visualization**: Display of interactive maps using the Google Maps API.
- **Location Search**: Use of the Places service for searching addresses and locations.
- **Geolocation**: Use of the Geocode service to convert addresses into geographic coordinates such as latitude and longitude.
- **ZIP Code Lookup**: Access to the Viacep service for ZIP code information in the form.
- **IBGE Data**: Display of detailed information about states using the IBGE API.

## Environment Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/HubertRyanOfficial/uex-hubertryan.git
   cd uex-hubertryan
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Google Maps API

3. In this project, I'm using **Google Maps APIs**, specifically the **Places API (Legacy)** and **Geocode**, to ensure the application's functionalities work correctly. Therefore, before proceeding to the third step, you need to create a new google cloud project and activating these services in your **Google Cloud** account by accessing [this link]('https://console.cloud.google.com/google/maps-apis/api-list') and obtaining your API key.

   To be able to add your credentials you can follow the example of the env file found in the root `.env.example` and replace it with your real `.env` as explained below:

   Configure the environment variables:

   Create a `.env` file in the project root and add the following variables:

   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   Replace `your_google_maps_api_key` with your Google Maps API key.

4. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

## Usage

1. Open your browser and go to `http://localhost:5173/`.
2. Create a new account in sign up tab and log in with your credentials.
3. Use the interface to create and manage contacts. You can add a name, CPF, phone number, and addresses. The application uses the Google Maps API to retrieve and display location information.
4. The data is stored and persisted using local storage, simulating a database to maintain your contacts and session data across service interactions.
5. Explore the position of each contact by selecting with the checkbox and opening the map automatically.
