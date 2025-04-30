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
    // 0.1 Validate name format (only letters and spaces)
    const isValidName = /^[A-Za-z\s]+$/.test(data.name)
    if (!isValidName) {
      throw new Error('invalid-name')
    }
    // 0. Validate contact number format (must start with 09 and be 11 digits)
    const isValidContact = /^09\d{9}$/.test(data.contactNumber)
    if (!isValidContact) {
      throw new Error('invalid-contact-number')
    }

    // 1. Check if contactNumber already exists
    const contactQuery = query(
      collection(db, 'users'),
      where('contactNumber', '==', data.contactNumber)
    )
    const contactQuerySnapshot = await getDocs(contactQuery)

    if (!contactQuerySnapshot.empty) {
      throw new Error('contactNumber-already-in-use')
    }

    // 2. Create the user with email/password
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
