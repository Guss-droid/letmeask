import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase';
import { useAuth } from '../hooks/UseAuth';

import IllustrantionImg from '../assets/illustration.svg';
import LogoImg from '../assets/logo.svg';

import { Button } from '../components/button';

import '../styles/auth.scss'
import { useTheme } from '../hooks/UseTheme';

export function CreateRoom() {

  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const [category, setCategory] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.getItem("theme");
}, [theme])

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    if (category.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      tittle: newRoom,
      authorId: user?.id,
      category: category,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={IllustrantionImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img
            src={LogoImg}
            alt="Letmeask"
            style={theme === 'dark' ?
              {
                background: '#FFF',
                padding: '3px',
                borderRadius: '8px'
              }
              : {}
            }
          />
          <h2>Criar uma sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <input
              type="text"
              placeholder="Categoria da sala"
              onChange={e => setCategory(e.target.value)}
              value={category}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}