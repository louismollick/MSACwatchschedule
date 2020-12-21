import React, { useState } from 'react';
import { Button, Spinner, Modal } from 'react-bootstrap';

function SaveModal({ onSave, showModal, setShowModal, EmbedCommand, setEmbedCommand, Saving }) {
  const [CopySuccess, setCopySuccess] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setCopySuccess(false);
    setEmbedCommand('');
  }
  return (
    <Modal show={showModal} onHide={closeModal}>
        {(EmbedCommand === '') ? (<React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to save?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Saving
              ? (<div className="d-flex flex-column align-items-center mx-auto">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Saving dayooo...</span>
                </Spinner>
              </div>)
              : "if you do this wrong everything may blow up"
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
              </Button>
            <Button variant="primary" onClick={onSave}>
              Save Changes
              </Button>
          </Modal.Footer>
        </React.Fragment>)
          : (<React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>Saved to database!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The list was successfully saved to the database!
              Now, please copy this command and paste it in the #mod-bot-settings channel:
              <samp className="d-block m-2 p-2 commandBox">{EmbedCommand}</samp>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Dismiss
              </Button>
              <Button variant={CopySuccess ? "success" : "primary"} onClick={() => {
                navigator.clipboard.writeText(EmbedCommand);
                setCopySuccess(true);
              }}>
                {CopySuccess ? "Copied!" : "Copy"}
              </Button>
            </Modal.Footer>
          </React.Fragment>)}
      </Modal>
  )
}

export default SaveModal
