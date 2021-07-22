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

import '../styles/adminRoom.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, tittle, category } = useRoom(roomId);

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
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="LetmeAsk" />
          <span>
            categoria da sala : {category}
          </span>

          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-tittle">
          <h1>
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