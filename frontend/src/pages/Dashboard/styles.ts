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
  animation: ${appearFromLeft} 0.5s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  width: 80%;
  height: 80%;
  padding: 10px;
`;

export const ContentHeader = styled.div`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
  }

  height: 5%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddAlbumButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    background: transparent;
    border: none;
    img {
      width: 20px;
      height: 20px;
    }
  }

  p {
    margin-right: 5px;
  }
`;

export const Albuns = styled.div`
  /* border: 1px solid black; */

  animation: ${appearFromLeft} 1s;
  margin-top: 90px;
  margin-bottom: 90px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Album = styled.div`
  /* border: 1px solid black; */
  align-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-left: auto;
    margin-bottom: 0px;
    display: flex;
    align-items: center;

    background: transparent;
    border: 0;
    opacity: 0;
  }
  &:hover button {
    opacity: 1;
  }
`;

export const AddNewAlbum = styled.div`
  animation: ${appearFromLeft} 1s;
  position: absolute;
  top: 34.5%;
  left: 19%;
  width: 62%;
  height: 44%;
  background: black;
  opacity: 0.9;

  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    float: right;
  }

  form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin-top: 30px;
      background: white;
      color: black;
      border: 0;
      padding: 10px;
      border-radius: 10px;
    }
  }
`;

export const EmptyRootFolder = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
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
