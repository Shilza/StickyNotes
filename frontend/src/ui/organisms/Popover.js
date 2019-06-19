import styled from "styled-components";

export const Popover = styled.div`
    position: absolute;
    background: #fff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    width: 300px;
    padding: 4px;
    z-index: 70;
    top: ${props => props.top || '45px'};
    left: ${props => props.left || '220px'};
    text-align: center;
    transform: translateZ(0);
    
    @media (max-width: 375px) {
      width: 250px;
    }
    
    @media (max-width: 768px) {
      left: ${props => props.left || '30px'};
    }
`;