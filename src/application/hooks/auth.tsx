import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth'
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { createContext, useContext, useEffect, useState } from 'react'

const auth = getAuth()

GoogleSignin.configure({
  webClientId:
    '1040662176973-9m2fb00itrvh1av4o0mdfl4rvn2qphgr.apps.googleusercontent.com',
})

type User = {
  email: string
  name: string
  role: string
  photo: string
}

type AuthContextType = {
  user: User | null
  login: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>
  register: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>
  logout: () => Promise<void>
  loading: boolean
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      let user = null

      if (authUser) {
        user = await getOrCreateUser(authUser)
      }

      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  async function getOrCreateUser(
    authUser: FirebaseAuthTypes.User,
  ): Promise<User> {
    const db = getFirestore()
    const userRef = doc(db, 'users', authUser.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      const newUser: User = {
        email: authUser.email || '',
        name: authUser.displayName || '',
        role: 'user',
        photo: authUser.photoURL || '',
      }

      await setDoc(userRef, {
        ...newUser,
        createdAt: serverTimestamp(),
        uid: authUser.uid,
      })

      return newUser
    }

    const data = userSnap.data()!
    return {
      email: data.email,
      name: data.name,
      role: data.role,
      photo: data.photo,
    }
  }

  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const signInResult = await GoogleSignin.signIn()

    const idToken = signInResult.data?.idToken

    if (!idToken) {
      throw new Error('No ID token found')
    }

    const googleCredential = GoogleAuthProvider.credential(idToken)

    return signInWithCredential(getAuth(), googleCredential)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
