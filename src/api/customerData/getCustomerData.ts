import { collection, addDoc, db, getDocs } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const getCustomerData = async (data: WalkInCustomerData) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'customers'))
    const customers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return customers
  } catch (error) {
    console.error('Error fetching customers: ', error)
    throw error
  }
}
