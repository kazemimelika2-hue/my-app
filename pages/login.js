import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { getFavourites } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const router = useRouter();

    async function updateAtom() {
        setFavouritesList(await getFavourites());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtom();
            router.push('/');
        } catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
        </>
    );
}