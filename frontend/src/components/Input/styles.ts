import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 5px;
  width: 100%;
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
    color: black;

    &::placeholder {
      color: #666360;
    }
  }
`;
