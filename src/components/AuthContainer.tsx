import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { User } from '../types/User';
import Dashboard from './Dashboard';
import { useAuth } from '../App';

const AuthContainer = () => {
    const { user, showLogin, setShowLogin } = useAuth();

    if (user) {
        return <Dashboard/>
    }
    return (
        <div className="auth-container">
            <h1>{showLogin ? 'Login' : 'Create Account'}</h1>

            {
                showLogin ?
                    ( <LoginForm/> )
                    :
                    ( <RegistrationForm/> )    
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