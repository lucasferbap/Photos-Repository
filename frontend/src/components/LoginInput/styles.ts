import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  padding: 5px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 10px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: black;

    &::placeholder {
      color: black;
    }
  }
`;
