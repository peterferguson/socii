import { singleLineTemplateString } from "./singleLineTemplateString"

export const notEnoughBuyingPowerMessage = (username) => ({
  user_id: "socii",
  text: singleLineTemplateString`
      Some members of the group do not have enough buying power to execute the trade!
      `,
  onlyForMe: username,
})
