import AuthContainer from './components/AuthContainer';
import './styles/App.css'
import { User } from './types/User';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  user: null as User | null,
  setUser: (user: User | null) => {},
  showLogin: true,
  setShowLogin: (show: boolean) => {}
});

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, showLogin, setShowLogin }}>
        <div className="App">
          <AuthContainer/>
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
