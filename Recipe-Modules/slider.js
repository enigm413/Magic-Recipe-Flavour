//Selecting necessary elements
const prevBtnEl = document.querySelector("#prev-btn");
const nextBtnEl = document.querySelector("#next-btn");
const categoriesListEl = document.querySelector("#categories-list");

//Defining Global Variables and constants
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

const CARD_PER_PAGE = 6;
const sliderList = ["", ...categories, ""];
let startIndex = 0;

//Function to preload categories Image
function preloadCategoryImages() {
  categories.forEach((imagePath) => {
    const categoriesImage = new Image();
    categoriesImage.src = `Images/Categories/${imagePath}.jpg`;
  });
}

//Function to create single category card
function createCategoryCard(val) {
  return `
    <li class="card">
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
}

//Function to render the card
function renderCategoryCards() {
  const endIndex = Math.min(startIndex + CARD_PER_PAGE, sliderList.length);
  const categoriesCardMessage = sliderList
    .slice(startIndex, endIndex)
    .map((card) => createCategoryCard(card))
    .join("");
  categoriesListEl.innerHTML = categoriesCardMessage;
  isBtnVisible(endIndex);
}

//Function to check button is visible
function isBtnVisible(endIndex) {
  nextBtnEl.classList.toggle("display-none", endIndex >= categories.length);
  prevBtnEl.classList.toggle("display-none", startIndex <= 0);
}

//Function to handle the slide
function handleSlide(btnType) {
  if (btnType === "next" && startIndex + CARD_PER_PAGE < sliderList.length) {
    startIndex++;
  }

  if (btnType === "prev" && startIndex > 0) {
    startIndex--;
  }

  renderCategoryCards();
}

//Add the event litsner
nextBtnEl.addEventListener("click", () => handleSlide("next"));
prevBtnEl.addEventListener("click", () => handleSlide("prev"));

//Export necessary values
export { categories, renderCategoryCards };
