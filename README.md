# UEX - Hubert Ryan (Test)

Interactive Map Project with React, Vite, and Google Maps API

## Description

This project is a web application developed with React and Vite that integrates the Google Maps API to provide information about contacts and locations. I use the Google Maps API's Places and Geocode services, as well as the Viacep API for ZIP code information and the IBGE API for additional data about Brazilian states.

With this, this application allows the user to log in and create accounts and then create contacts by filling out the form with name, phone number, CPF, zip code, state, city and more detailed address, all with the Google Maps API, Viacep and more. To simulate a database, I use **local storage** to store, persist and update your data and your session within the service.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Modern build tool that provides a fast development experience.
- **Google Maps API**: API for integrating maps and advanced functionalities.
- **Viacep API**: API for querying ZIP code information.
- **IBGE API**: API for obtaining information about Brazilian states and municipalities.

## Features

1.  **Map Visualization**: Display of interactive maps using the Google Maps API.

    You are able to view the position of each contact added to the list using latitude and longitude

2.  **Location Search**: Use of the Places service for searching addresses and locations.

    When creating a new contact, you have an auto-complete list, which can help you find the correct address.

3.  **Geolocation**: Use of the Geocode service to convert addresses into geographic coordinates such as latitude and longitude.

    With Geolocation it converts your address into data that can be used and identified on the map, so you can know the exact location.

4.  **ZIP Code Lookup**: Access to the Viacep service for ZIP code information in the form.

    In the form using via zip code, we can fill in gaps such as zip code and city just by selecting the zip code, getting more details about the address

5.  **IBGE Data**: Display of detailed information about states using the IBGE API.

    It helps to detail which cities are in each state and so on respectively.

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

3. In this project, I'm using **Google Maps APIs**, specifically the **Places API (Legacy)** and **Geocode**, to ensure the application's functionalities work correctly. Therefore, before proceeding to the third step, you need to create a new google cloud project and activating these services in your **Google Cloud** account by accessing [this link](https://console.cloud.google.com/google/maps-apis/api-list) and obtaining your API key.

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

## Conclusion

This project showcases the integration of various APIs to create a functional and interactive web application. By leveraging React and Vite for the frontend and utilizing Google Maps, Viacep, and IBGE APIs, we provide a comprehensive tool for managing contacts and exploring geographic information. The use of local storage ensures data persistence, making this application both practical and efficient. We welcome contributions and feedback to further enhance and expand the functionalities of this project.
