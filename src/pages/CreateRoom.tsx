import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

import IllustrantionImg from '../assets/illustration.svg';
import LogoImg from '../assets/logo.svg';

import Button from '../components/button';

import '../styles/auth.scss'

export default function CreateRoom() {

  const {user} = useAuth()

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
           <h2>Criar uma sala</h2>
          <form>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}