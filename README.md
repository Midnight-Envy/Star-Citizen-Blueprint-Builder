# Star Citizen Blueprint Builder

A Single Page Application (SPA) that helps Star Citizen players search crafting blueprints, view required ingredients, and build a shopping cart of materials they need to gather while playing.

## Project Goal

The goal of this application is to provide players with a simple tool for researching craftable items and planning which resources to collect before beginning a crafting project.

## Features

### Search Blueprints

Users can search for Star Citizen blueprints using data retrieved from the Star Citizen Wiki API.

### View Blueprint Details

Users can click a blueprint card to view additional information, including required crafting materials.

### Build a Shopping Cart

Users can add blueprint materials to a shopping cart that maintains a running list of resources needed across multiple blueprints.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Star Citizen Wiki API

## API

This project uses the Star Citizen Wiki API.

https://api.star-citizen.wiki

## Project Structure

```text
project-folder/
│
├── index.html
├── styles.css
├── index.js
├── README.md
└── user-stories.md
```

## MVP

The minimum viable product includes:

1. Search for blueprints
2. Display blueprint cards
3. Display blueprint ingredients
4. Add blueprint ingredients to a shopping cart

## Future Enhancements

- Blueprint category filters
- Material rarity indicators
- Material quantity totals
- Persistent shopping cart using localStorage
- Crafting time estimates

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate into the project directory

```bash
cd star-citizen-blueprint-builder
```

3. Open `index.html` in your browser

## Author

Thomas Correa

Power Coding Academy - JavaScript Project 1
