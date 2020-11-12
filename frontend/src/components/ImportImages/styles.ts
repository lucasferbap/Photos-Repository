import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromUp = keyframes`
  from{
    opacity: 0;
    transform: translatey(-500px)
  }

  to {
    opacity: 1;
    transform: translatey(0px)
  }
`;

export const Container = styled.div`
  z-index: 2;
  animation: ${appearFromUp} 0.5s;

  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .Close-Button {
    background: transparent;
    border: none;
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: #969cb3;
    margin-right: 20px;
  }

  svg {
    margin-right: 10px;
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
