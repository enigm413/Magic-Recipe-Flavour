import { categories } from "./slider.js";

//Selecting necessary elements
const recipesListEl = document.querySelector("#recipes-list");
const pageListEl = document.querySelector("#page-list");
const searchBarEl = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

const apiKey = "6393507cc8fd4df2b0aac17a5641078e";
let pageList = "";

//Function to get the recipes card content
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

//Function to get recipes from api
async function getRecipesData() {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=4&addRecipeInformation=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error Status : ${response.status}`);
    } else {
      const dataFromApi = await response.json();
      return dataFromApi.results;
    }
  } catch (error) {
    console.error(error);
  }
}

//Function to render recipes
async function renderRecipe() {
  const data = await getRecipesData();
  const recipeCardMessage = data
    .map((recipe) => recipesCardTemplate(recipe))
    .join("");
  recipesListEl.innerHTML = recipeCardMessage;
}

//Function to render the page number
function renderPageNumber() {
  const pageNumArr = [...Array(4).keys()].map((pageNum) => pageNum + 1);
  pageList = [...pageNumArr, "Next", "Last"].map((page) => `<li>${page}</li>`);
  pageListEl.innerHTML = pageList;
}

//Function to get Recipes Tags
function getRecipeTag(tagList) {
  const tagMessaage = tagList
    .filter((tags) => categories.includes(tags))
    .map((tags) => `<li>${tags}</li>`)
    .join("");
  return tagMessaage;
}

//Export the necessary
export { renderRecipe, renderPageNumber };
