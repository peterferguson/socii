import {
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    limit,
  } from "firebase/firestore"
  import { firestore } from "../../lib/firebase/client/db/index"

const  docToFirestore = async  () =>{
    const tradeQ = query(
    collection(firestore, "tradesEvents"),
    where("execution_id","==", "c87ecc19-9fe3-4097-b0e0-847fb2dc0e1e"),
    limit(1)
    )
    const tradeDoc = (await getDocs(tradeQ)).docs?.pop()
    const tradeData = tradeDoc.data()
    await setDoc(doc(firestore, "tradesEvents", "3060232y"), {test: "true" , ...tradeData})
}
docToFirestore()
