import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../../index"

export const getAssetCategories = async () =>
  await getDocs(query(collection(db, "assetCategories")))
