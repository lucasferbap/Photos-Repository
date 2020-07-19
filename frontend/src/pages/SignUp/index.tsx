import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer } from './styles';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome Obrigatório'),
          email: yup
            .string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        addToast({
          type: 'success',
          title: 'Cadastro Realizado com Sucesso',
        });
        history.push('/');
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
          title: 'Error no Cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro na aplicação, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <h3>Página de Cadastro</h3>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <p>Crie o seu cadastro na plataforma</p>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <Button type="submit">CADASTRAR</Button>
        </Form>
      </FormContainer>
      <Link to="/">Voltar para a página de login</Link>
    </Container>
  );
};

export default SignUp;
