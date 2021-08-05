import React from "react"
import Head from "next/head"
interface IProps {}
export const ReactVisScript: React.FC<IProps> = () => (
  <Head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/react-vis@1.11.7/dist"
    />
  </Head>
)
