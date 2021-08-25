import { messaging } from ".."

interface User {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  channel_unread_count?: number
  channel_last_read_at?: string
  total_unread_count?: number
  unread_channels?: number
  unread_count?: number
}

interface Member {
  user_id: string
  user: User
  created_at: string
  updated_at: string
  banned: boolean
  shadow_banned: boolean
  role: string
  channel_role: string
}

interface Message {
  id: string
  text: string
  html: string
  type: string
  user: User
  attachments: any[]
  latest_reactions: any[]
  own_reactions: any[]
  reaction_counts: number
  reaction_scores: any
  reply_count: number
  cid: string
  created_at: string
  updated_at: string
  shadowed: boolean
  mentioned_users: User[]
  silent: boolean
  pinned: boolean
  pinned_at: string
  pinned_by: string // ? is this right
  pin_expires: string
}

interface Payload {
  type: string
  cid: string
  channel_id: string
  channel_type: string
  message: Message
  user: User
  watcher_count: number
  created_at: string
  members: Member[]
}

export const handlePush = async (payload: Payload) => {
  const { user, message, cid, channel_id } = payload

  const topicName = cid.replace(":", "-")
  const title = `${user.name} has sent a message in ${channel_id}`
  const body = `${user.name} says: ${
    message.text.length >= 15 ? message.text.slice(0, 15) : message.text
  }`

  const pushMessage = {
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        imageUrl: "https://socii.app/favicons/favicon.ico",
      },
    },
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
      fcm_options: {
        image: "https://socii.app/favicons/favicon.ico",
      },
    },
    webpush: {
      headers: {
        Urgency: "high",
        image: "https://socii.app/favicons/favicon.ico",
      },
      notification: {
        body,
        // requireInteraction: true,
        badge: "https://socii.app/favicons/favicon.ico",
      },
    },
    topic: topicName,
  }

  try {
    const response = await messaging.send(pushMessage)
    return `Successfully sent message: ${response}`
  } catch (error) {
    return `Error sending message: ${error}`
  }
}
