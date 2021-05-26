
export const buyMML= ({username, tickerSymbol}) => {

  const mmlstring = `<mml type="card"><buy></buy></mml>`
  const mmlmessage = {
    user_id: username,
    attachments: [
      {
        type: "buy",
        mml: mmlstring,
        tickerSymbol: tickerSymbol,
        actions: [
          {
            name: "action",
            text: "Submit",
            type: "button",
            value: "submit",
          },
          {
            name: "action",
            text: "Cancel",
            type: "button",
            value: "cancel",
          },
        ],
      },
    ],
  }
  return mmlmessage
}
