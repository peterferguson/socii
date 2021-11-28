import { useEffect, useState } from "react"
import { getTickerISIN } from "app/lib/firebase/db"

export const useISIN = ( symbol:string ) => {
    const [isin, setIsin] = useState(null)

    useEffect(()=>{
      getTickerISIN(symbol).then((r)=>setIsin(r))
    },[])

    return {isin}
}
