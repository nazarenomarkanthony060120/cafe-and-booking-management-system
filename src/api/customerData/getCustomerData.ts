import { collection, db, getDocs } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const getCustomerData = async (p0: any): Promise<WalkInCustomerData[]> => {
  const querySnapshot = await getDocs(collection(db, 'customers'))

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<WalkInCustomerData, 'id'>),
  }))
}
