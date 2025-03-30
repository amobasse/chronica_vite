import { useState } from 'react';
import { loginUser } from '../services/userService';
import { useAuth } from '../App.tsx';

const LoginForm = () => {
    const { user, setUser } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(`Email is ${email}`);

        if (!email || !password) {
            setMessage(`You must enter email and password.`);
            return;
        }

        try {
            const result = await loginUser({ email, password });

            console.log(`On login, email is ${email} and password is ${password}.`);
            console.log(JSON.stringify(result));
            if (result.success && result.user) {
                setUser(result.user);
                setMessage(`Welcome back, ${user?.username}!`);
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
                <label htmlFor='Email'>Email:</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    autoComplete="email"
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
                    className="login-button"
                    type='submit'
                    //disabled={!email || !password}
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