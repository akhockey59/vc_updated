import React, { useState, useContext } from 'react';
import { Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../Context';
import { Clipboard, Telephone, TelephoneX } from 'react-bootstrap-icons'; // Updated imports

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container style={{ margin: '35px 0' }}>
      <Card style={{ padding: '10px 20px', border: '2px solid black' }}>
        <Form noValidate autoComplete="off">
          <Row>
            <Col xs={12} md={6} style={{ padding: '20px' }}>
              <h6>Account Info</h6>
              <Form.Group controlId="formBasicName">
                <Form.Control 
                  type="text" 
                  placeholder="Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </Form.Group>
              <CopyToClipboard text={me}>
                <Button variant="primary" style={{ marginTop: '20px' }} className="btn-block">
                  <Clipboard style={{ fontSize: 'large', marginRight: '10px' }} /> 
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Col>
            <Col xs={12} md={6} style={{ padding: '20px' }}>
              <h6>Make a call</h6>
              <Form.Group controlId="formBasicIdToCall">
                <Form.Control 
                  type="text" 
                  placeholder="ID to call" 
                  value={idToCall} 
                  onChange={(e) => setIdToCall(e.target.value)} 
                />
              </Form.Group>
              {callAccepted && !callEnded ? (
                <Button variant="danger" style={{ marginTop: '20px' }} className="btn-block" onClick={leaveCall}>
                  <TelephoneX style={{ fontSize: 'large', marginRight: '10px' }} /> 
                  Hang Up
                </Button>
              ) : (
                <Button variant="primary" style={{ marginTop: '20px' }} className="btn-block" onClick={() => callUser(idToCall)}>
                  <Telephone style={{ fontSize: 'large', marginRight: '10px' }} /> 
                  Call
                </Button>
              )}
            </Col>
          </Row>
        </Form>
        {children}
      </Card>
    </Container>
  );
};

export default Sidebar;
