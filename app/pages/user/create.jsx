import CheckIcon from "@components/BackgroundCheck"
import { firestore } from "@lib/firebase/client/firebase"
import { useAuth } from "@hooks/useAuth"
import debounce from "lodash/debounce"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"
import { fetcher } from "@utils/fetcher"

export default function Username(props) {
  const { user } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [isValidUsername, setisValidUsername] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alpaca, setAlpaca] = useState(null)
  const [ACH, setACH] = useState(null)

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // Only set form value if length is < 3 OR it passes regex
    if (val.length >= 3) {
      setUsername(val)
      setLoading(false)
      setisValidUsername(false)
    } else {
      setUsername("")
      setisValidUsername(false)
    }

    if (re.test(val)) {
      setUsername(val)
      setLoading(true)
      setisValidUsername(false)
    }
  }

  useEffect(
    () => checkUsername(username),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const nameQuery = firestore.collection("users").where("username", "==", name)

        const { empty } = await nameQuery.get()

        setisValidUsername(empty)
        if (!empty) {
          toast.error(`Sorry the username ${name} is taken`)
        }
        setLoading(false)
      }
    }, 500),
    []
  )

  async function CreateAlpaca(e) {
    e.preventDefault()
    // TODO - remove for beyond MVP - use user email instead of random//
    const setupEmail = "tests" + Math.floor(Math.random() * 100000) + "@socii.com"
    const testAccount = {
      contact: {
        email_address: setupEmail,
        phone_number: "+442137981999",
        street_address: ["123 Social Drive"],
        city: "Belfast",
        state: "",
        postal_code: "BT00AA",
        country: "GBR",
      },
      identity: {
        given_name: "TEST",
        family_name: "ACCOUNT",
        date_of_birth: "1995-01-07",
        tax_id: "AA123456C",
        tax_id_type: "GBR_NINO",
        country_of_citizenship: "GBR",
        country_of_birth: "GBR",
        country_of_tax_residence: "GBR",
        funding_source: ["employment_income"],
      },
      disclosures: {
        is_control_person: false,
        is_affiliated_exchange_or_finra: false,
        is_politically_exposed: false,
        immediate_family_exposed: false,
      },
      agreements: [
        {
          agreement: "margin_agreement",
          signed_at: "2020-09-11T18:09:33Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "account_agreement",
          signed_at: "2020-09-11T18:13:44Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "customer_agreement",
          signed_at: "2020-09-11T18:13:44Z",
          ip_address: "185.13.21.99",
        },
      ],
      documents: [
        {
          document_type: "cip_result",
          content: "VGhlcmUgYXJlIG5vIHdpbGQgYWxwYWNhcy4=",
          mime_type: "application/pdf",
        },
        {
          document_type: "identity_verification",
          document_sub_type: "passport",
          content: "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
          mime_type: "image/jpeg",
        },
      ],
      trusted_contact: {
        given_name: "Jame",
        family_name: "Doe",
        email_address: "jane.doe@example.com",
      },
    }
    const createAccount = async () => {
      const res = await fetcher("/api/alpaca/accounts", {
        method: "POST",
        headers: { Authorization: `Basic ${user.token}` },
        body: JSON.stringify(testAccount),
      })
      setAlpaca(res)
    }
    createAccount()
  }

  useEffect(() => {
    alpaca?.id ? CreateACH(alpaca?.id) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alpaca?.id])

  async function CreateACH(id) {
    const testACH = {
      accountOwnerName: user.name + " " + user.family_name,
      bankAccountType: "SAVINGS",
      bankAccountNumber: "32132231abc",
      bankRoutingNumber: "121000359",
      nickname: "FUNDING MONEY",
    }
    const createACH = async () => {
      const res = await fetcher("/api/alpaca/ach", {
        method: "PUT",
        headers: { Authorization: `Basic ${user.token}` },
        body: JSON.stringify({ accountId: id, achData: testACH }),
      })
      setACH(res)
    }
    createACH()
  }

  useEffect(() => {
    ACH?.id ? CreateUsername(user, username, router) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ACH?.id])

  const CreateUsername = (user, username, router) => {
    const userRef = firestore.collection(`users`).doc(user.uid)
    const usernameRef = firestore.collection("usernames").doc(username)

    const batch = firestore.batch()
    batch.set(
      userRef,
      { username: username, alpacaID: alpaca.id, alpacaACH: ACH.id },
      { merge: true }
    )
    batch.set(usernameRef, { uid: user.uid })
    batch.commit().then(() => router.push(`/user/${username}`))
  }

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-gray-50">
      <form className="w-full my-16 sm:w-2/3">
        <div className="px-4 py-3 m-4 leading-tight text-gray-700 border border-gray-300 appearance-none bg-brand bg-opacity-10 rounded-xl sm:mb-3 focus:outline-none focus:bg-gray-50 focus:border-gray-500">
          <div className="p-4 text-xl font-bold font-secondary">Choose a username</div>
          <div className="flex w-11/12 px-4 py-3 mb-3 ml-4 leading-tight text-gray-700 bg-white border rounded-lg appearance-none border-brand-dark border-opacity-30 focus:outline-none active:border-opacity-100 active:border-brand focus:border-opacity-100 focus:border-brand">
            <input
              className="flex-grow w-2/3 p-0 bg-white border-none appearance-none focus:ring-0 focus:outline-none sm:w-full"
              type="text"
              placeholder="ElonMuskett"
              onChange={onChange}
            />
            <div
              className={`bg-white text-sm sm:text-tiny ${
                isValidUsername ? "text-brand btn-transition" : "text-red-400"
              } align-middle`}
              onKeyDown={null}
            >
              {isValidUsername ? (
                <CheckIcon className="w-6" onClick={null} />
              ) : (
                <FiX className="w-6 h-6" />
              )}
            </div>
          </div>
          <button
            className="w-11/12 my-4 btn"
            onClick={(e) => (isValidUsername ? CreateAlpaca(e) : null)}
          >
            Choose!
          </button>
        </div>
      </form>
    </main>
  )
}
