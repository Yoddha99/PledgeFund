import { Navbar, Nav, NavLink, Container } from 'react-bootstrap';
import Link from 'next/link'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg"
      style={
        {
          backgroundColor: '#e5e5e5',
          borderRadius: '5px',
          marginTop: '10px'
        }
      }
      variant="light"
    >
      <Container>
        <Navbar.Brand href="#">
          <Link href="/">
            <img src="/static/images/pledgefund-logo.png" width="180px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Link href="/"><span className="nav-link" style={{ cursor: 'pointer' }}>Campaigns</span></Link>
            <Link href="/campaigns/new"><span className="nav-link" style={{ cursor: 'pointer' }}>+</span></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
