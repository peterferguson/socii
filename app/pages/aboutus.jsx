import React from "react"

export default function AboutUs() {
  return (
    <div className="flex flex-col h-screen p-12 text-brand leading-20">
      <h1 className="p-4 font-semibold font-primary text-8xl">About Us</h1>
      <h2 className="items-center justify-center p-8 mx-auto text-5xl text-teal-300 font-primary">
        Invest with Friends
      </h2>
      <p className="p-4 mx-auto">
        socii&apos;ds goal is to be the starting place for small groups of friends to
        begin, learn and refine their investing skills, together. Creating an investment
        group is hard. But it is probably one of the best and most fun ways of learning
        about investing.
      </p>
      <h2 className="items-center justify-center p-8 mx-auto text-5xl text-teal-300 font-primary">
        {" "}
        The Problem with Group Investing
      </h2>
      <p className="p-4 mx-auto">
        With the inception and raise in commision-free investing, there has been an
        influx in retail investors. Most without a clue of how to invest. My investment
        journey began with an initial solo learning phase followed by a desire to share
        this new found joy (and way to make money) with friends. We looked at creating
        an investment club the traditional way - however it is riddles with hurdles.{" "}
        <br />
        Pooling investment clubs are dying. They mainly existed to avoid the high
        commission on trades for those who could not afford them. <br />
      </p>
      <p className="p-4 mx-auto">
        Enter commission free trading, where people no longer needed to join together to
        avoid this cost. Resulting in the loss of the fun of working together on the
        trades, counter arguments being risen against your investment thesis (which is
        much harder to do on your own), the visibility of holdings (and how well the
        portfolio has done if the individual has other holdings in the account), the
        learning together then also diminishes over time.
      </p>
      <h2 className="items-center justify-center p-8 mx-auto text-5xl text-teal-300 font-primary">
        {" "}
        Social Investing{" "}
      </h2>
      Socii is born out of a societal game of “keep-away” when it comes to keeping
      Investing away from the lower classes. We are here to even the odds. Bringing the
      ability to learn how to invest to the populous - with the ability to form small
      investment groups with your friends, you work as an active check and balance on
      each other with each trade you wish to pursue. The best way to learn to invest, is
      by investing with a group of people, and being forced to explain why you think
      that the next investment is the right one, opposed to just going ahead with a
      trade.
    </div>
  )
}
