/* eslint-disable react/prop-types */
import React from 'react';
import { Emoji } from 'emoji-mart';

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
              When :
              <input
                value={localPartyData.when}
                onChange={(e) => setPartyData({ ...localPartyData, when: e.target.value })}
              />
            </span>
            <span>
              Most recent session :
              <input
                value={localPartyData.lastSession}
                onChange={(e) => setPartyData({ ...localPartyData, lastSession: e.target.value })}
              />
            </span>
            <span>
              Most recently watched episode :
              <input
                className="currEpisode"
                value={localPartyData.curr}
                onChange={(e) => setPartyData({ ...localPartyData, curr: e.target.value })}
              />
              /
              {serverPartyData.total}
              <button type="button" className="btn btn-primary ml-3" onClick={() => setPartyData({ ...localPartyData, curr: localPartyData.curr + 1 })}> + </button>
            </span>
          </>
        )}
        {!editing && (
          <>
            <span>
              When :
              {serverPartyData.when}
            </span>
            <span>
              Most recent session :
              {serverPartyData.lastSession}
            </span>
            <span>
              Most recently watched episode :
              {serverPartyData.curr}
              /
              {serverPartyData.total}
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
