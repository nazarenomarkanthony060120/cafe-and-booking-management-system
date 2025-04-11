import { addDoc, auth, collection, createUserWithEmailAndPassword, db } from '@/lib/firebase'
import { RegisterFormValues } from '@/types/types'

export const registerUser = async (data: RegisterFormValues) => {
  console.log(data)
  return await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user
      const result = addUser(data, user.uid)
      return result
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error registering user:', errorCode, errorMessage)
    })
}

const addUser = async (user: RegisterFormValues, uid: string) => {
  return await addDoc(collection(db, 'users'), {
    uid: uid,
    ...user,
    ctype: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}
