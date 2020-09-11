/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from 'react';
import { FiLogOut, FiXCircle } from 'react-icons/fi';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/Auth';
import Image from '../../components/PhotosGrid';

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
  EmptyRootFolder,
  AddButtons,
} from './styles';
import Input from '../../components/Input';
import { useToast } from '../../hooks/Toast';

interface Album {
  id: string;
  album_name: string;
  alias_name: string;
  path_name: string;
  created_at: Date;
}

export interface Photo {
  id: string;
  alias_name: string;
  path_name: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();

  const [usersAlbuns, setUsersAlbuns] = useState<Album[]>([]);

  const [rootFolderPhotosInfos, setRootFolderPhotosInfos] = useState<Photo[]>(
    [],
  );

  const [openAddNewAlbumWindow, setOpenAddNewAlbumWindow] = useState<boolean>(
    false,
  );

  const loadAlbuns = useCallback(async () => {
    const { data: albuns } = await api.get<Album[]>('/albuns');
    setUsersAlbuns(albuns);
  }, []);

  const loadRootFolderPhotosInfos = useCallback(async () => {
    const { data: photos } = await api.get<Photo[]>('/photos', {
      params: {
        rootFolder: user.rootFolder.folder_name,
      },
    });
    setRootFolderPhotosInfos(photos);
  }, [user.rootFolder.folder_name]);

  const handleOpenAddAlbumWindow = useCallback(() => {
    setOpenAddNewAlbumWindow(true);
  }, []);

  const handleCloseAddAlbumWindow = useCallback(() => {
    setOpenAddNewAlbumWindow(false);
  }, []);

  const handleCreateNewAlbum = useCallback(
    async (aliasName: string) => {
      try {
        const { data } = await api.post('/albuns', aliasName);
        setUsersAlbuns([...usersAlbuns, data]);
        addToast({
          type: 'success',
          title: 'Álbum criado com sucesso',
        });
        setOpenAddNewAlbumWindow(false);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao criar o álbum',
        });
      }
    },
    [addToast, usersAlbuns],
  );

  const handleDeleteAlbum = useCallback(
    async (albumId: string, filePath: string) => {
      try {
        await api.delete(`/albuns/${albumId}`, { data: { filePath } });
        const albumIndex = usersAlbuns.findIndex(album => album.id === albumId);
        usersAlbuns.splice(albumIndex, 1);
        const newAlbuns = usersAlbuns;
        setUsersAlbuns(newAlbuns);
        addToast({
          type: 'success',
          title: 'Álbum excuído com sucesso',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao excluir o álbum',
        });
      }
    },
    [addToast, usersAlbuns],
  );

  useEffect(() => {
    loadAlbuns();
    loadRootFolderPhotosInfos();
  }, [loadAlbuns, loadRootFolderPhotosInfos]);

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
          {usersAlbuns.length === 0 ? (
            <EmptyRootFolder>
              <p>Não há álbuns na sua pasta de fotos</p>
              <AddButtons>
                <p>
                  Adicionar um novo álbum
                  <button type="button" onClick={handleOpenAddAlbumWindow}>
                    <img src="https://img.icons8.com/ios/50/000000/add-folder.png" />
                  </button>
                </p>

                <p>Ou</p>
                <p>
                  Adicionar Fotos
                  <button type="button">
                    <img src="https://img.icons8.com/wired/64/000000/add-image.png" />
                  </button>
                </p>
              </AddButtons>
            </EmptyRootFolder>
          ) : (
            usersAlbuns.map(userAlbum => (
              <Album key={userAlbum.id}>
                <button
                  type="button"
                  onClick={
                    () => handleDeleteAlbum(userAlbum.id, userAlbum.path_name)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                >
                  <FiXCircle />
                </button>

                <img src="https://img.icons8.com/dusk/64/000000/pictures-folder.png" />
                <p>{userAlbum.alias_name}</p>
              </Album>
            ))
          )}
        </Albuns>

        <Image photosInfos={rootFolderPhotosInfos} />
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
  );
};

export default Dashboard;
