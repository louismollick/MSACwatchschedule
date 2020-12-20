import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Party from './Party';

const GIST_ID = 'c4300929d330218f61179294eb1c2a54';

const App = () => {
  const [Loaded, setLoaded] = useState(false);
  const [Error, setError] = useState(false);
  const [ServerPartyList, setServerPartyList] = useState([]);
  const [LocalPartyList, setLocalPartyList] = useState([]);
  const [Editing, setEditing] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const toggleEdit = index => () => {
    setEditing(Editing.map((bool, i) => (i === index) ? !bool : bool));
  };

  const setPartyData = mal_id => data => {
    setLocalPartyList(LocalPartyList.map((party) => (party.mal_id === mal_id) ? data : party));
  };

  const onSave = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/edit`, LocalPartyList)
      .then(res => {
        console.log("Saved successfully.");
        closeModal();
        fetchData();
      })
      .catch(err => {
        console.error(err);
      });
    
  };

  const fetchData = () => {
    console.log(process.env)
    axios.get(`https://api.github.com/gists/${GIST_ID}`)
      .then(res => {
        const arr = JSON.parse(res.data.files["msacwatchschedule.json"].content);
        setServerPartyList(arr);
        setLocalPartyList(arr);
        setEditing(arr.map(_ => false));
        setLoaded(true);
      })
      .catch(err => {
        setLoaded(true);
        setError(true);
        console.error(err);
      });
  }

  useEffect(fetchData, []);

  return (
    <div className="App container d-flex flex-column partyContainer mx-auto min-vh-100">
      <div className="row justify-content-center pt-5 pb-3">
        <div>
          <h6 className="mb-0 font-weight-bold">
            <img alt={"MSAC logo"} src="msactransparent.png" className="logo"></img>MSAC
          </h6>
          <div className="row titleText">Watch Schedule 🍿</div>
        </div>
      </div>
      <div className="row-auto px-3">
        <Button onClick={() => setShowModal(true)} disabled={!Editing.some(Boolean)} variant="danger" className={"w-100"}>Save!</Button>
      </div>
      {Loaded && !Error &&
        (LocalPartyList.length === 0)
        ? "No parties, no fun :("
        : LocalPartyList.map((partyL, index) =>
          <Party
            key={partyL.mal_id}
            localPartyData={partyL}
            serverPartyData={ServerPartyList.find(partyS => partyS.mal_id === partyL.mal_id)}
            editing={Editing[index]}
            toggleEdit={toggleEdit(index)}
            setPartyData={setPartyData(partyL.mal_id)}
          />
        )
      }
      {!Loaded &&
        <div className="mt-5 spinner-border text-light mx-auto" role="status">
          <span className="sr-only">Loading dayooo...</span>
        </div>
      }
      {Error && <div>ah fuck an error happened yucky poopy</div>}
      <footer className="p-3 mt-auto">
        {"Made with love <3"}
      </footer>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to save?</Modal.Title>
        </Modal.Header>
        <Modal.Body>if you do this wrong everything may blow up</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
