import { collection, getDoc, db, auth, doc } from '@/lib/firebase'
import { UserData } from '@/types/types'

export const getUserInfo = async (): Promise<UserData | null> => {
    const currentUser = auth.currentUser

    if (!currentUser) {
        console.log('No current user found.')
        return null
    }

    const userDocRef = doc(db, 'users', currentUser.uid)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
        const userData = {
            id: userDoc.id,
            ...(userDoc.data() as Omit<UserData, 'id'>),
        }
        console.log('User data retrieved:', userData)
        return userData
    } else {
        console.log('User document does not exist.')
        return null
    }
}
