import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.PUBLIC_NEXT_API_KEY,
  authDomain: process.env.PUBLIC_NEXT_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_NEXT_PROJECT_ID,
  storageBucket: process.env.PUBLIC_NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_NEXT_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_NEXT_APP_ID,
  measurementId: process.env.PUBLIC_NEXT_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
export default { app, auth, db }