const domUpdates = {

  list: null,
  pages: null,

  displayElement(hide, show)  {
    hide.map((element) => {
      element.classList.add('hidden');
    });
  show.classList.remove('hidden');
  },

  makeList(recipe, method) {
    if(method === 'ingredient'){
      var list = recipe.getIngredients(domUpdates.list);
      var displayList = list.reduce((string, ingredient) => {
      string += `<li class="recipe-select-ingredient">${ingredient}</li>`;
      return string;
      }, " ");
      } else if(method === 'instructions'){
      var list = recipe.getInstructions();
      var displayList = list.reduce((string, instruction) => {
      string += `<li class="instruction">${instruction}</li>`;
      return string;
      }, " ");
    };
    return displayList;
  },

  showRecipes(recipeInfo, ingredients) {
    let renderer = " ";
      recipeInfo.recipes.map(recipe => {
      const ingredientList = domUpdates.makeList(recipe, "ingredient");
      renderer +=
      `<section class="recipe-select-box">
        <h1 class="recipe-select-name">${recipe.name}</h1>
        <div class="recipe-content-box">
          <img class="recipe-pic" src="${recipe.image}" alt="Recipe image">
          <ul class="recipe-select-ingredients">
            ${ingredientList}
          </ul>
        </div>
        <button onclick="domUpdates.displayElement(domUpdates.pages, domUpdates.pages[2]);domUpdates.formatRecipeCard(event.target.classList.value);" id="view-recipe-btn" class="${recipe.name}">View Recipe</button>
      </section>`;
    domUpdates.pages[4].innerHTML = renderer;
    });
  },

  formatRecipeCard(event) {
    let currentRecipe = assignCurrentRecipe(event)
    const ingredientList = domUpdates.makeList(currentRecipe, 'ingredient');
    const instructionList = domUpdates.makeList(currentRecipe, 'instructions');
    const price = currentRecipe.getCostOfIngredients(domUpdates.list);
    let renderer = "";
    const card =
    `<h1 class="recipe-title">${currentRecipe.name}</h1>
    <section class="recipe-card">
      <header>
        <p class="card-section-title">Ingredients:</p>
      </header>
      <article class="ingredients-section">
        <ul class="recipe-card-ingredients">
          ${ingredientList}
        </ul>
      </article>
      <section class="cost-info-section">
        <p class="recipe-cost">Ingredient Cost: ${price}</p>
        <button class="add-ingredients-btn">Add To Shopping List!</button>
      </section>
      <p class="card-section-title">Instructions:</p>
      <article class="instructions">
        <ol class="instructions-list">
          ${instructionList}
        </ol>
      </article>
      </section>
      <section class="save-buttons">
        <button onclick="saveRecipe(event.target.innerText)"
        class="recipes-to-save-btn">Add To Saved Recipes</button>
        <button onclick="saveRecipe(event.target.innerText)"
        class="recipes-to-save-btn">Add To Favorites</button>
      </section>`;
    renderer = card;
    domUpdates.pages[2].innerHTML = renderer;
  },

  renderRecipes(recipes, location, string) {
    let stringify = JSON.stringify(string);
    location.innerHTML = '';
    recipes.map((recipe) => {
    location.innerHTML +=
    `<section class="saved-recipe-box">
       <p onclick="assignCurrentRecipe(event.target.innerText);formatRecipeCard(event.target.innerText);domUpdates.displayElement(domUpdates.pages, domUpdates.pages[2]);" class="list-item">${recipe.name}</p>
       <img onclick='deleteRecipe(event, ${stringify})' class="trashcan" src='images/  delete.png'/>
     </section>`;
   });
  },
};

window.domUpdates = domUpdates;

window.showRecipeCard = domUpdates.showRecipeCard;

window.formatRecipeCard = domUpdates.formatRecipeCard;

export { domUpdates };