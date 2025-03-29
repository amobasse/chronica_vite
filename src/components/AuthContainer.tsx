import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { User } from '../types/User';
import Dashboard from './Dashboard';

const AuthContainer = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState<User | null>();

    const handleLoginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
    };

    if (user) {
        return <Dashboard user={user} />
    }
    return (
        <div className="auth-container">
            <h1>{showLogin ? 'Login' : 'Create Account'}</h1>

            {
                showLogin ?
                    ( <LoginForm onLoginSuccess={handleLoginSuccess}/> )
                    :
                    ( <RegistrationForm onRegisterSuccess={() => setShowLogin(true)}/> )    
            }

            <p>
                { showLogin ? "Don't have an account?" : "Already have an account?" }
                <button
                    onClick={() => setShowLogin(!showLogin)}
                    className='text-button'
                >

                    { showLogin ? "Create Account" : "Login" }
                </button>
            </p>
        </div>
    );
};

export default AuthContainer;