import { collection, addDoc, db } from '@/lib/firebase'
import { ReservationData } from '@/types/types'

export const reservationData = async (data: ReservationData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservation'), data)
    return docRef.id
  } catch (error) {
    console.error('Error adding document: ', error)
    throw error
  }
}
