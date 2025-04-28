import { auth, db, signInWithEmailAndPassword, doc, getDoc } from '@/lib/firebase'
import { LoginFormValues } from '@/types/types'

export const login = async (data: LoginFormValues) => {
  console.log(data)
  return await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user
      const userDocRef = doc(db, 'users', user.uid)

      return getDoc(userDocRef).then((userDocSnap) => {
        if (userDocSnap.exists()) {
          return userDocSnap.data().ctype
        } else {
          console.warn('User document does not exist.')
          return null
        }
      })
    })
    .catch((error) => {
      throw error
    })
}
