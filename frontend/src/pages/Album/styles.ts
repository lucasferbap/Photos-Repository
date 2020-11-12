import styled from 'styled-components';

export const Container = styled.div`
  /* border: 1px black solid; */
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  width: 100%;
  height: 100%;
`;

export const AlbumHeader = styled.header`
  /* border: 1px black solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

export const AlbumMenu = styled.div`
  padding: 10px;
  position: absolute;
  top: 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    background: transparent;
    border: none;
    z-index: 1;
  }

  a {
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .Button-Container {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const ChangeCoverPhoto = styled.div`
  background: white;
  padding: 15px;
  position: absolute;
  display: flex;
  width: 200px;
  border-radius: 10px;
  top: 40px;
  right: 15px;
  z-index: 1;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;

export const EmptyAlbum = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  h3 {
    font-weight: bold;
    margin-bottom: 50px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 50px;
      height: 50px;
      margin-left: 30px;
    }

    button {
      background: transparent;
      border: none;
    }
  }
`;
