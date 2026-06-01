## User Stories

### Feature 1: Search Blueprints and Display Results

**Event Listener:** `submit`

#### User Story

As a user, I want to search for Star Citizen blueprints so that I can quickly find craftable items that interest me.

#### Details

- User enters a search term into a form.
- A submit event triggers a request to the Star Citizen Wiki API.
- Matching blueprints are displayed as cards on the page.
- Results are rendered dynamically without reloading the page.

---

### Feature 2: Display Blueprint Crafting Materials

**Event Listener:** `click`

#### User Story

As a user, I want to click a blueprint so that I can view the materials required to craft it.

#### Details

- User clicks a blueprint card.
- The application displays blueprint details in a dedicated information panel.
- Required ingredients and crafting information are displayed dynamically.

---

### Feature 3: Add Blueprint Materials to Shopping Cart

**Event Listener:** `change`

#### User Story

As a user, I want to save blueprint materials to a shopping cart so that I can keep track of everything I need to gather.

#### Details

- User selects an option to add a blueprint to their shopping cart.
- The application updates a running list of required materials.
- Multiple blueprints can contribute materials to the same shopping cart.
- Material quantities are combined when duplicate materials exist.

---
