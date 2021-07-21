# Integrating Alpaca with Firestore

A script `isin.py` has been run over the list of alpaca assets to find their ISINs.
Allowing us to directly link a good proportion of the Alpaca assets to our exising data.

It also adds some of the Alpaca data to the `tickers/{isin}` document, like the id & whether it is fractionable or not.
We can use this data in the frontend to query the assets, display fractionable symbols on the icons & enable us to reference the document using the id.

> ❓ Query Improvement
>
> To that end, maybe we should create a reverse mapping of id -> isin so that we can query these faster?

### TODOs

- [ ] Add the ISINs which have been scraped from AJBell to Firestore
- [ ] Find the rest of the ISINs & update Firestore
- [ ] The new stocks may need run through some of the scripts from `ticker_symbol.py` to: 
  - [ ] find the yahoo & alpha vantage suffixes
  - [ ] get the logo & logo colours
  - [ ] etc
- [ ] ~
