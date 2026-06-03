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

### Feature 4: Persist Shopping Cart with JSON Server

#### User Story

As a user, I want my shopping cart materials to be saved so that I do not lose my gathering list when the page refreshes.

#### Details

- User selects a blueprint option to add materials to the shopping cart.
- The application sends the selected materials to `json-server`.
- The shopping cart data is saved outside of temporary JavaScript memory.
- When the page loads, the application fetches the saved shopping cart data.
- Previously saved materials are displayed again after refreshing the page.

---

### Feature 5: Style Blueprint Builder Interface

**Event Listener:** `mouseover`

#### User Story

As a user, I want the blueprint builder to have a clean sci-fi interface so that searching, viewing details, and tracking materials feels clear and enjoyable.

#### Details

- Blueprint results are displayed as organized cards.
- The shopping cart is visually separated from the search results.
- The blueprint details section is easy to find and read.
- CSS is used to create a polished Star Citizen-inspired layout.
- Interactive elements have hover effects so users can tell what can be clicked.
- Blueprint cards visually respond when users hover over them.
