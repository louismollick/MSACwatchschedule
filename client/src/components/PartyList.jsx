/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Party from './Party';

const PartyList = ({
  error, loaded, editing, toggleEdit, setShowModal, localPartyList, serverPartyList, setPartyData,
}) => {
  if (error) return <div className="mt-4">ah fuck an error happened yucky poopy</div>;
  if (loaded) {
    return (
      <>
        <div className="row-auto px-3">
          <Button onClick={() => setShowModal(true)} disabled={!editing.some(Boolean)} variant="danger" className="w-100">Save!</Button>
        </div>
        {
          (localPartyList.length === 0)
            ? 'No parties, no fun :('
            : localPartyList.map((partyL, index) => (
              <Party
                key={partyL.mal_id}
                localPartyData={partyL}
                serverPartyData={
                  serverPartyList.find((partyS) => partyS.mal_id === partyL.mal_id)
                }
                editing={editing[index]}
                toggleEdit={toggleEdit(index)}
                setPartyData={setPartyData(partyL.mal_id)}
              />
            ))
        }
      </>
    );
  }
  return (
    <Spinner animation="border" role="status" className="mt-5 text-light mx-auto">
      <span className="sr-only">Loading dayooo...</span>
    </Spinner>
  );
};

export default PartyList;
