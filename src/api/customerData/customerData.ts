import { collection, addDoc, db } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const customerData = async (data: WalkInCustomerData) => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), data)
    return docRef.id
  } catch (error) {
    console.error('Error adding document: ', error)
    throw error
  }
}
