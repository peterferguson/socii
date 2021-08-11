import {
  collection, getDocs, orderBy,
  query, QuerySnapshot, where
} from "firebase/firestore";
import { firestore } from "../firebase";


export const getAlpacaStocks = async (): Promise<QuerySnapshot> => await getDocs(
  query(
    collection(firestore, "tickers"),
    where("alpaca", "!=", ""),
    orderBy("alpaca", "desc")
  )
);
