const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} GrocerEase. All rights reserved.</p>
    </footer>
  );
};
const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#fff',
  padding: '15px 0',
  fontWeight: 'bold',
  // backgroundColor: "#f8f8f8",
  color: '#666',
  fontSize: '16px',
  // position: "fixed",
  width: '100%',
  bottom: '0',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default Footer;
