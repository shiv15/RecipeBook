import React from "react";
import styled from "styled-components";
import logo from "../assets/recipe-book.png";

const ImageSpan = styled.span`
    & img {
        width: 240px;
        height: 100px;

        @media only screen and (max-width: 600px) {
            width: 220px;
        }

        @media only screen and (max-width: 600px) {
            width: 190px;
        }
    }
`;

const Logo = (props) => {
    return (
       <h1>RecipeBook</h1>
    );
};

export default Logo;