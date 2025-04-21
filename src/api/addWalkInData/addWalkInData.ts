import { collection, addDoc, db } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const addWalkInData = async (data: WalkInCustomerData) => {
    try {
        const docRef = await addDoc(collection(db, 'walk_in_data'), data)
        console.log('Document written with ID: ', docRef.id)
        return docRef.id
    } catch (error) {
        console.error('Error adding document: ', error)
        throw error
    }
}
