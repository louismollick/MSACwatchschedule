import React, { useState } from 'react';
import { Button, Spinner, Modal } from 'react-bootstrap';

function SaveModal({ onSave, showModal, setShowModal, EmbedCommand, setEmbedCommand, Saving }) {
  const [CopySuccess, setCopySuccess] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setCopySuccess(false);
    setEmbedCommand('');
  }

  const Saved = !(EmbedCommand === '');
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {Saved ? "Saved to database!" : "Are you sure you want to save?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(() => {
          if (Saved) {
            return (<React.Fragment>
              The list was successfully saved to the database! Now, please copy this command and paste it in the #mod-bot-settings channel:
              <samp className="d-block m-2 p-2 commandBox">{EmbedCommand}</samp>
            </React.Fragment>)
          } else {
            if (Saving) {
              return (<div className="d-flex flex-column align-items-center mx-auto">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Saving dayooo...</span>
                </Spinner>
              </div>)
            } else return "if you do this wrong everything may blow up"
          }
        })()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Dismiss
        </Button>
        {
          Saved 
          ? (<Button variant={CopySuccess ? "success" : "primary"} 
            onClick={() => {
              navigator.clipboard.writeText(EmbedCommand);
              setCopySuccess(true);
            }}>{CopySuccess ? "Copied!" : "Copy"} </Button>)
          : (<Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>)
        }
      </Modal.Footer>
    </Modal >
  )
}

export default SaveModal
