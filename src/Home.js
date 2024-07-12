import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notesImage from './assets/note_image.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    const handleSignupClick = () =>{
        navigate('/signup');
    }

    return (
        <div className="landing-page">
            <Container>
                <Nav className="d-flex justify-content-between py-2">
                    <h4>📔Note App</h4>
                    <div className="justify-content-end d-flex">
                        <Nav.Item>
                            <Nav.Link href="#contact">Contact Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#help">Help</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#support">Support Forum</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#blog">Blog</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/login" className="nav-link">Log In</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/signup" className="nav-link btn btn-outline-primary">Sign Up</Link>
                        </Nav.Item>
                    </div>
                </Nav>
                <Row className="align-items-center main-content text-center py-5">
                    <Col>
                        <h1>The simplest way to keep notes</h1>
                        <p>
                            All your notes, synced on all your devices. Get Simplenote now for iOS,
                            Android, Mac, Windows, Linux, or in your browser.
                        </p>
                        <Button variant="primary" size="lg" onClick={handleSignupClick}>Sign up now</Button>
                    </Col>
                </Row>
            </Container>
            <div className="landing-image-container">
                <img src={notesImage} alt="Notes Graphic" className="landing-image" />
            </div>
            <Container className="features-section text-center my-5">
                <h2>Comprehensive underneath, simple on the surface</h2>
                <Row className="my-4">
                    <Col md={4} className="feature">
                        <i className="bi bi-cloud-arrow-down"></i>
                        <h4>Use it everywhere</h4>
                        <p>Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works.</p>
                    </Col>
                    <Col md={4} className="feature">
                        <i className="bi bi-bookmarks"></i>
                        <h4>Stay organized</h4>
                        <p>Add tags to find notes quickly with instant searching.</p>
                    </Col>
                    <Col md={4} className="feature">
                        <i className="bi bi-person"></i>
                        <h4>Work together</h4>
                        <p>Share a to-do list, post some instructions, or publish your notes online.</p>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={4} className="feature">
                        <i className="bi bi-alarm"></i>
                        <h4>Go back in time</h4>
                        <p>Notes are backed up with every change, so you can see what you noted last week or last month.</p>
                    </Col>
                    <Col md={4} className="feature">
                        <i className="bi bi-file-earmark-check"></i>
                        <h4>Markdown support</h4>
                        <p>Write, preview, and publish your notes in Markdown format.</p>
                    </Col>
                    <Col md={4} className="feature">
                        <i className="bi bi-info-circle"></i>
                        <h4>It’s free</h4>
                        <p>Apps, backups, syncing, sharing – it’s all completely free.</p>
                    </Col>
                </Row>
            </Container>
            <footer className="footer mt-auto py-3 bg-light">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <span className="text-muted">© 2024 NoteApp. All rights reserved.</span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default LandingPage;
