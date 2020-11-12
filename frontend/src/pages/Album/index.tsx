/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { FiArrowLeft, FiEdit, FiImage } from 'react-icons/fi';

import { useRouteMatch, Link } from 'react-router-dom';

import PhotoGrid from '../../components/PhotosGrid';

import {
  Container,
  AlbumHeader,
  ChangeCoverPhoto,
  EmptyAlbum,
  AlbumMenu,
} from './styles';
import api from '../../services/api';
import { useImportImages } from '../../hooks/Import';
import { useAuth } from '../../hooks/Auth';

export interface Photo {
  id: string;
  alias_name: string;
  path_name: string;
  url: string;
}

interface AlbumInfo {
  id: string;
  album_name: string;
  alias_name: string;
  path_name: string;
  created_at: string;
  updated_at: string;
  photos: Photo[];
}

interface AlbumParms {
  id: string;
}

const Album: React.FC = () => {
  const { params } = useRouteMatch<AlbumParms>();

  const { user } = useAuth();

  const { openImport } = useImportImages();

  const [album, setAlbum] = useState<AlbumInfo | null>(null);

  const [albumCover, setAlbumCover] = useState<string>('');

  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);

  const handleOpenChangeCoverPhoto = useCallback(() => {
    if (openChangeCover) {
      setOpenChangeCover(false);
    } else {
      setOpenChangeCover(true);
    }
  }, [openChangeCover]);

  const handleChangeCoverPhoto = useCallback((url: string) => {
    setAlbumCover(url);
  }, []);

  const loadAlbum = useCallback(async () => {
    const { data } = await api.get<AlbumInfo>(`/albuns/${params.id}`);
    setAlbum(data);
    if (data.photos.length === 0) {
      setAlbumCover(
        'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
      );
    } else {
      setAlbumCover(data.photos[0].url);
    }
  }, [params.id]);

  useEffect(() => {
    loadAlbum();
  }, [loadAlbum, params.id]);

  const formattedUpdatedDate = useMemo(() => {
    let formatedDate = '';
    if (album?.updated_at) {
      const transformDate = new Date(album?.updated_at);
      formatedDate = `${`00${transformDate.getUTCDate()}`.slice(
        -2,
      )}/${`00${transformDate.getUTCMonth()}`.slice(
        -2,
      )}/${`00${transformDate.getFullYear()}`.slice(
        -2,
      )} às ${`00${transformDate.getUTCHours()}`.slice(
        -2,
      )}:${`00${transformDate.getUTCMinutes()}`.slice(-2)}`;
    }

    return formatedDate;
  }, [album]);

  return (
    <Container>
      <AlbumHeader style={{ backgroundImage: `url("${albumCover}")` }}>
        <AlbumMenu>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>

          <div className="Button-Container">
            <div>
              <button
                className="Open-Import-Button"
                type="button"
                onClick={() => openImport(user.rootFolder.folder_name, '')}
              >
                <FiImage size={20} />
              </button>
              <h5 className="Open-Import-h5">Adicionar imagens</h5>
            </div>
            <div>
              <button
                type="button"
                className="Edit-Cover-Photo-Button"
                onClick={handleOpenChangeCoverPhoto}
              >
                <FiEdit size={20} />
              </button>
              <h5 className="Edit-Cover-Photo-h5">Editar Imagem de capa</h5>
            </div>
          </div>
        </AlbumMenu>

        {openChangeCover && (
          <ChangeCoverPhoto>
            <ul>
              {album?.photos.map(photo => (
                <li onClick={() => handleChangeCoverPhoto(photo.url)}>
                  <img src={photo.url} alt="" />
                  <h6>escolher esta foto</h6>
                </li>
              ))}
            </ul>
          </ChangeCoverPhoto>
        )}

        <h1>{album?.alias_name}</h1>
        <h6>Última modificação: {formattedUpdatedDate}</h6>
      </AlbumHeader>

      {album?.photos.length === 0 ? (
        <EmptyAlbum>
          <h3>Seu album está vazio!</h3>
          <div>
            <p>Adicionar Fotos</p>
            <button
              type="button"
              onClick={() =>
                openImport(user.rootFolder.folder_name, album.album_name)}
            >
              <img src="https://img.icons8.com/wired/64/000000/add-image.png" />
            </button>
          </div>
        </EmptyAlbum>
      ) : (
        album?.photos && <PhotoGrid photosInfos={album?.photos} />
      )}
    </Container>
  );
};

export default Album;
