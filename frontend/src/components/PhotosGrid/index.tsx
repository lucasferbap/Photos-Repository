/* eslint-disable jsx-a11y/alt-text */
import React, {
  ImgHTMLAttributes,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { FiXCircle } from 'react-icons/fi';

import { Container, PhotoContainer } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useGallery } from '../../hooks/Gallery';

interface Photo {
  id: string;
  alias_name: string;
  path_name: string;
  url: string;
}

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  photosInfos: Photo[];
}

const Image: React.FC<ImgProps> = ({ photosInfos, ...rest }) => {
  const { addToast } = useToast();

  const { openGallery } = useGallery();

  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleDeletePhoto = useCallback(
    async (photoId: string, pathName: string) => {
      try {
        await api.delete(`/photos/${photoId}`, {
          data: {
            pathName,
          },
        });

        const photoIndex = photos.findIndex(photo => photo.id === photoId);
        photos.splice(photoIndex, 1);
        const newPhotos = photos;
        setPhotos(newPhotos);

        addToast({
          type: 'success',
          title: 'Foto excluida com sucesso',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao excluir a Foto',
        });
      }
    },
    [addToast, photos],
  );

  const handleCalculatePhotoIndex = useCallback(
    (photoId: string): number => {
      const index = photosInfos.findIndex(p => p.id === photoId);
      if (index !== undefined) {
        return index;
      }
      return 0;
    },
    [photosInfos],
  );

  useEffect(() => {
    setPhotos(photosInfos);
  }, [photosInfos]);

  return (
    <>
      <Container>
        {photos.map(photo => (
          <div key={photo.id}>
            <button
              className="deletePhoto"
              type="button"
              onClick={() => handleDeletePhoto(photo.id, photo.path_name)}
            >
              <FiXCircle />
            </button>

            <PhotoContainer>
              <button
                type="button"
                className="openGallery"
                onClick={() =>
                  openGallery(photos, handleCalculatePhotoIndex(photo.id))
                }
              >
                <div>
                  <img src={photo.url} {...rest} />
                </div>
              </button>
            </PhotoContainer>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Image;
