# Star Citizen Blueprint Builder

A Single Page Application (SPA) that helps Star Citizen players search crafting blueprints, view required ingredients, and build a shopping cart of materials they need to gather while playing.

## Project Goal

The goal of this application is to provide players with a simple tool for researching craftable items and planning which resources to collect before beginning a crafting project.

## Demo

### Application Walkthrough


https://github.com/user-attachments/assets/a29e8cb8-8b66-4659-ab85-868fd86d3e62



## Features

### Search Blueprints

Users can search for Star Citizen blueprints using data retrieved from the Star Citizen Wiki API.

### View Blueprint Details

Users can click a blueprint card to view additional information, including required crafting materials.

### Build a Shopping Cart

Users can add blueprint materials to a shopping cart that maintains a running list of resources needed across multiple blueprints.

### Persistent Shopping Cart

Materials added to the shopping cart are saved using json-server and automatically reloaded when the application starts.

Duplicate materials are combined into a single entry and quantities are updated automatically.

### Randomized Backgrounds

A random Star Citizen themed background is selected each time the application loads.

### Music Player

A built-in music player selects a random track and allows users to play or pause background music.

### Blueprint Counter

Displays the number of blueprints currently being shown after each search.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- JSON Server
- Star Citizen Wiki API

## API

This project uses the Star Citizen Wiki API.

https://api.star-citizen.wiki

## CRUD Operations

The shopping cart uses json-server to persist data between sessions.

### GET

Load saved shopping cart data.

### POST

Add new materials to the cart.

### PATCH

Update material quantities when duplicates are added.

### DELETE

Remove materials from the shopping cart.

## MVP

The minimum viable product includes:

1. Search for blueprints
2. Display blueprint cards
3. Display blueprint ingredients
4. Add blueprint ingredients to a shopping cart

## Stretch Goal

This project implements the json-server stretch goal by persisting shopping cart data between sessions.

Users can refresh the application and retain their saved crafting materials.

## Future Enhancements

- Favorite blueprints
- Blueprint category filters
- Market value tracking
- Material rarity indicators
- Export shopping lists
- Mobile responsive layout

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate into the project directory

```bash
cd star-citizen-blueprint-builder
```

### 3. Install JSON Server

```bash
npm install -g json-server
```

### 4. Create a db.json file

Create a file named:

```text
db.json
```

with the following contents:

```json
{
  "cart": []
}
```

### 5. Start JSON Server

```bash
json-server --watch db.json
```

This will create:

```text
http://localhost:3000/cart
```

which the application uses to store shopping cart data.

### 6. Launch the Application

Open:

```text
index.html
```

in your browser.

## Author

Thomas Correa

Power Coding Academy - JavaScript Project 1
