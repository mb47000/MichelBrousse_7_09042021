const RecipeCard = (recipe) => {

    let recipeCard = document.createElement("article");
    recipeCard.className = `card`;
    let ingredientsList = recipe.getIngredients();
    recipeCard.innerHTML = `
    <img src="dist/img/placeholder.png" alt="..." />
    <div class="card-body">
      <div class="card-body-top">
        <h2 class="title">${recipe.getName()}</h2>
        <span><i class="far fa-clock"></i> ${recipe.getTime()} min</span>
      </div>
      <div class="card-body-bottom">
        <ul>
          <li><span>Lait de coco:</span> 400ml</li>
          <li><span>Jus de citron:</span> 2</li>
          <li><span>Créme de coco:</span> 4 cuillères</li>
          <li><span>Sucre:</span> 20g</li>
          <li><span>Glaçons:</span> 2</li>
        </ul>
        <p>
            ${recipe.getDescription()}
        </p>
      </div>
    </div>
    `;
    
    document.querySelector('.cards-container').appendChild(recipeCard);    
}

export default RecipeCard;


    
