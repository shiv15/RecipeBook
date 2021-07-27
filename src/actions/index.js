import { actionTypes } from "./types";
import hackerNews from "../api/spoonacular";

const JSON_QUERY = ".json?print=pretty";
const PAGE_LIMIT = 20;

const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);


export const setTheme = (payload = {}) => {
    return {
        type: actionTypes.SET_THEME,
        payload
    };
}

export const setLike = (payload = {}) => {
    const { liked, recipe, recipes, likedRecipes } = payload;
    const { id } = recipe;
    const index = recipes.findIndex(item => item.id === id);

    recipe.isLiked = liked;

    let newLikedRecipes = [];
    if (liked) {
        newLikedRecipes = [...likedRecipes, recipe];
    } else {
        newLikedRecipes = likedRecipes.filter(item => item.isLiked === false);
    }


    return {
        type: actionTypes.SET_LIKE,
        payload: { recipes, newLikedRecipes }
    };
}

export const fetchRecipes = (payload = {}) => async dispatch => {
    try {

        dispatch({ type: actionTypes.FETCH_STORY_IDS_REQUEST, payload: payload });

        const response = await hackerNews.get(`/random?apiKey=${process.env.REACT_APP_API_KEY2}&number=100`);
        const recipes = response.data.recipes;
        for(const i in recipes){
            recipes[i].isLiked = false;
        }
        dispatch({ type: actionTypes.FETCH_RECIPE_SUCCESS, payload: recipes });
    
        // return recipes;

    } catch (error) {
        dispatch({ type: actionTypes.FETCH_STORY_IDS_FAILURE, payload: error })
    }
}

// export const fetchStories = (payload = {}) => async dispatch => {
//     try {
//         dispatch({ type: actionTypes.FETCH_STORIES_REQUEST, payload: payload });
//         const { recipes } = payload;

//         // const { begin, end } = getPageSlice(PAGE_LIMIT, page);
//         // const activeIDs = getPageValues({ begin, end, items: storyIDs });

//         // const storyPromises = activeIDs.map(async (id) => {
//         //     const response = await hackerNews.get(`/item/${id}${JSON_QUERY}`);
//         //     return response.data;
//         // });
//         // Wait for all recipes to return at same time
//         return getTopStoriesByPage(recipes, page)
//             .then(recipes => {
//                 recipes.forEach((recipe) => {
//                     recipe.isLiked = false;
//                 });
//                 dispatch({ type: actionTypes.FETCH_STORIES_SUCCESS, payload: recipes })
//             })


//     } catch (error) {
//         dispatch({ type: actionTypes.FETCH_STORIES_FAILURE, payload: error });
//     }
// }
