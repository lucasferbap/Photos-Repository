import React, { useRef, useCallback } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Container, FormContainer } from './styles';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';
import InputLogin from '../../components/LoginInput';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
        addToast({
          type: 'success',
          title: 'LogIn Realizado com Sucesso',
        });
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          error.errors.forEach(msg => {
            addToast({
              type: 'error',
              title: msg,
            });
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Error na Autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <h3>Página de Login</h3>
      <FormContainer>
        <p>Faça o seu login</p>
        <Form onSubmit={handleSubmit}>
          <InputLogin name="email" placeholder="E-mail" icon={FiMail} />
          <InputLogin
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">ENTRAR</Button>
        </Form>
        <a href="facebook.com">Esqueceu a senha?</a>
      </FormContainer>
      <Link to="signup">Não possui cadastro? Acesse aqui!</Link>
    </Container>
  );
};

export default SignIn;
