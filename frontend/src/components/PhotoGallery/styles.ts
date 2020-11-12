import styled, { keyframes } from 'styled-components';
// import { Slide } from 'react-awesome-reveal';

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-500px)
  }

  to {
    opacity: 1;
    transform: translateX(0px)
  }
`;

export const Container = styled.div`
  overflow-y: scroll;
  animation: ${appearFromLeft} 0.5s;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 5px;
  .Close-Gallery {
    background: transparent;
    border: none;
    margin: 15px;
    float: right;
  }
`;

export const ImgContainer = styled.div`
  animation: ${appearFromLeft} 0.5s;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40%;
    height: 40%;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    img {
      width: 80%;
      height: 80%;
    }
  }
`;

export const NavigationButtons = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 20px;

  svg {
    cursor: pointer;
    /* border: 1px solid white; */
  }

  p {
    color: white;
    font-size: 20px;
  }

  @media (max-width: 600px) {
    p {
      font-size: 9px;
    }
  }
`;
