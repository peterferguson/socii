# TODO

## Buying/Selling Mechanism

- [ ] Create HTTP function which executes trades
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
- [ ] Create webhook for chatbot commands
  - Either a vercel or gcp cloud function in either python or NodeJS
- [ ] Repurpose giphy functionality for `/buy` & `/sell` commands or `/trade` (or `/invest` to stick to company ethos) leaning on orderType arg
  - giphy command comes with send, shuffle & cancel functionality. In this space we could present a asset card with the (real-time) purchase price, orderType selector & cancel option. As a starting point.