import { createContext, ReactNode, useState, useEffect } from 'react';

import { firebase, auth } from '../services/firebase';

import { useHistory } from 'react-router-dom'

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

type AuthContextProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProps) {

  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from google acount')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from google acount')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function logOut() {
    await auth.signOut()
    setUser(undefined)
    history.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle, logOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}