import React from 'react';
import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { GalleryProvider } from './Gallery';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GalleryProvider>
      <ToastProvider>{children}</ToastProvider>
    </GalleryProvider>
  </AuthProvider>
);

export default AppProvider;
