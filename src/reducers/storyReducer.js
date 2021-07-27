import { actionTypes } from "../actions/types";

const getInitialState = () => ({
    recipes: [],
    recipes: [],
    likedRecipes: [],
    page: 0,
    isFetching: false,
    error: '',
});

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_STORY_IDS_REQUEST:
        case actionTypes.FETCH_STORIES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case actionTypes.FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
            };

        // Add new recipes to previous recipes
        case actionTypes.FETCH_STORIES_SUCCESS:
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload],
                page: state.page + 1,
                isFetching: false,
            }

        case actionTypes.SET_LIKE:
            return {
                ...state,
                recipes: [...action.payload.recipes],
                likedRecipes: action.payload.newLikedRecipes,
            }

        default:
            return state;

    }
};

