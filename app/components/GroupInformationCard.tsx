// TODO 
// - add profile image to groups in firebase, add this to the src of image below
// - correct sizing

import React , { useEffect , useState} from "react"
import { getInitials } from "@utils/getInitials"
import { getRandomImage } from "@utils/getRandomImage"
import { getGroupData } from "@lib/firebase/client/db"

export default function GroupInformaitonCard(groupName: string) {
  const [groupData, setGroupData] = useState(Object)

  useEffect(()=>{
    const data = getGroupData(groupName).then((data)=> setGroupData(data))
  },[])

  return (
    <div className="flex max-w-sm p-6 mx-auto rounded-lg shadow-xl bg-gray-50">
      <div className="flex-shrink-0">
        <img
        src={getRandomImage(getInitials(groupName))}
        className="rounded-full"
        width="40"
        height="40"
      />
      </div>
      {groupData.groupName ? (
      <div className="pt-1 ml-6">
        <div className="text-xl text-gray-900">{groupData.groupName}</div>
        <p className="text-base text-gray-600">Founded: {(groupData.startDate.toDate().toISOString().split('T')[0])}</p>
        <p className="text-base text-gray-600">Description: {groupData.groupDescription}</p>
      </div>
      ):(
        null
      )}
    </div>
  )
}
