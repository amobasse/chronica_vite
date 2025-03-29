import { useState } from 'react';
import { loginUser } from '../services/userService';

const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage(`You must enter email and password.`);
            return;
        }

        try {
            const result = await loginUser({ email, password });

            if (result.success) {
                setMessage(`Welcome back, ${username}!`);
            } else {
                setMessage(`Invalid username or password.`);
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
                    id='email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type='submit'
                    disabled={!email || !password}
                >
                    Login
                </button>
                {
                    message && <p className='message'>{message}</p>
                }
            </div>
        </form>
    );
};

export default LoginForm;