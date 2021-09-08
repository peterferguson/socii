import { ITradeMML, ITradeMMLMessage } from "../types";



export const tradeMML = ({ username, tickerSymbol, tradeType }: ITradeMML): ITradeMMLMessage => {
    const mmlstring = `<mml type="card"><${tradeType}></${tradeType}></mml>`;
    const mmlmessage = {
        user_id: username,
        text: `How much you would like to ${tradeType}?`,
        command: tradeType,
        attachments: [
            {
                type: tradeType,
                mml: mmlstring,
                tickerSymbol: tickerSymbol,
                actions: [
                    {
                        name: "action",
                        text: tradeType.charAt(0).toUpperCase() + tradeType.slice(1),
                        type: "button",
                        value: tradeType,
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
    };
    return mmlmessage;
};
