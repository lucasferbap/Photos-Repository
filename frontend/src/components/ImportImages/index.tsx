import React, { useState } from 'react';
import { FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import filesize from 'filesize';

import FileList from '../FileList';
import Upload from '../Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

// import alert from '../../assets/alert.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useImportImages } from '../../hooks/Import';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

interface ImportProps {
  rootFolderName: string;
  albumName: string;
}

const ImportImages: React.FC<ImportProps> = ({ rootFolderName, albumName }) => {
  const { addToast } = useToast();
  const { closeImport } = useImportImages();
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  // const options = {
  //   onOploadProgress: (progressEvent: ProgressEvent) => {
  //     const { loaded, total } = progressEvent;
  //     const percent = Math.floor((loaded * 100) / total);
  //     console.log(`${loaded} kb of ${total} kb | ${percent}%`);
  //   },
  // };

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    try {
      uploadedFiles.forEach(file => {
        data.append('photos', file.file);
      });
      data.append('rootFolderName', rootFolderName);
      data.append('albumName', albumName);

      await api.post(
        'photos/upload',
        data,
        // {
        //   onUploadProgress: (progressEvent: ProgressEvent) => {
        //     const { loaded, total } = progressEvent;

        //     uploadedFiles.forEach(file => {
        //       file.file.size
        //     });

        //     const percent = Math.floor((loaded * 100) / total);
        //     console.log(`${loaded} kb of ${total} kb | ${percent}%`);
        //   },
        // }
      );
      addToast({
        type: 'success',
        title: 'Fotos Carregadas com sucesso!',
      });
      // window.location.reload();
      // closeImport();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao carregar as suas fotos',
        description:
          'Verifique se todos os arquivos estão nos formatos permitidos',
      });
    }
  }

  function submitFile(files: File[]): void {
    const auxArray: FileProps[] = [];
    files.forEach(file => {
      auxArray.push({
        file,
        name: file.name,
        readableSize: filesize(file.size),
      });
    });

    setUploadedFiles(auxArray);
  }

  return (
    <>
      <Container>
        <button
          type="button"
          className="Close-Button"
          onClick={() => closeImport()}
        >
          <FiXCircle />
        </button>
        <Title>Upload de Fotos</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <FiAlertTriangle color="red" />
              Permitido apenas arquivos de imagem (.jpeg, .jpg, .gif, .png)
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default ImportImages;
