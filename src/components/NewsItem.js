import React from 'react';
import styled from "styled-components";
import * as timeago from 'timeago.js';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { connect } from 'react-redux';
import { setLike } from "../actions";
import Button from "./Button";
import getHostname from "../utils/getHostname";
import getNewsLink, { HN_ITEM, HN_USER } from "../utils/getNewsLink";

const Item = styled.li`
    padding: 2rem 2.5rem;
    background-color: ${p => p.theme.cardColor};
    box-shadow: 0 1rem 1.5rem 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    display: flex;
    width: 100%;
    margin-bottom: 1.5rem;

    @media only screen and (max-width: 600px) {
        flex-wrap: wrap;
    }
`;

const PointsDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 2.5rem;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 600px) {
        /* order: 1; */
        width: 20%;
    }
`;

const Score = styled.div`
    font-size: 2.2rem;
    font-weight: 500;
    /* color: #7A00FF; */
    color: ${p => p.theme.scoreColor};
    @media only screen and (max-width: 600px) {
       font-size: 3rem;
    }
`;

const Points = styled.div`
    font-size: 1.4rem;
    color: ${p => p.theme.pointsColor};
`;

const NewsContent = styled.div`
    @media only screen and (max-width: 600px) {
        width: 80%;
    }
`;

const NewsLink = styled.a`
    display: flex;
    align-items: center;   
    text-decoration: none;
    outline: none;
    margin-bottom: 6px;

    &:visited,
    &:link {
        color: inherit;
    }

    &:active,
    &:hover {
        text-decoration: underline;
    }
`;

const Title = styled.h3`
    letter-spacing: 0.4px;
`;

const Host = styled.span`
    font-size: 1.4rem;
    font-weight: 400;
    margin-left: 3px;
`;

const Description = styled.div``;

const CommentLink = styled.a`
    color: inherit;
    text-decoration: none;
    outline: none;

    &:active,
    &:hover {
        text-decoration: underline;
    }
`;

const Time = styled.span`
    margin: 0 5px;
`;

const LikeDiv = styled.div`
    margin-left: auto;
    align-self: center;

    @media only screen and (max-width: 600px) {
        /* margin-left: 0; */
    }

`;


const NewsItem = ({ recipe, recipes = [], likedRecipes = [], setLike }) => {
    
    const { spoonacularSourceUrl, vegan, glutenFree, vegetarian, spoonacularScore, sourceName, sourceUrl, title, id, type, readyInMinutes , isLiked } = recipe;

    const site = spoonacularSourceUrl;
    const link = spoonacularSourceUrl;
    const commentUrl = `${HN_ITEM}${id}`;
    // const sourceUrl = `${HN_USER}${by}`;

    const toggleLike = () => {
        let liked;
        (isLiked) ? liked = false : liked = true;
        setLike({ liked, recipe, recipes, likedRecipes });
    };

    return (
        <Item>
            <PointsDiv>
                <Score>
                    {spoonacularScore}
                </Score>
                <Points>
                    Score
                </Points>
            </PointsDiv>
            <NewsContent>
                <NewsLink href={link} rel="noopener noreferrer nofollow" target="_blank">
                    <Title>{title} <Host>({site})</Host></Title>
                </NewsLink>
                <Description>
                    by {" "}
                    <CommentLink href={sourceUrl} rel="noopener noreferrer nofollow" target="_blank">
                        {sourceName}
                    </CommentLink>
                    <Time> | Time taken : {readyInMinutes}</Time>
                    {'| '}
                    {vegetarian ?   
                    <CommentLink >
                    Vegetarian {'| '}
                    </CommentLink> : null}
                    
                    {vegan ?   
                    <CommentLink >
                    Vegan {'| '}
                    </CommentLink> : null}
                    {glutenFree ?   
                    <CommentLink  >
                    Gluten Free {'| '}
                    </CommentLink> : null}
                </Description>
            </NewsContent>
            <LikeDiv>
                <Button onClick={toggleLike} >
                    {(isLiked) ? <FaHeart /> : <FaRegHeart />}
                </Button>
            </LikeDiv>
        </Item>
    );
};

const mapStateToProps = (state) => {
    // console.log(state.story);
    return {
        stories: state.story.stories,
        likedRecipes: state.story.likedRecipes,
    };
};


export default connect(mapStateToProps, { setLike })(NewsItem);