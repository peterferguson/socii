import React from "react"
import {
  Activity,
  ActivityFooter,
  CommentField,
  CommentItem,
  CommentList,
  FlatFeed,
  InfiniteScrollPaginator,
  LikeButton,
  StatusUpdateForm,
} from "react-activity-feed"

export default function Feed() {
  return (
    <div className="flex flex-col w-full">
      <StatusUpdateForm />
      <FlatFeed
        notify
        feedGroup="user"
        options={{
          limit: 6,
          withOwnChildren: true,
          withRecentReactions: true,
        }}
        Paginator={InfiniteScrollPaginator}
        Activity={({ activity, feedGroup, userId }) => {
          const newActivity = {
            ...activity,
            actor: {
              ...activity.actor,
              data: {
                ...activity.actor.data,
                name: "socii",
                profileImage: "/favicons/favicon-96x96.png",
              },
            },
          }
          return (
            <Activity
              activity={newActivity}
              feedGroup={feedGroup}
              userId={userId}
              Footer={() => (
                <>
                  <ActivityFooter
                    activity={activity}
                    feedGroup={feedGroup}
                    userId={userId}
                  />
                  <CommentField activity={activity} />
                  <CommentList
                    activityId={activity.id}
                    CommentItem={({ comment }) => (
                      <div className="wrapper">
                        <CommentItem comment={comment} />
                        <LikeButton reaction={comment} />
                      </div>
                    )}
                  />
                </>
              )}
            />
          )
        }}
      />
    </div>
  )
}
