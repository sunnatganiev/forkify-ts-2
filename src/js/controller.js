import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for everything
import 'regenerator-runtime/runtime'; // for async await
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}
// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // console.log(error);
    // recipeView.renderError(`${error} 💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // await model.loadSearchResults('pizza');
    // console.log(model.state.search.results);

    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

// controlSearchResults();

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));

(() => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
})();
