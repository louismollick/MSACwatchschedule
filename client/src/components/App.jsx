import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PartyList from './PartyList';
import SaveModal from './SaveModal';
import MSACHeader from './MSACHeader';

const GIST_ID = 'c4300929d330218f61179294eb1c2a54';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [serverPartyList, setServerPartyList] = useState([]);
  const [localPartyList, setLocalPartyList] = useState([]);
  const [editing, setEditing] = useState([]);
  const [saving, setSaving] = useState(false);
  const [embedCommand, setEmbedCommand] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleEdit = (index) => () => {
    setEditing(editing.map((bool, i) => ((i === index) ? !bool : bool)));
  };

  const setPartyData = (malId) => (data) => {
    setLocalPartyList(localPartyList.map((party) => ((party.mal_id === malId) ? data : party)));
  };

  const fetchData = () => axios.get(`https://api.github.com/gists/${GIST_ID}`)
    .then((res) => {
      const arr = JSON.parse(res.data.files['msacwatchschedule.json'].content);
      setServerPartyList(arr);
      setLocalPartyList(arr);
      setEditing(arr.map(() => false));
      setLoaded(true);
    })
    .catch((err) => {
      setLoaded(true);
      setError(true);
      console.error(err);
    });

  const onSave = () => {
    setSaving(true);
    axios.post(`${process.env.REACT_APP_API_URL}/edit`, localPartyList)
      .then((res) => {
        setSaving(false);
        setEmbedCommand(res.data);
        setLoaded(false);
        setTimeout(() => {
          // Timeout so the the Github Gist has time to update
          fetchData();
        }, 5000);
      })
      .catch((err) => {
        setSaving(false);
        setShowModal(false);
        setError(true);
        console.error(err);
      });
  };

  useEffect(fetchData, []);

  return (
    <div className="App container d-flex flex-column partyContainer mx-auto min-vh-100">
      <MSACHeader />
      <PartyList
        error={error}
        loaded={loaded}
        editing={editing}
        toggleEdit={toggleEdit}
        setShowModal={setShowModal}
        localPartyList={localPartyList}
        serverPartyList={serverPartyList}
        setPartyData={setPartyData}
      />
      <footer className="p-3 mt-auto">
        {'Made with love <3'}
      </footer>
      <SaveModal
        onSave={onSave}
        showModal={showModal}
        setShowModal={setShowModal}
        embedCommand={embedCommand}
        setEmbedCommand={setEmbedCommand}
        saving={saving}
      />
    </div>
  );
};

export default App;
