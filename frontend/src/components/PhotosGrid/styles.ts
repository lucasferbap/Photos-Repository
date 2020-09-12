import styled, { keyframes } from 'styled-components';

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
  /* border: 1px solid black; */

  animation: ${appearFromLeft} 0.5s;

  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .openGallery {
      background: transparent;
      border: 0;

      div {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        border: 1px solid black;

        img {
          width: 90px;
          height: 90px;
          border-radius: 45px;
        }
      }
    }

    .deletePhoto {
      margin-left: auto;
      margin-bottom: 0px;
      display: flex;
      align-items: center;

      background: transparent;
      border: 0;
      opacity: 0;
    }

    &:hover .deletePhoto {
      opacity: 1;
    }
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
