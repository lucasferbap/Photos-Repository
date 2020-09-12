import React, { createContext, useContext, useState, useCallback } from 'react';
import PhotoGallery from '../components/PhotoGallery';

interface GalleryContextData {
  openGallery(ph: Photo[], ind: number): void;
  closeGallery(): void;
}

const GalleryContext = createContext<GalleryContextData>(
  {} as GalleryContextData,
);

interface Photo {
  id: string;
  alias_name: string;
  path_name: string;
  url: string;
}

const GalleryProvider: React.FC = ({ children }) => {
  const [openPhotoGallery, setOpenPhotoGallery] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState<number>(0);

  const openGallery = useCallback((ph: Photo[], ind: number) => {
    setPhotos(ph);
    setIndex(ind);
    setOpenPhotoGallery(true);
    window.scrollTo(0, 0);
  }, []);

  const closeGallery = useCallback(() => {
    setOpenPhotoGallery(false);
  }, []);

  return (
    <GalleryContext.Provider value={{ openGallery, closeGallery }}>
      {children}
      {openPhotoGallery && (
        <PhotoGallery photosInfos={photos} photoIndex={index} />
      )}
    </GalleryContext.Provider>
  );
};

function useGallery(): GalleryContextData {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error('useGallery must be used within a galleryProvider');
  }

  return context;
}

export { GalleryProvider, useGallery };
