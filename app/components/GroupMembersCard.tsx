// TODO
// - add profile image to groups in firebase, add this to the src of image below
// - display username not uid

import React, { useEffect, useState } from "react"
import { getInvestorsUIDs } from "@lib/firebase/client/db"
import { getInvestorsPhotos } from "@lib/firebase/client/db"
import Link from "next/link"

export default function GroupMembersCard(groupName: string) {
  const [groupMembers, setGroupMembers] = useState(null)
  const [photoUrls, setPhotoUrls] = useState(null)

  useEffect(() => {
    getInvestorsUIDs(groupName).then((members) => {
      setGroupMembers(members)
    })
  }, [])

  useEffect(() => {
    if (groupMembers) {
      getInvestorsPhotos(groupMembers).then((photos) => setPhotoUrls(photos))
    }
  }, [groupMembers])

  return (
    <div className="flex justify-center pt-1">
      <div className="flex flex-col p-6 rounded-lg shadow-xl bg-gray-50">
        <div>
          <div className="pb-2 text-xl text-gray-900">Members</div>
          <div className="items-center">
            <div className="flex overflow-hidden -space-x-1">
              {photoUrls?.map((m, i) => {
                return (
                  <Link href={`/users/${groupMembers[i]}`} key={`member-${i}`}>
                    <img
                      className="inline-block h-10 rounded-full cursor-pointer w-15 ring-2 ring-white"
                      src={m}
                      alt="member photo"
                      title={groupMembers[i]}
                    />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
