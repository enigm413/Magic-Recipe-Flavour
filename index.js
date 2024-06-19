//Selecting necessary elements
const prevBtnEl = document.querySelector("#prev-btn");
const nextBtnEl = document.querySelector("#next-btn");
const categoriesListEl = document.querySelector("#categories-list");
const recipesListEl = document.querySelector("#recipes-list");

//Define Categories array
const categories = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

const categoriesCardNum = 6;
const recipeCardNum = 1;
const apiKey = "6393507cc8fd4df2b0aac17a5641078e";
const sliderCardList = ["", ...categories, ""];
let startIndex = 0;
let endIndex = startIndex + categoriesCardNum;
let intervalID = null;

//Initial Card Rendering
renderCategoriesCard();
renderRecipe();

//Handling Mouse Hover event
nextBtnEl.addEventListener("mouseenter", () => handleMouseEnter("next"));
prevBtnEl.addEventListener("mouseenter", () => handleMouseEnter("prev"));
nextBtnEl.addEventListener("mouseleave", () => clearInterval(intervalID));
prevBtnEl.addEventListener("mouseleave", () => clearInterval(intervalID));

//Function to get the categories card content
function getCategoriesCardContents(val) {
  const categoriesCardContent = `
    <li class="card" id="recipe-card">
      <a href="#section-recipe" class="card-link">
        <div class="image-container">
          <img
            src="Images/Categories/${val}.jpg"
            alt="${val}"
            class="card-image"
          />
        </div>
        <div class="text-container">
          <p class="card-title">${val}</p>
        </div>
      </a>
    </li>`;
  return categoriesCardContent;
}

//Function to get the categories card content
function recipesCardTemplate(val) {
  const recipesCardContent = `
    <li class="card">
      <a href="#" class="card-link">
        <div class="image-container">
          <img
            src=${val.image}
            alt=${val.title}
            class="card-image"
          />
        </div>
        <div class="text-container">
          <div>
            <p class="card-title">${val.title}</p>
            <p class="user-likes">
              (${val.aggregateLikes} users like this recipe)
            </p>
          </div>
          <ul class=tags>${getRecipeTag(val.dishTypes)}</ul>
          <p class="time">
            <span class="material-icons time-icon"> schedule </span>
            ${val.readyInMinutes} mins
          </p>
        </div>
      </a>
      <button class="material-icons fav-btn">favorite_border</button>
    </li>
 `;
  return recipesCardContent;
}

//Function to check button is visible
function isBtnVisible() {
  nextBtnEl.classList.toggle("display-none", endIndex >= sliderCardList.length);
  prevBtnEl.classList.toggle("display-none", startIndex <= 0);
}

//Function to handle hover the card
function handleMouseEnter(btnType) {
  clearInterval(intervalID);
  intervalID = setInterval(() => {
    if (endIndex < sliderCardList.length && btnType === "next") {
      startIndex++;
      endIndex++;
    } else if (startIndex > 0 && btnType === "prev") {
      startIndex--;
      endIndex--;
    } else {
      clearInterval(intervalID);
    }
    renderCategoriesCard();
  }, 1000);
}

//Function to render the card
function renderCategoriesCard() {
  const categoriesCardMessage = sliderCardList
    .slice(startIndex, endIndex)
    .map((categories) => getCategoriesCardContents(categories))
    .join("");
  categoriesListEl.innerHTML = categoriesCardMessage;
  isBtnVisible();
}

//Function to get recipes from api
async function getRecipesData() {
  const respone = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=16&addRecipeInformation=true`
  );
  const dataFromApi = await respone.json();
  console.log(dataFromApi);
  return dataFromApi.results;
}

//Function to render recipes
async function renderRecipe() {
  const data = await getRecipesData();
  const recipeCardMessage = data
    .map((recipe) => recipesCardTemplate(recipe))
    .join("");
  recipesListEl.innerHTML = recipeCardMessage;
}

//Function to get Recipes Tags
function getRecipeTag(tagList) {
  const tagMessaage = tagList
    .filter((tags) => categories.includes(tags))
    .map((tags) => `<li>${tags}</li>`)
    .join("");
  return tagMessaage;
}
