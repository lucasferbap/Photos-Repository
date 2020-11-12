import React, { createContext, useContext, useCallback, useState } from 'react';
import Import from '../components/ImportImages';

interface ImportImagesContextData {
  openImport(rootFolderName: string, albumName: string): void;
  closeImport(): void;
}

const ImportImagesContext = createContext<ImportImagesContextData>(
  {} as ImportImagesContextData,
);

const ImportImagesProvider: React.FC = ({ children }) => {
  const [openImportArea, setOpenImportArea] = useState<boolean>(false);

  const [rootFolderParameter, setRootFolderParameter] = useState<string>('');
  const [albumNameParameter, setAlbumNameParameter] = useState<string>('');

  const openImport = useCallback(
    (rootFolderName: string, albumName: string) => {
      setRootFolderParameter(rootFolderName);
      setAlbumNameParameter(albumName);
      setOpenImportArea(true);
    },
    [],
  );

  const closeImport = useCallback(() => {
    setOpenImportArea(false);
  }, []);

  return (
    <ImportImagesContext.Provider value={{ openImport, closeImport }}>
      {children}
      {openImportArea && (
        <Import
          rootFolderName={rootFolderParameter}
          albumName={albumNameParameter}
        />
      )}
    </ImportImagesContext.Provider>
  );
};

function useImportImages(): ImportImagesContextData {
  const context = useContext(ImportImagesContext);

  if (!context) {
    throw new Error(
      'useImportImages must be used within a ImportImagesContext',
    );
  }

  return context;
}

export { ImportImagesProvider, useImportImages };
