import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height: 300px;
  background: white;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;

  p {
    margin-bottom: 10px;
  }

  form {
    text-align: center;
  }

  button {
    width: 300px;
  }
`;
