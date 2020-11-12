/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiFolder, FiImage, FiLogOut, FiMenu, FiXCircle } from 'react-icons/fi';
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
  MobileMenuOpenButton,
  MobileMenu,
  AddNewAlbum,
  EmptyRootFolder,
  AddButtons,
} from './styles';
import Input from '../../components/Input';
import { useToast } from '../../hooks/Toast';
import { useImportImages } from '../../hooks/Import';

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
  const { openImport } = useImportImages();

  const [usersAlbuns, setUsersAlbuns] = useState<Album[]>([]);

  const [rootFolderPhotosInfos, setRootFolderPhotosInfos] = useState<Photo[]>(
    [],
  );

  const [openAddNewAlbumWindow, setOpenAddNewAlbumWindow] = useState<boolean>(
    false,
  );

  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  const [controlMobieMenuAnimation, setControlMobieMenuAnimation] = useState<
    boolean
  >(false);

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
    if (openMobileMenu) {
      setOpenMobileMenu(false);
    }
    setOpenAddNewAlbumWindow(true);
  }, [openMobileMenu]);

  const handleCloseAddAlbumWindow = useCallback(() => {
    setOpenAddNewAlbumWindow(false);
  }, []);

  const handleOpenMobileMenu = useCallback(() => {
    setOpenMobileMenu(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setControlMobieMenuAnimation(true);
    setTimeout(() => {
      setOpenMobileMenu(false);
      setControlMobieMenuAnimation(false);
    }, 500);
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
            <h4>{user.rootFolder.alias_name}</h4>
          </div>

          <div>
            <button type="button" onClick={handleOpenAddAlbumWindow}>
              <FiFolder size={50} />
            </button>
            <p>Novo Album</p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => openImport(user.rootFolder.folder_name, '')}
            >
              <FiImage size={50} />
            </button>
            <p>Adicinar novas fotos</p>
          </div>
        </ContentHeader>

        <MobileMenuOpenButton>
          <button type="button" onClick={handleOpenMobileMenu}>
            <FiMenu size={30} />
          </button>
          <h3>Menu</h3>
        </MobileMenuOpenButton>

        {openMobileMenu && (
          <MobileMenu disappear={controlMobieMenuAnimation}>
            <FiXCircle
              onClick={handleCloseMobileMenu}
              style={{ cursor: 'pointer' }}
            />
            <div className="Menu-Header">
              <img src="https://img.icons8.com/dusk/64/000000/user-folder.png" />
              <h4>{user.rootFolder.alias_name}</h4>
            </div>

            <ul className="Menu-Options">
              <li>
                <button type="button" onClick={handleOpenAddAlbumWindow}>
                  <FiFolder />
                  <p>Novo Album</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (openMobileMenu) {
                      setOpenMobileMenu(false);
                    }
                    openImport(user.rootFolder.folder_name, '');
                  }}
                >
                  <FiImage />
                  <p>Adicinar novas fotos</p>
                </button>
              </li>
            </ul>
          </MobileMenu>
        )}

        {usersAlbuns.length === 0 ? (
          <EmptyRootFolder>
            <p>Não há álbuns na sua pasta de fotos</p>
            <AddButtons>
              <p>
                Adicionar um novo álbum
                <button type="button" onClick={handleOpenAddAlbumWindow}>
                  <FiFolder size={20} />
                </button>
              </p>

              <p>Ou</p>
              <p>
                Adicionar Fotos
                <button type="button">
                  <FiImage size={20} />
                </button>
              </p>
            </AddButtons>
          </EmptyRootFolder>
        ) : (
          <>
            <div className="Spliter" />

            <h3 style={{ marginTop: '10px' }}>Albuns</h3>
            <div className="Albuns">
              {usersAlbuns.map(album => (
                <div key={album.id}>
                  <button
                    type="button"
                    onClick={() => handleDeleteAlbum(album.id, album.path_name)}
                  >
                    <FiXCircle />
                  </button>

                  <Link to={`/album/${album.id}`}>
                    <img src="https://img.icons8.com/dusk/64/000000/pictures-folder.png" />
                    <p>{album.alias_name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="Spliter" />
        <h3 style={{ marginTop: '10px' }}>Fotos</h3>
        <Image photosInfos={rootFolderPhotosInfos} />
      </Content>

      {openAddNewAlbumWindow && (
        <AddNewAlbum>
          <button
            className="Close-Add-New-Album-Window"
            type="button"
            onClick={handleCloseAddAlbumWindow}
          >
            <FiXCircle color="#ffff" size={20} />
          </button>
          <Form onSubmit={handleCreateNewAlbum}>
            <Input
              name="aliasName"
              placeholder="Digite o nome do seu novo álbum"
            />
          </Form>
          <button className="Create-New-Album" type="submit">
            Criar Album
          </button>
        </AddNewAlbum>
      )}
    </Container>
  );
};

export default Dashboard;
