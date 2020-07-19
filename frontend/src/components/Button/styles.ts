import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: green;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 10px;
  width: 100%;
  color: #312e38;
  font-weight: bold;
  margin-top: 16px;
  transition: background-color 1s;

  &:hover {
    background: ${shade(0.2, 'green')};
  }
`;
