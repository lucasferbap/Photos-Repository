import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;

  button {
    border: 1px solid white;
    background: transparent;
    border: none;
    margin-top: 1%;
    margin-right: 1%;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 5%;

  button {
    background: transparent;
    border: none;
  }

  img {
    max-height: 500px;
    max-width: 500px;
  }

  @media (max-width: 800px) {
    margin-top: 20%;
    img {
      max-height: 400px;
      max-width: 400px;
    }
  }

  @media (max-width: 600px) {
    margin-top: 20%;
    img {
      max-height: 300px;
      max-width: 300px;
    }
  }
`;

export const Description = styled.p`
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 10%;
`;
