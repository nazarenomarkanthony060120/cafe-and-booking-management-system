import { collection, addDoc, updateDoc, doc, db, query, where, getDocs } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const addWalkInData = async (data: WalkInCustomerData) => {
  try {
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
      collection(db, 'walk_in_users'),
      where('contactNumber', '==', data.contactNumber)
    )
    const contactQuerySnapshot = await getDocs(contactQuery)

    if (!contactQuerySnapshot.empty) {
      throw new Error('contactNumber-already-in-use')
    }

    const docRef = await addDoc(collection(db, 'walk_in_users'), data)
    console.log('Document written with ID: ', docRef.id)
    return docRef.id
  } catch (error: any) {
    console.error('Error adding document: ', error)
    throw error
  }
}
