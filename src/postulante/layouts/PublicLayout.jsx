import { Outlet } from 'react-router-dom';
import Footer from '@/postulante/components/Footer';

const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
