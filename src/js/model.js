import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
};

export const loadRecipe = async (id) => {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (error) {
    // alert(error);
    console.error(`${error} 💥💥💥`);
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const { data } = await getJSON(`${API_URL}?search=${query}`);
    // console.log('data:', data);

    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // console.log('state.search.results:', state.search.results);

  } catch (error) {
    console.error(`${error} 💥💥💥`);
    throw error;
  }
};

// loadSearchResults('pizza');