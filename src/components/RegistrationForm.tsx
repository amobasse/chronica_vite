import { useState } from 'react';
import { registerUser } from '../services/userService';
import { useAuth } from "../App.tsx";

const RegistrationForm = () => {
    const { user, setUser } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setMessage(`You must enter username and email and password.`);
            return;
        }

        try {
            const result = await registerUser({ username, email, password });

            if (result.success && result.user) {
                setUser(result.user);
                setMessage(`Accounted created, ${user?.username}!`);
            } else {
                setMessage(`Invalid submission.`);
            }
        } catch (error) {
            setMessage(`An error occurred during login.`);
            console.error(error);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='Username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor='Email'>Email:</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='Password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type='submit'
                    disabled={!username || !email || !password}
                >
                    Create Account
                </button>
                {
                    message && <p className='message'>{message}</p>
                }
            </div>
        </form>
    );
};

export default RegistrationForm;