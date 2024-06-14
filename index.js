//Selecting necessary elements
const prevBtnEl = document.querySelector("#prev-btn");
const nextBtnEl = document.querySelector("#next-btn");
const categoriesListEl = document.querySelector("#categories-list");

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

let startIndex = 0;
let intervalID = null;
const categoriesCardNum = 6;

//Initial Card Rendering
renderCategoriesCard();

//Handling Mouse Hover event
nextBtnEl.addEventListener("mouseenter", () => handleMouseEnter("next"));
prevBtnEl.addEventListener("mouseenter", () => handleMouseEnter("prev"));
nextBtnEl.addEventListener("mouseleave", () => clearInterval(intervalID));
prevBtnEl.addEventListener("mouseleave", () => clearInterval(intervalID));

//Function to get the categories card content
function getCategoriesCardContents(val) {
  const categoriesCardContent = `
    <li class="card">
      <a href="#" class="card-link">
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

//Function to check button is visible
function isBtnVisible() {
  nextBtnEl.classList.toggle(
    "display-none",
    startIndex + categoriesCardNum >= categories.length + 2
  );
  prevBtnEl.classList.toggle("display-none", startIndex <= 0);
}

//Function to handle hover the card
function handleMouseEnter(btnType) {
  clearInterval(intervalID);
  intervalID = setInterval(() => {
    if (
      startIndex + categoriesCardNum <= categories.length + 1 &&
      btnType === "next"
    ) {
      startIndex++;
    } else if (startIndex > 0 && btnType === "prev") {
      startIndex--;
    } else {
      clearInterval(intervalID);
    }
    renderCategoriesCard();
  }, 1000);
}

//Function to render the card
function renderCategoriesCard() {
  let categoriesCardMessage = "";
  const endIndex = Math.min(
    startIndex + categoriesCardNum,
    categories.length + 2
  );
  for (let num = startIndex; num < endIndex; num++) {
    categoriesCardMessage += getCategoriesCardContents(categories[num - 1]);
  }
  categoriesListEl.innerHTML = categoriesCardMessage;
  isBtnVisible();
}
