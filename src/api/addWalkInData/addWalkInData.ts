import { collection, getDocs, db } from '@/lib/firebase'
import { WalkInCustomerData } from '@/types/types'

export const addWalkInData = async (): Promise<WalkInCustomerData[]> => {
    const snapshot = await getDocs(collection(db, 'walk_in_data'))

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<WalkInCustomerData, 'id'>),
    }))
}
