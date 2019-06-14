import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: ${props => props.width || '20px'};
    height:  ${props => props.height || '20px'};
    position: absolute;
    left: 50%;
    top: 50%;
    animation: rotation;
    transform: translate(-50%, -50%);

    div {
        animation: rotation ${props => props.animationDuration || 1}s linear infinite;
        width: ${props => props.width || '20px'};
        height: ${props => props.height || '20px'};
        border-radius: 50%;
        box-shadow: 0 2px 0 0 ${props => props.color || '#1d0e0b'};
    }
    
    @keyframes rotation{
        0 % {
            --webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
    }
}
`;

/**
 *
 * @param width
 * @param height
 * @param color
 * @param animationDuration (only seconds)
 * @returns {*}
 * @constructor
 */
export const Loader = ({width, height, color, animationDuration}) => (
    <Container
        width={width}
        height={height}
        color={color}
        animationDuration={animationDuration}
    >
        <div/>
    </Container>
);