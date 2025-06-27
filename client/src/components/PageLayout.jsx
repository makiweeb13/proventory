import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function PageLayout() {
  return (
    <div className="page-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageLayout;