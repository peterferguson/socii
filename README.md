# TODO

## Buying/Selling Mechanism

- [X] Create HTTP function which executes trades
  - Criteria:
    - Minimum params:
      - asset
      - orderType
      - executorGroup
      - executee (person within group who suggested trade?)
      - shares
      - price (should query this in the function?)
    - These will be sent not as kwargs but just args in a chat bot command.
    - Chat execution will provide some extra context for a better UX (user need only input asset, shares & select orderType button )
- [X] Create webhook for chatbot commands
  - Either a vercel or gcp cloud function in either python or NodeJS
- [X] Repurpose giphy functionality for `/buy` & `/sell` commands or `/trade` (or `/invest` to stick to company ethos) leaning on orderType arg
  - giphy command comes with send, shuffle & cancel functionality. In this space we could present a asset card with the (real-time) purchase price, orderType selector & cancel option. As a starting point.



## Notes

A buy command has been created with simply a ticker as the arg. The advanced users of the chat bot will avail of the above more than the regular user. We NEED to tailor to the regular user first for a mvp. Meaning simpler UI navigation & UX, i.e. autocomplete with recently viewed tickers/ most popular tickers & autocomplete command options.

ALTHOUGH this is MVP feature we have already implemented the commands so launching is first priority regardless of usability hindering features.
So todays work is to get the command linked to actual trade execution!


### Mechanism
confirm buy command
->
send mentions in a chat message with thread for confirmation of trade with other investors 
->
some db collection tracking the submissions of investors with a document function which is somehow triggered by the total investor count reaching the member count on this.

