/* eslint-disable react/prop-types */
import React from 'react';
import { Emoji } from 'emoji-mart';
import { Button } from 'react-bootstrap';

const nth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const getTodayDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][today.getMonth()];

  return `${month} ${day}${nth(day)} ${today.getFullYear()}`;
};

const Party = ({
  localPartyData, serverPartyData, editing, toggleEdit, setPartyData,
}) => (
  <div className="row justify-content-start partyRow">
    <div className="col-md-auto">
      <img alt="Anime poster" src={serverPartyData.image} />
    </div>
    <div className="col my-auto">
      <p>
        <span>
          <a href={`https://myanimelist.net/anime/${serverPartyData.mal_id}`} target="_blank" rel="noopener noreferrer">MyAnimeList</a>
        </span>
        <span className="font-weight-bold font-size-md">
          <Emoji emoji={serverPartyData.emoji} set="twitter" size={16} />
          -
          {serverPartyData.name}
        </span>
        {editing && (
          <>
            <span>
              {'When : '}
              <input
                value={localPartyData.when}
                onChange={(e) => setPartyData({ ...localPartyData, when: e.target.value })}
              />
            </span>
            <span>
              {'Most recent session : '}
              <input
                type="text"
                value={localPartyData.lastSession}
                onChange={(e) => setPartyData({ ...localPartyData, lastSession: e.target.value })}
              />
              <Button type="button" onClick={() => setPartyData({ ...localPartyData, lastSession: getTodayDate() })}>
                Today
              </Button>
            </span>
            <span>
              {'Most recently watched episode : '}
              <input
                type="number"
                className="currEpisode mx-1"
                value={localPartyData.curr}
                onChange={(e) => setPartyData({ ...localPartyData, curr: e.target.value })}
              />
              /
              {serverPartyData.total}
            </span>
          </>
        )}
        {!editing && (
          <>
            <span>
              {`When : ${serverPartyData.when}`}
            </span>
            <span>
              {`Most recent session : ${serverPartyData.lastSession}`}
            </span>
            <span>
              {`Most recently watched episode : ${serverPartyData.curr} / ${serverPartyData.total}`}
            </span>
          </>
        )}
      </p>
    </div>
    <button
      type="button"
      className="editBtn btn btn-danger position-absolute"
      onClick={() => {
        if (editing) setPartyData(serverPartyData);
        toggleEdit();
      }}
    >
      {editing ? 'Cancel' : 'Edit'}
    </button>
  </div>
);

export default Party;
