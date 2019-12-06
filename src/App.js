import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import bg from './bg.jpg'

const STORAGE_KEY = 'ua-2019/mac-form/filled'

export default () => {
  const [name, setName] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [tournament, setTournament] = useState('SSBU')

  const onNameChange = (e) => setName(e.target.value)
  const onPseudoChange = (e) => setPseudo(e.target.value)
  const onTournamentChange = (e) => setTournament(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()

    await axios.post('/submit', {
      name,
      pseudo,
      tournament
    })

    localStorage.setItem(STORAGE_KEY, 'yes')

    location.reload() // eslint-disable-line no-restricted-globals
  }

  if (localStorage.getItem(STORAGE_KEY)) {
    return (
      <>
        <img src={bg} className="background" />
        <div className="form submitted">
          Formulaire rempli
        </div>
      </>
    )
  }

  return (
    <>
      <img src={bg} className="background" />
      <div className="form">
        <form method="post" action="/save" onSubmit={onSubmit}>
          <label className="label" htmlFor="name">Nom</label>
          <input id="name" required className="input" type="text" value={name} onChange={onNameChange} />
          <label className="label" htmlFor="name">Pseudo</label>
          <input id="pseudo" required className="input" type="text" value={pseudo} onChange={onPseudoChange} />
          <label className="label" htmlFor="name">Tournoi</label>

          <select id="tournament" required className="input" value={tournament} onChange={onTournamentChange}>
            <option value="SSBU">SSBU</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Fortnite">Fortnite</option>
            <option value="CS:GO">CS:GO</option>
          </select>

          <button className="button" type="submit">Envoyer</button>
        </form>
      </div>
    </>
  )
}
