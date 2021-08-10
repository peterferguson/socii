import { singleLineTemplateString } from "../../utils/singleLineTemplateString";

export const confirmInvestmentMML = ({
  username, action, tickerSymbol, cost, shares, parent_id, show_in_channel,
}) => {
  const mmlstring = `<mml><investmentConfirmation></investmentConfirmation></mml>`;
  const mmlmessage = {
    user_id: username,
    text: singleLineTemplateString`
      Hey ${username} wants the group to ${action} ${shares} shares of ${tickerSymbol} 
      for ${cost}. Do you agree that the group should execute this trade?
      `,
    command: action,
    parent_id: parent_id || null,
    show_in_channel: show_in_channel || null,
    attachments: [
      {
        tickerSymbol: tickerSymbol,
        type: "investmentConfirmation",
        mml: mmlstring,
        actions: [
          {
            name: "action",
            text: "Yes",
            type: "button",
            value: "yes",
          },
          {
            name: "action",
            text: "No",
            type: "button",
            value: "no",
          },
        ],
      },
    ],
  };
  return mmlmessage;
};
