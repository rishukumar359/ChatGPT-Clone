import "./Footer.scss";
const Footer = () => {
  const current_year =  new Date().getFullYear();
  return (
    <div className="footerContainer">
      <p>&copy;  <span>{current_year}</span>  -Prolifics - All rights Reserved | AI Legal Assistant</p>
    </div>
  );
};

export default Footer;
