import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {useLogoutMutation} from '../Slices/AdminApiSlice'
import {logoutUser} from '../Slices/AuthSlice'
import {useNavigate} from 'react-router-dom'



const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { adminInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() => {
    try
    {
      const response = await logoutApiCall().unwrap();
      
      console.log('Logout API response:', response);
  
      dispatch(logoutUser());
      console.log('before logout //////////////////////////////////////////////////');
      navigate('/loginadmin');
      console.log('after logout -----------------------------------------------------');
    }
    catch(err)
    {
       console.log(err)
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {adminInfo ? (
                <NavDropdown title={adminInfo.name} id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
