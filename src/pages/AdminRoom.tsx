import { useParams, useHistory } from 'react-router-dom';

import logoDarkImg from '../assets/images/logo-dark.svg';
import logoLightImg from '../assets/images/logo-light.svg';
import sunImg from '../assets/images/sun.svg';
import moonImg from '../assets/images/moon.svg';
import deleteDarkImg from '../assets/images/delete-dark.svg';
import checkDarkImg from '../assets/images/check-dark.svg';
import answerDarkImg from '../assets/images/answer-dark.svg';
import deleteLightImg from '../assets/images/delete-light.svg';
import checkLightImg from '../assets/images/check-light.svg';
import answerLightImg from '../assets/images/answer-light.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	// const { user } = useAuth();
	const history = useHistory();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { title, questions } = useRoom(roomId);
	const { theme, toggleTheme } = useTheme();

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/');
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true,
		});
	}

	async function handleHighlightQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: true,
		});
	}

	return (
		<div id="page-room" className={theme}>
			<header>
				<div className="content">
					{theme === 'light' ? <img src={logoDarkImg} alt="Letmeask" /> : <img src={logoLightImg} alt="Letmeask" />}
					<div className="toggle-area">
						<button
							className="toggle-theme"
							onClick={toggleTheme}>{
								theme === 'light' ? <img src={sunImg} alt="Light Mode" /> : <img src={moonImg} alt="Dark Mode" />
							}
						</button>
					</div>
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
					</div>
				</div>
			</header>
			<main className="content">
				<div className="room-title">
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>
				<div className="question-list">
					{questions.map(question => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isAnswered={question.isAnswered}
								isHighlighted={question.isHighlighted}
							>
								{!question.isAnswered && (
									<>
										<button
											type="button"
											onClick={() => handleCheckQuestionAsAnswered(question.id)}
										>
											{theme === 'light' ? <img src={checkDarkImg} alt="Marcar pergunta como respondida" /> : <img src={checkLightImg} alt="Marcar pergunta como respondida" />}
										</button>
										<button
											type="button"
											onClick={() => handleHighlightQuestion(question.id)}
										>
											{theme === 'light' ? <img src={answerDarkImg} alt="Dar destaque à pergunta" /> : <img src={answerLightImg} alt="Dar destaque à pergunta" />}
										</button>
									</>
								)}
								<button
									type="button"
									onClick={() => handleDeleteQuestion(question.id)}
								>
									{theme === 'light' ? <img src={deleteDarkImg} alt="Remover pergunta" /> : <img src={deleteLightImg} alt="Remover pergunta" />}
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}