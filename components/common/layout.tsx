import Footer from './footer';
import Meta from './meta';
import SlideMenu  from './slide-menu';
import { useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ogImage = true, children }) {
  const prevScrollPos = useRef(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    var currentShowTopNav = prevScrollPos.current > currentScrollPos;
    if(!currentShowTopNav && currentScrollPos < 200)
      currentShowTopNav = true;

    prevScrollPos.current = currentScrollPos;
    if(currentShowTopNav){
      document.body.classList.add("scroll-up");
      document.body.classList.remove("scroll-down");
    }
    else{
      document.body.classList.add("scroll-down");
      document.body.classList.remove("scroll-up");
    }
  };

  const hideMenu = () => {
    document.body.classList.remove("mm-wrapper_opened","mm-wrapper_blocking","mm-wrapper_background", "mm-wrapper_opening");
    document.getElementById('slide_menu').classList.remove("mm-menu_opened");
    document.getElementById('memenu_trigger').classList.remove("active");

  }

  return (
    <div id="home-body" className="home page-template-default page page-id-148 logged-in admin-bar wp-embed-responsive customize-support mm-wrapper">
      <Meta ogImage={ogImage}/>
      <SlideMenu/>
      <div className="mm-page mm-slideout">
        <div className="page">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
      <div onClick={hideMenu} className="mm-wrapper__blocker mm-slideout"><a href="#"><span className="mm-sronly">Close menu</span></a></div>
      <ToastContainer />
    </div>
  )
}
