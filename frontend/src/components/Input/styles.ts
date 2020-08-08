import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid white;
  padding: 5px;
  width: 50%;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: white;

    &::placeholder {
      color: white;
    }
  }
`;
