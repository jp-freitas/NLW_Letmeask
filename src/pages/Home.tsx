import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import logoLightImg from '../assets/images/logo-light.svg';
import sunImg from '../assets/images/sun.svg';
import moonImg from '../assets/images/moon.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import { database } from '../services/firebase';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const { theme, toggleTheme } = useTheme();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <div className="toggle-area">
                        <button
                            className="toggle-theme"
                            onClick={toggleTheme}>{
                                theme === 'light' ? <img src={sunImg} alt="Light Mode" /> : <img src={moonImg} alt="Dark Mode" />
                            }
                        </button>
                    </div>
                    {theme === 'light' ? <img src={logoDarkImg} alt="Letmeask" /> : <img src={logoLightImg} alt="Letmeask" />}
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na Sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
};