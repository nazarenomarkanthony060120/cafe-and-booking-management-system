import { auth, db, collection, addDoc, getDocs, where, query } from '@/lib/firebase'
import { AddPcFormValues } from '@/types/types'

export const addPcAdmin = async (data: AddPcFormValues) => {
  try {
    const currentUser = auth.currentUser

    if (!currentUser) throw new Error('No user is currently logged in.')

    const pcData = {
      pcNumber: data.pcNumber,
      status: 'Available',
      email: 'admin@email.com',
      uid: currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'pcs_list'), pcData)

    return docRef.id
  } catch (error) {
    console.error('Error adding PC:', error)
    throw error
  }
}

export const isPcNumberTaken = async (pcNumber: string): Promise<boolean> => {
  const q = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
  const snapshot = await getDocs(q)
  return !snapshot.empty
}
