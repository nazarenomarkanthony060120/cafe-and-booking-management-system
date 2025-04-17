import { collection, getDocs, db } from '@/lib/firebase'
import { PcData } from '@/types/types'

export const getPcList = async (): Promise<PcData[]> => {
  const snapshot = await getDocs(collection(db, 'pcs_list'))

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PcData, 'id'>),
  }))
}
