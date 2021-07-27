import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import { fetchRecipes } from "../actions";
import NewsList from "../components/NewsList";
import Loader from "../components/Loader";
// import { hasMoreStoriesSelector } from '../reducers/selector';


const Home = ({ fetchRecipes, recipes, page, isFetching, hasMoreStories, isLiked }) => {

    const fetchStory = () => {
        if (!isFetching) {
            fetchRecipes();
        }
    }

    useEffect(() => {
        if (recipes.length === 0) {
            fetchRecipes();
        }
    }, []);

    return (
        <main>
            <InfiniteScroll
                dataLength={recipes.length}
                next={fetchStory}
                hasMore={hasMoreStories}
                loader={<Loader />}
                style={{
                    height: '100%',
                    overflow: 'visible'
                }}
            >
                <NewsList recipes={recipes} />
            </InfiniteScroll>
        </main>
    );
};

const mapStateToProps = (state) => {

    return {
        recipes: state.story.recipes,
        page: state.story.page,
        isFetching: state.story.isFetching,
        // hasMoreStories: hasMoreStoriesSelector(state),
    }
};



export default connect(mapStateToProps, { fetchRecipes })(Home);