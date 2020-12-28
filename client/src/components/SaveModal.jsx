/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Spinner, Modal } from 'react-bootstrap';

function SaveModal({
  onSave, showModal, setShowModal, embedCommand, setEmbedCommand, saving,
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setCopySuccess(false);
    setEmbedCommand('');
  };

  const Saved = !(embedCommand === '');
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {Saved ? 'Saved to database!' : 'Are you sure you want to save?'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(() => {
          if (Saved) {
            return (
              <>
                The list was successfully saved to the database!
                Now, please copy this command and paste it in the #mod-bot-settings channel:
                <samp className="d-block m-2 p-2 commandBox">{embedCommand}</samp>
              </>
            );
          }
          if (saving) {
            return (
              <div className="d-flex flex-column align-items-center mx-auto">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Saving dayooo...</span>
                </Spinner>
              </div>
            );
          }
          return 'if you do this wrong everything may blow up';
        })()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Dismiss
        </Button>
        {(() => {
          if (Saved) {
            return (
              <Button
                variant={copySuccess ? 'success' : 'primary'}
                onClick={() => {
                  navigator.clipboard.writeText(embedCommand);
                  setCopySuccess(true);
                }}
              >
                {copySuccess ? 'Copied!' : 'Copy'}
              </Button>
            );
          } return (
            <Button
              variant="primary"
              onClick={onSave}
            >
              Save Changes
            </Button>
          );
        })()}
      </Modal.Footer>
    </Modal>
  );
}

export default SaveModal;
