//Accessing the required elements of the html file by their unique id names
const search = document.getElementById('search'),
      submit = document.getElementById('submit'),
      mealsEl = document.getElementById('meals'),
      resultHeading = document.getElementById('result-heading'),
      single_mealEl = document.getElementById('single-meal');

      //Search Meals
      function searchMeal(e){
          e.preventDefault();
    //clear single meal
        single_mealEl.innerHTML = '';

          //get search meal
          const term = search.value;
          
          //Check for empty  
          if(term.trim()) {
             fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
              .then((res) => res.json())
             .then((data) => {
                 console.log(data);
                 resultHeading.innerHTML = `<h2>Search Result for '${term}':</h2>`;

                 if(data.meals === null) {
                     resultHeading.innerHTML = `<h2>There Are No Result for ${term}</h2>`;
                 } else{
                     mealsEl.innerHTML = data.meals.map(meal =>`
                      <div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                      <div class="meal-info" data-mealID="${meal.idMeal}" />
                      <h3>${meal.strMeal}</h3>
                      </div>
                      </div>
                     `)

                     .join('');
                 }
             });

             search.value = '';
          } else {
              alert('Please insert a value in Search');
          }
      }

      //fetch meal by id
      function getMealById(mealID){
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              const meal = data.meals[0];
              addMealToDOM(meal);
          });
      }

      //add meal to dom

      function addMealToDOM(meal){
        const ingredients = [];
    for(let i=0; i <=20; i++){
      if(meal[`strIngredient${i}`]) {
        ingredients.push(`
          ${meal[`strIngredient${i}`]} - ${
            meal[`strMeasure${i}`]
        }
                   `);
            } else {
                break;
            }
        }

        single_mealEl.innerHTML = `
         <div class="single-meal">
           <h1>${meal.strMeal}</h1>
           <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
           <div class="single-meal-info">
           ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
           ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
           </div>
           <div class="main">
           <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
           <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
            </div>
         </div>

        `

      }

      //listener
      submit.addEventListener('submit',searchMeal);
      mealsEl.addEventListener('click',e =>{
          const mealInfo = e.path.find(item => {
              if(item.classList){
                  return item.classList.contains("meal-info");
              } else {
                  return false;
              }
          });
          if(mealInfo){
              const mealID = mealInfo.getAttribute("data-mealid");
              getMealById(mealID);
          } else {

          }
      })
      
