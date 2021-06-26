import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { Button } from '../components/button';
import { RoomCode } from '../components/RoomCode';
import { Questions } from '../components/Question';

import { useRoom } from '../hooks/UseRoom';

import LogoImg from '../assets/logo.svg';
import DeleteImg from '../assets/delete.svg';
import CheckImg from '../assets/check.svg';
import AnswerImg from '../assets/answer.svg';

import '../styles/room.scss';
import { useTheme } from '../hooks/UseTheme';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas)

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, tittle, category } = useRoom(roomId);
  const { theme  } = useTheme();
  

  useEffect(() => {
    localStorage.getItem("theme");
  }, [theme])

  async function handleEndRoom() {
    if (window.confirm('Tem certeza que você deseja encerrar a sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })
      history.push('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja remover essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleAnsweredQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <img
            src={LogoImg}
            alt="LetmeAsk"
            style={theme === 'dark' ?
              {
                background: '#FFF',
                padding: '1px',
                borderRadius: '8px'
              }
              : {}
            }
          />
          {category}
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
            {/* <button className="themeMode" onClick={toggleTheme}>
              {
                theme === 'light' ?
                  <FontAwesomeIcon className="iconMoon" icon="moon" />
                  :
                  <FontAwesomeIcon className="iconSun" icon="sun" />
              }
            </button> */}
          </div>
        </div>
      </header>

      <main>
        <div className="room-tittle">
          <h1
            style={theme === 'dark' ? { color: '#FEFEFE' } : {}}
          >
            Sala {tittle}
          </h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={CheckImg} alt="Marcar a pergunta como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAnsweredQuestion(question.id)}
                    >
                      <img src={AnswerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={DeleteImg} alt="Remover pergunta" />
                </button>
              </Questions>
            )
          })}
        </div>
        {/* <div className="button-margin">
          <Button type="submit" isOutlined onClick={handleGoToRoom}>Ir para a pagina</Button>
        </div> */}
      </main>
    </div>
  )
}