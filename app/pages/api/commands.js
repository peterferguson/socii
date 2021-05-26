const handleCommand = (req, res) => {
  const { query, method } = req

  const type = query?.Type

  switch (type) {
    case "buy":
      commands[type]
      res.status(200).json({ type, hook_url: commands[type] })
      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const commands = {
  buy: "https://europe-west2-sociiinvest.cloudfunctions.net/buyCommand",
}

export { handleCommand }
