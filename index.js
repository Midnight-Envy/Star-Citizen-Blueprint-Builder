let allBlueprints = [];
let shoppingCart = [];

const cartUrl = "http://localhost:3000/cart";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#blueprint-search-form");
  const searchInput = document.querySelector("#blueprint-search-input");
  const blueprintContainer = document.querySelector("#blueprint-container");
  const blueprintDetails = document.querySelector("#blueprint-details");
  const clearCartButton = document.querySelector("#clear-cart-button");

  fetchAllBlueprints("https://api.star-citizen.wiki/api/blueprints?page[size]=200")
    .then(blueprints => {
      allBlueprints = blueprints.filter(blueprint => {
        return blueprint.output_name;
      });

      console.log("All blueprints loaded:", allBlueprints.length);
      console.log("Blueprint data:", allBlueprints);
    });

  fetch(cartUrl)
    .then(response => response.json())
    .then(savedCart => {
      shoppingCart = savedCart;
      renderShoppingCart();
    });

  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();

    const matchingBlueprints = allBlueprints.filter(blueprint => {
      return blueprint.output_name
        .toLowerCase()
        .includes(searchTerm);
    });

    renderBlueprintCards(matchingBlueprints, blueprintContainer, blueprintDetails);
  });

  clearCartButton.addEventListener("click", () => {
    clearShoppingCart();
  });
});

const clearShoppingCart = () => {
  const deleteRequests = shoppingCart.map(material => {
    return fetch(`${cartUrl}/${material.id}`, {
      method: "DELETE"
    });
  });

  Promise.all(deleteRequests).then(() => {
    shoppingCart = [];
    renderShoppingCart();
  });
};

const fetchAllBlueprints = url => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const blueprints = data.data;

      if (data.links.next) {
        return fetchAllBlueprints(data.links.next)
          .then(nextBlueprints => {
            return blueprints.concat(nextBlueprints);
          });
      }

      return blueprints;
    });
};

const renderBlueprintCards = (blueprints, container, detailsContainer) => {
  container.textContent = "";

  if (blueprints.length === 0) {
    container.textContent = "No blueprints found.";
    return;
  }

  blueprints.forEach(blueprint => {
    const card = document.createElement("div");
    card.className = "blueprint-card";
    card.dataset.blueprintUuid = blueprint.uuid;

    const title = document.createElement("h2");
    title.textContent = blueprint.output_name;

    const craftTime = document.createElement("p");
    craftTime.textContent = `Craft Time: ${blueprint.craft_time_label}`;

    const ingredientCount = document.createElement("p");
    ingredientCount.textContent = `Ingredient Count: ${blueprint.ingredient_count}`;

    card.addEventListener("click", () => {
      const selectedBlueprint = allBlueprints.find(currentBlueprint => {
        return currentBlueprint.uuid === card.dataset.blueprintUuid;
      });

      renderBlueprintDetails(selectedBlueprint, detailsContainer);
    });

    card.append(
      title,
      craftTime,
      ingredientCount
    );

    container.append(card);
  });
};

const renderBlueprintDetails = (blueprint, container) => {
  container.textContent = "";

  const title = document.createElement("h2");
  title.textContent = blueprint.output_name;

  const cartCheckbox = document.createElement("input");
  cartCheckbox.type = "checkbox";

  const cartLabel = document.createElement("label");
  cartLabel.textContent = " Add materials to shopping cart";

  cartLabel.prepend(cartCheckbox);

  cartCheckbox.addEventListener("change", event => {
    if (event.target.checked) {
      addIngredientsToCart(blueprint.ingredients);
    }
  });

  const heading = document.createElement("h3");
  heading.textContent = "Crafting Materials";

  const list = document.createElement("ul");

  blueprint.ingredients.forEach(ingredient => {
    const item = document.createElement("li");

    item.textContent =
      `${ingredient.name}: ${normalizeQuantityScu(ingredient)} SCU`;

    list.append(item);
  });

  container.append(
    title,
    cartLabel,
    heading,
    list
  );
};

const normalizeQuantityScu = ingredient => {
  if (ingredient.quantity_scu !== null) {
    return ingredient.quantity_scu;
  }

  return ingredient.quantity / 1000;
};

const addIngredientsToCart = ingredients => {
  ingredients.forEach(ingredient => {
    const normalizedQuantity = normalizeQuantityScu(ingredient);

    const existingMaterial = shoppingCart.find(material => {
      return material.name === ingredient.name;
    });

    if (existingMaterial) {
      existingMaterial.quantity_scu += normalizedQuantity;

      fetch(`${cartUrl}/${existingMaterial.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity_scu: existingMaterial.quantity_scu
        })
      })
        .then(response => response.json())
        .then(() => {
          renderShoppingCart();
        });
    } else {
      const newMaterial = {
        name: ingredient.name,
        quantity_scu: normalizedQuantity
      };

      fetch(cartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMaterial)
      })
        .then(response => response.json())
        .then(savedMaterial => {
          shoppingCart.push(savedMaterial);
          renderShoppingCart();
        });
    }
  });
};

const renderShoppingCart = () => {
  const shoppingCartList = document.querySelector("#shopping-cart-list");

  shoppingCartList.textContent = "";

  shoppingCart.forEach(material => {
    const item = document.createElement("li");

    item.textContent =
      `${material.name}: ${material.quantity_scu} SCU`;

    shoppingCartList.append(item);
  });
};