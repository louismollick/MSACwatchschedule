import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

import Party from './Party';
import SaveModal from './SaveModal';
import MSACHeader from './MSACHeader';

const GIST_ID = 'c4300929d330218f61179294eb1c2a54';

const App = () => {
  const [Loaded, setLoaded] = useState(false);
  const [Error, setError] = useState(false);
  const [ServerPartyList, setServerPartyList] = useState([]);
  const [LocalPartyList, setLocalPartyList] = useState([]);
  const [Editing, setEditing] = useState([]);
  const [Saving, setSaving] = useState(false);
  const [EmbedCommand, setEmbedCommand] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleEdit = index => () => {
    setEditing(Editing.map((bool, i) => (i === index) ? !bool : bool));
  };

  const setPartyData = mal_id => data => {
    setLocalPartyList(LocalPartyList.map((party) => (party.mal_id === mal_id) ? data : party));
  };

  const onSave = () => {
    setSaving(true);
    axios.post(`${process.env.REACT_APP_API_URL}/edit`, LocalPartyList)
      .then(res => {
        setSaving(false);
        setEmbedCommand(res.data);
        setLoaded(false);
        setTimeout(() => { 
          // Timeout so the the Github Gist has time to update
          fetchData();
        }, 5000);
      })
      .catch(err => {
        setSaving(false);
        setShowModal(false);
        setError(true);
        console.error(err);
      });
  };

  const fetchData = () => {
    return axios.get(`https://api.github.com/gists/${GIST_ID}`)
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

  const renderList = () => {
    if (Error) {
      return <div className="mt-4">ah fuck an error happened yucky poopy</div>
    } else {
      if (Loaded) {
        return <React.Fragment>
          <div className="row-auto px-3">
            <Button onClick={() => setShowModal(true)} disabled={!Editing.some(Boolean)} variant="danger" className={"w-100"}>Save!</Button>
          </div>
          {
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
                />)
          }
        </React.Fragment>
      } else {
        return <Spinner animation="border" role="status" className="mt-5 text-light mx-auto">
          <span className="sr-only">Loading dayooo...</span>
        </Spinner>
      }
    }
  }

  return (
    <div className="App container d-flex flex-column partyContainer mx-auto min-vh-100">
      <MSACHeader/>
      {renderList()}
      <footer className="p-3 mt-auto">
        {"Made with love <3"}
      </footer>
      <SaveModal
        onSave={onSave} 
        showModal={showModal} 
        setShowModal={setShowModal} 
        EmbedCommand={EmbedCommand} 
        setEmbedCommand={setEmbedCommand} 
        Saving={Saving} />
    </div>
  );
}

export default App;
