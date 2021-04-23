const RecipeCard = (recipe) => {
  let recipeCard = document.createElement("article");
  recipeCard.className = `card`;
  let ingredientsList = recipe.getIngredients();
  let ingredientsListHtml = '';
  
  ingredientsList.forEach((list) => {
    ingredientsListHtml += `<li><span>${list.ingredient}:</span> ${list.quantity ?? list.quantite ?? ''}${list.unit ?? ''}</li>`;
  });

  recipeCard.innerHTML = `
    <img src="dist/img/placeholder.png" alt="..." />
    <div class="card-body">
      <div class="card-body-top">
        <h2 class="title">${recipe.getName()}</h2>
        <span><i class="far fa-clock"></i> ${recipe.getTime()} min</span>
      </div>
      <div class="card-body-bottom">
        <ul>
          ${ingredientsListHtml}
        </ul>
        <p>
            ${recipe.getDescription()}
        </p>
      </div>
    </div>
    `;

  document.querySelector(".cards-container").appendChild(recipeCard);
};

export default RecipeCard;
