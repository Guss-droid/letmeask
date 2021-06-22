import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth';

import IllustrantionImg from '../assets/illustration.svg';
import LogoImg from '../assets/logo.svg';
import GoogleIconImg from '../assets/google-icon.svg';

import Button from '../components/button';

import '../styles/auth.scss'

export default function Home() {

  const history = useHistory();
  const { singInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
     await singInWithGoogle()
    }

    history.push('/rooms/new')
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
          <form>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}