import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="d-flex justify-content-between align-items-center" style={{ margin: '20px' }}>
          <h1 className="m-0">{call.name} is calling:</h1>
          <Button variant="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
