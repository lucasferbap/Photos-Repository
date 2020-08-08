/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FiLogOut, FiXCircle } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/Auth';

import api from '../../services/api';
import {
  Container,
  Header,
  Profile,
  Content,
  ContentHeader,
  AddAlbumButton,
  Albuns,
  Album,
  AddNewAlbum,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';

interface Album {
  id: string;
  album_name: string;
  alias_name: string;
  path_name: string;
  created_at: Date;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [usersAlbuns, setUsersAlbuns] = useState<Album[]>([]);
  const [openAddNewAlbumWindow, setOpenAddNewAlbumWindow] = useState<boolean>(
    true,
  );

  const loadAlbuns = useCallback(async () => {
    const { data: albuns } = await api.get<Album[]>('/albuns');
    setUsersAlbuns(albuns);
    console.log(albuns);
  }, []);

  const handleOpenAddAlbumWindow = useCallback(() => {
    setOpenAddNewAlbumWindow(true);
  }, []);

  const handleCloseAddAlbumWindow = useCallback(() => {
    setOpenAddNewAlbumWindow(false);
  }, []);

  const handleCreateNewAlbum = useCallback(async (aliasName: string) => {
    try {
      await api.post('/albuns', aliasName);
      addToast({
        type: 'success',
        title: 'Álbum criado com sucesso',
      });
      setOpenAddNewAlbumWindow(false);
      loadAlbuns();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao criar o álbum',
      });
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadAlbuns();
  }, [loadAlbuns]);

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>

        <Profile>
          <p>{user.name}</p>
          <button type="button" onClick={signOut}>
            <FiLogOut />
          </button>
          <img src={user.avatar_url} alt={user.name} />
        </Profile>
      </Header>
      <Content>
        <ContentHeader>
          <div>
            <img src="https://img.icons8.com/dusk/64/000000/user-folder.png" />
            <p>{user.rootFolder.alias_name}</p>
          </div>

          <AddAlbumButton>
            <p>Novo Album</p>
            <button type="button" onClick={handleOpenAddAlbumWindow}>
              <img src="https://img.icons8.com/ios/50/000000/add-folder.png" />
            </button>
          </AddAlbumButton>
        </ContentHeader>
        <Albuns>
          {usersAlbuns.map(userAlbum => (
            <Album key={userAlbum.id}>
              <img src="https://img.icons8.com/dusk/64/000000/pictures-folder.png" />
              <p>{userAlbum.alias_name}</p>
            </Album>
          ))}
        </Albuns>
      </Content>

      {openAddNewAlbumWindow && (
        <AddNewAlbum>
          <button type="button" onClick={handleCloseAddAlbumWindow}>
            <FiXCircle color="#ffff" size={20} />
          </button>
          <Form onSubmit={handleCreateNewAlbum}>
            <Input
              name="aliasName"
              placeholder="Digite o nome do seu novo álbum"
            />
            <button type="submit">Criar Album</button>
          </Form>
        </AddNewAlbum>
      )}
    </Container>

    // <>

    //   <p>{user.email}</p>
    //   <p>{user.rootFolder.path_name}</p>
    //   <p>
    //     alias name:
    //     {user.rootFolder.alias_name}
    //   </p>

    //   <button onClick={signOut} type="button">
    //     sair
    //   </button>
    // </>
  );
};

export default Dashboard;
