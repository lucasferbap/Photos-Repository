/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from 'react';

import { FiChevronRight, FiChevronLeft, FiXCircle } from 'react-icons/fi';

import { Container, ImgContainer, Description } from './styles';
import { useGallery } from '../../hooks/Gallery';

interface Photo {
  id: string;
  alias_name: string;
  path_name: string;
  url: string;
}

interface GalleryProps {
  photosInfos: Photo[];
  photoIndex: number;
  // style: object;
}

const PhotoGallery: React.FC<GalleryProps> = ({
  photosInfos,
  photoIndex,
  // style,
}) => {
  const { closeGallery } = useGallery();

  const [photos, setPhotos] = useState<Photo[]>(photosInfos);
  const [index, setIndex] = useState<number>(photoIndex);

  const nextPhoto = useCallback(() => {
    if (index >= photos.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index, photos.length]);

  const prevPhoto = useCallback(() => {
    if (index <= 0) {
      setIndex(photos.length - 1);
    } else {
      setIndex(index - 1);
    }
  }, [index, photos.length]);

  return (
    <Container>
      <button type="button" onClick={closeGallery}>
        <FiXCircle color="#ffffff" />
      </button>
      <ImgContainer>
        <button type="button" onClick={prevPhoto}>
          <FiChevronLeft color="#ffffff" size={50} />
        </button>
        <img src={photos[index].url} />
        <button type="button" onClick={nextPhoto}>
          <FiChevronRight color="#ffffff" size={50} />
        </button>
      </ImgContainer>
      <Description>{photos[index].alias_name}</Description>
    </Container>
  );
};

export default PhotoGallery;
