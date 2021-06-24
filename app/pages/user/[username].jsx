// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// // - Create pie charts & skeleton loaders for those charts
// - Create conversion function for the group holdings data into pie format
// - Create conversion function for the group trade data into long form cards
// ? - Create conversion function for the group trade data into an activity feed
// - Get doc in one go - remove for each - see IMPROVE
// -


import GroupColumn from "@components/GroupCharts"
import { PieCardSkeleton } from "@components/PieCard"
import UserPhoto from "@components/UserPhoto"
import { UserContext } from "@lib/context"
import { getRandomTailwindColor } from "@utils/helper"
import { auth , firestore} from "@lib/firebase"
import { useRouter } from "next/router"
import React, { useContext , useState , useEffect,  useRef } from "react"

export default function UserPage() {
  const router = useRouter()
  const pagename = router.query.username
  const { username, userGroups } = useContext(UserContext)
  const [userData, setUserData] = useState([])
  const checkRef = useRef(1)
  
  const isUsersHomepage = pagename === username

  /////// IMPROVE - make like the below comment
  /////// method to just get complte doc in one go? better than for each field?
  // const fetchGroups = async() =>{
  //   const groupsQuery = firestore.collection("users").where("username", "==", pagename).limit(1)
  //   const {tmp} = (await groupsQuery.get()).docs?.[0]
  //     setUserData(tmp.data())
  // }

  //useEffect 

  useEffect(()=> {
    console.log(pagename)
  }, [pagename]
  )

  useEffect(() => {
    if (pagename){
    console.log("effect");
      fetchGroups()
    }
  }, [checkRef]
  )
  
  const fetchGroups = async() =>{
    const groupsQuery = await firestore.collection("users").where("username", "==", pagename)
    .get().then(snap=> {
    snap.docs.forEach(doc => {
      setUserData(doc.data())
    })
    })
    if (typeof(userData.groups)!="object") {
      checkRef.current= 0
    }
  }


  return (
    <main>
      <div className="flex flex-row w-full">
        <UserPhoto
          username={pagename}
          photoURL={isUsersHomepage ? auth.currentUser?.photoURL || "" : ""}
        />
        <div className="p-4 text-xl font-poppins text-brand-light">{pagename}</div>
      </div>
      <div className={`flex items-center justify-center m-8 mx-auto text-5xl font-poppins text-${getRandomTailwindColor()}`}>
        Groups
      </div>
      <div className="flex flex-wrap justify-center">
        {(!auth.currentUser || !userGroups) &&
          [1, 2, 3].map((i) => (
            <PieCardSkeleton key={`skeleton-${i}`} scaling={0.3} radius={250} />
          ))}
        {
          userData.groups?.map((groupName, index) => {
            return <GroupColumn key={`group-${index}`} groupName={groupName} />
          })}
      </div>
    </main>
  )
}
