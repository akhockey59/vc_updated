import React, { useContext } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { SocketContext } from '../Context';

const VideoPlayer = () => {
  // Destructure values from the context with default fallback to avoid errors
  const {
    name = '',
    callAccepted = false,
    myVideo,
    userVideo,
    callEnded = false,
    stream,
    call = {},
  } = useContext(SocketContext) || {}; // Fallback to an empty object if context is undefined

  return (
    <Container>
      <Row className="justify-content-center">
        {stream && (
          <Col xs={12} md={6} className="mb-3">
            <Card style={{ border: '2px solid black', padding: '10px' }}>
              <Card.Body>
                <Card.Title>{name || 'Name'}</Card.Title>
                <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%' }} />
              </Card.Body>
            </Card>
          </Col>
        )}
        {callAccepted && !callEnded && (
          <Col xs={12} md={6} className="mb-3">
            <Card style={{ border: '2px solid black', padding: '10px' }}>
              <Card.Body>
                <Card.Title>{call.name || 'Name'}</Card.Title>
                <video playsInline ref={userVideo} autoPlay style={{ width: '100%' }} />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default VideoPlayer;
