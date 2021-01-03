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
    <div className="d-flex pb-5 flex-grow-1 justify-content-center align-items-center">
      <Spinner animation="border" role="status" className="text-light position-relative">
        <span className="sr-only">Loading dayooo...</span>
      </Spinner>
    </div>
  );
};

export default PartyList;
