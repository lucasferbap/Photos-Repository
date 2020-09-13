import React, { useEffect, useState, useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import PhotoGrid from '../../components/PhotosGrid';

import { Container, AlbumHeader } from './styles';
import api from '../../services/api';

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
  created_at: Date;
  updated_at: Date;
  photos: Photo[];
}

interface AlbumParms {
  id: string;
}

const Album: React.FC = () => {
  const { params } = useRouteMatch<AlbumParms>();

  const [album, setAlbum] = useState<AlbumInfo | null>(null);

  const loadAlbum = useCallback(async () => {
    const { data } = await api.get<AlbumInfo>(`/albuns/${params.id}`);
    setAlbum(data);
  }, [params.id]);

  useEffect(() => {
    loadAlbum();
  }, [loadAlbum, params.id]);

  return (
    <Container>
      <p>{album?.alias_name}</p>
      <p>{album?.created_at}</p>
      <p>{album?.updated_at}</p>
      {album?.photos && <PhotoGrid photosInfos={album.photos} />}
    </Container>
  );
};

export default Album;
