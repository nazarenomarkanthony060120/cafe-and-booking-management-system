import {
  auth,
  createUserWithEmailAndPassword,
  db,
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
} from '@/lib/firebase'
import { RegisterFormValues } from '@/types/types'

export const registerUser = async (data: RegisterFormValues) => {
  try {
    // 1. Check if contactNumber already exists
    const contactQuery = query(
      collection(db, 'users'),
      where('contactNumber', '==', data.contactNumber)
    )
    const contactQuerySnapshot = await getDocs(contactQuery)

    if (!contactQuerySnapshot.empty) {
      throw new Error('contactNumber-already-in-use')
    }

    // 2. If contact number is unique, create the user with email/password
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const user = userCredential.user

    // 3. Add user to Firestore
    await addUser(data, user.uid)
    return user
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('email-already-in-use')
    }
    throw error
  }
}

const addUser = async (user: RegisterFormValues, uid: string) => {
  return await setDoc(doc(db, 'users', uid), {
    ...user,
    ctype: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}
