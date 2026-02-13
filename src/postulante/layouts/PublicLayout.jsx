import { Outlet } from 'react-router-dom';
import Footer from '@/postulante/components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css' 
import'../styles/postulante.css'


const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
