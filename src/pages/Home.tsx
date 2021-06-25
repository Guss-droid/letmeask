import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/UseAuth';

import IllustrantionImg from '../assets/illustration.svg';
import LogoImg from '../assets/logo.svg';
import GoogleIconImg from '../assets/google-icon.svg';

import { Button } from '../components/button';

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { singInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Sala não existe');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Essa sala já foi encerrada')
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrantionImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-google">
            <img src={GoogleIconImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}