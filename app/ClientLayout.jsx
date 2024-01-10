'use client'
import { useRef } from "react";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  
  const scrollToRef = useRef(null);

  const handleScrollToComponent = () => {
    // Utilisez scrollIntoView pour faire défiler jusqu'au composant
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navbar onClick={handleScrollToComponent} />
      <div className="Layout">{children}</div>
      <ContactForm ref={scrollToRef} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
