// frontend/src/components/templates/MainLayout/MainLayout.tsx
import React from 'react';
import { Header } from '../../organisms/Header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;