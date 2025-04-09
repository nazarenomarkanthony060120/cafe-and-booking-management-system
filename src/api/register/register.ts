import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from '@/lib/firebase'
import { RegisterFormValues } from '@/types/types'

export const registerUser = async (data: RegisterFormValues) => {
  console.log(data)
  return await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user
      setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error registering user:', errorCode, errorMessage)
    })
}
