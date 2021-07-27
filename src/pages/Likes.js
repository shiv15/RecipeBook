import React from "react";
import NewsList from "../components/NewsList";
import { connect } from 'react-redux';

const Likes = ({ likedRecipes }) => {
    return (
        <main>
            <NewsList recipes={likedRecipes} />
        </main>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        likedRecipes: state.story.likedRecipes,
    }
};

export default connect(mapStateToProps)(Likes);