import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  disappear: boolean;
}

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

const disappearToLeft = keyframes`
  from{
    opacity: 1;
    transform: translateX(0px)
  }

  to {
    opacity: 0;
    transform: translateX(-500px)
  }
`;

export const Container = styled.div`
  animation: ${appearFromLeft} 0.5s;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* padding: 10px; */
`;

export const Header = styled.header`
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  svg {
    color: white;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  button {
    background: transparent;
    border: none;
    margin-right: 10px;
  }

  p {
    margin-right: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  width: 100%;
  height: 80%;
  padding: 10px;

  .Albuns {
    margin-top: 50px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    grid-auto-flow: row;
    justify-items: center;
    align-items: center;
    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      button {
        margin-left: 70px;
        background: transparent;
        border: none;
        opacity: 0;
      }

      &:hover button {
        opacity: 1;
      }

      a {
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .Spliter {
    width: 90%;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
    margin-top: 80px;
  }
`;

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      background: transparent;
      border: none;
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

export const MobileMenuOpenButton = styled.div`
  display: none;
  button {
    background: transparent;
    border: none;
  }
  @media (max-width: 700px) {
    position: absolute;
    left: 5px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export const MobileMenu = styled.div<ContainerProps>`
  animation: ${appearFromLeft} 0.5s;
  ${props =>
    props.disappear &&
    css`
      animation: ${disappearToLeft} 0.5s;
    `}
  position: absolute;
  left: 0;
  top: 100px;
  width: 230px;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  color: white;

  svg {
    float: right;
    margin: 5px;
  }

  .Menu-Header {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid rgba(255, 255, 255, 0.1) 1px;

    img {
      width: 30px;
      height: 30px;
      margin-bottom: 50px;
    }

    h4 {
      margin-bottom: 50px;
    }
  }

  .Menu-Options {
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        svg {
          color: white;
          size: 20;
          margin-right: 20px;
        }
      }
    }
  }
`;

export const AddNewAlbum = styled.div`
  animation: ${appearFromLeft} 1s;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 50%;
  top: 25%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .Create-New-Album {
    background: white;
    color: black;
    border: 0;
    padding: 10px;
    border-radius: 10px;
  }

  .Close-Add-New-Album-Window {
    background: transparent;
    border: none;
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

export const EmptyRootFolder = styled.div`
  margin-top: 50px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const AddButtons = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    button {
      margin-left: 10px;
      background: transparent;
      border: 0;
      img {
        width: 20px;
      }
    }
  }
`;

export const OpenAlbumButton = styled.button`
  background: transparent;
  border: none;
`;

export const AddPhotoButton = styled.div`
  button {
    margin-left: 10px;
    background: transparent;
    border: none;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
