let allBlueprints = [];

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#blueprint-search-form");
  const searchInput = document.querySelector("#blueprint-search-input");
  const blueprintContainer = document.querySelector("#blueprint-container");
  const blueprintDetails = document.querySelector("#blueprint-details");

  fetchAllBlueprints("https://api.star-citizen.wiki/api/blueprints?page[size]=200")
    .then(blueprints => {

      allBlueprints = blueprints.filter(blueprint => {
        return blueprint.output_name;
      });

      console.log("All blueprints loaded:", allBlueprints.length);
      //I need to console log the blueprint data to see what all the info is so i can refer to it later
      console.log("Blueprint data:", allBlueprints);
    });

  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();

    const matchingBlueprints = allBlueprints.filter(blueprint => {
      return blueprint.output_name
        .toLowerCase()
        .includes(searchTerm);
    });

    renderBlueprints(matchingBlueprints, blueprintContainer, blueprintDetails);
  });
});

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

const renderBlueprints = (blueprints, container, detailsContainer) => {
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
    craftTime.textContent =
      `Craft Time: ${blueprint.craft_time_label}`;

    const ingredientCount = document.createElement("p");
    ingredientCount.textContent =
      `Ingredient Count: ${blueprint.ingredient_count}`;

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

  const heading = document.createElement("h3");
  heading.textContent = "Crafting Materials";

  const list = document.createElement("ul");
  console.log(blueprint.ingredients);

  blueprint.ingredients.forEach(ingredient => {
    const item = document.createElement("li");
    item.textContent =
      `${ingredient.name}: ${ingredient.quantity_scu} SCU`;

    list.append(item);
  });

  container.append(
    title,
    heading,
    list
  );
};