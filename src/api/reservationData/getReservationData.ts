import { collection, getDocs, db } from '@/lib/firebase'
import { ReservationData } from '@/types/types'

export const getReservationData = async (): Promise<ReservationData[]> => {
    const snapshot = await getDocs(collection(db, 'reservation'))

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ReservationData, 'id'>),
    }))
}
