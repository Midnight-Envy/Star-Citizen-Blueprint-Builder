let allBlueprints = [];

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#blueprint-search-form");
  const searchInput = document.querySelector("#blueprint-search-input");
  const blueprintContainer = document.querySelector("#blueprint-container");

  fetchAllBlueprints("https://api.star-citizen.wiki/api/blueprints?page[size]=200")
    .then(blueprints => {

      allBlueprints = blueprints.filter(blueprint => {
        return blueprint.output_name;
      });

      console.log("All blueprints loaded:", allBlueprints.length);
    });

  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();

    const matchingBlueprints = allBlueprints.filter(blueprint => {
      return blueprint.output_name
        .toLowerCase()
        .includes(searchTerm);
    });

    renderBlueprints(matchingBlueprints, blueprintContainer);
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

const renderBlueprints = (blueprints, container) => {
  container.textContent = "";

  if (blueprints.length === 0) {
  container.textContent = "No blueprints found.";

  return;
}

    blueprints.forEach(blueprint => {

    const card = document.createElement("div");
    card.className = "blueprint-card";

    const title = document.createElement("h2");
    title.textContent = blueprint.output_name;

    const craftTime = document.createElement("p");
    craftTime.textContent =
      `Craft Time: ${blueprint.craft_time_label}`;

    const ingredientCount = document.createElement("p");
    ingredientCount.textContent =
      `Ingredient Count: ${blueprint.ingredient_count}`;

    card.append(
      title,
      craftTime,
      ingredientCount
    );

    container.append(card);
  });
};