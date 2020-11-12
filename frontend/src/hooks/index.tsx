import React from 'react';
import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { GalleryProvider } from './Gallery';
import { ImportImagesProvider } from './Import';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GalleryProvider>
      <ToastProvider>
        <ImportImagesProvider>{children}</ImportImagesProvider>
      </ToastProvider>
    </GalleryProvider>
  </AuthProvider>
);

export default AppProvider;
