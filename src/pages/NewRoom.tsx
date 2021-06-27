import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import logoLightImg from '../assets/images/logo-light.svg';
import sunImg from '../assets/images/sun.svg';
import moonImg from '../assets/images/moon.svg';

import { Button } from '../components/Button';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import '../styles/auth.scss';

export function NewRoom() {
	const { user } = useAuth();
	const history = useHistory();
	const [newRoom, setNewRoom] = useState('');
	const { theme, toggleTheme } = useTheme();


	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth" className={theme}>
			<aside>
				<img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real.</p>
			</aside>
			<main >
				<div className="main-content" >
					<div className="toggle-area">
						<button
							className="toggle-theme"
							onClick={toggleTheme}>{
								theme === 'light' ? <img src={sunImg} alt="Light Mode" /> : <img src={moonImg} alt="Dark Mode" />
							}
						</button>
					</div>
					{theme === 'light' ? <img src={logoDarkImg} alt="Letmeask" /> : <img src={logoLightImg} alt="Letmeask" />}
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da Sala"
							onChange={event => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type="submit">
							Criar sala
						</Button>
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to="/">clique aqui.</Link>
					</p>
				</div>
			</main>
		</div>
	);
};