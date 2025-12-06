import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate';
import { useState, useEffect } from 'react';

export default function MainNav() {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(readToken());
    }, []);

    function logout() {
        removeToken();
        setToken(null);
        router.push('/login');
    }

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Melika Kazemi</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">Books</Nav.Link>
                        <Nav.Link as={Link} href="/about">About</Nav.Link>
                    </Nav>
                    {token && (
                        <Nav>
                            <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} href="/favourites">Favourites</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                    {!token && (
                        <Nav>
                            <Nav.Link as={Link} href="/register">Register</Nav.Link>
                            <Nav.Link as={Link} href="/login">Login</Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
}