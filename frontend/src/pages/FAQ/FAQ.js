import { useState } from "react";

import { Accordion, LandingHero, SEO } from "@components";

import "@style/pages/FAQ.css";

const title = "FAQ | Badger";
const description = "Badger is a EVM-Based smart contract factory that deploys new instances of Organizations and Badges for personal use and management.";

const FAQ = () => {
    const [accordions, setAccordions]  = useState({ faqs: [{
        title: "What is Badger built to solve?",
        content: "Before Badger it was very difficult to have onchain access policies with network permissions. Badger lowers the barrier and empowers every individual with the ability to issue, manage and revoke onchain permissions in seconds for free without any coding.",
    }, {
        title: "Who is Badger for?",
        content: "Badger was specifically designed for people like you. Avoiding the land of complexity, Badger is focused on bringing the power of Badges to every person while removing the technical barrier.",
    }, {
        title: "What can I use a Badge for?",
        content: "With Badges, the capabilities are as wide as your imagination. You can use Badges as a form of reputation, access, targeting, etc. Once you have deployed Badges with Badger, your team can integrate with the leading solutions in Web3 management. Take a look at our [integration docs](https://docs.trybadger.com/help/integration-tutorials) to learn more.",
    }, {
        title: "How do I get started?",
        content: "All you have to do is connect your wallet.",
    }, {
        title: "How does Badger work?",
        content: "Badger is a EVM-Based smart contract factory that deploys new instances of Organizations and Badges using a decentralized proxy."
    }, {
        title: "Is there anything I need to do or pay for?",
        content: "At this time, all Badger use is free and comes at no additional charge to the cost of gas."
    }, {
        title: "What blockchains are supported?",
        content: "Currently only Polygon is supported. Badger goes where it is needed. Need the protocol running on another chain? Let us know."
    }, {
        title: "Why should I choose Badger instead of one of the other great options?",
        content: "Badger is designed to be the simplest and most future-looking solution for every operator. Without the need of writing custom-coded solutions, every organization and operator can get to action in seconds. Standing in contrast to other solutions, while Badger is opinionated-by-default it is also highly customizable. Badger is built to be the most flexible solution for every operator enabling middle-out management."
    }, {
        title: "What type of tokens are the minted Badges?",
        content: "Badger is built using ERC-1155 tokens designed to serve as credential badges."
    }, {
        title: "What collections are supported?",
        content: "To use Badger, the collection must be Badger-compatible. It is recommended that all contract deployments be made through the official factory even when writing a custom solution."
    }, {
        title: "How does adopting Badger improve my organizations operations?",
        content: "With the use of Badger, operators no longer have hire developers, create custom solutions, or rebuild the wheel. Badger allows every organization and operator to access the power of onchain Badges and permissions with ease."
    }, {
        title: "Are Badges soulbound?",
        content: "That is up to you!"
    }, {
        title: "Can I use the Badges I have from another platform?",
        content: "Unfortunately Badger does not have the ability to wrap existing tokens or collections. However, migration from a platform is straightforward. If you would like personal help please join our Discord and a team member can help you migrate in seconds."
    }, {
        title: "Is there a place I can find documentation for the Badger app?",
        content: "Of course! You can find all documentation regarding the app and smart contract at: http://docs.trybadger.com -- If you have a question not answered here, reach out and a Badger team member will get you the answer."
    }, {
        title: "Are there any tutorials to guide me through?",
        content: "Yes there are! You can find all the tutorial videos in our [Docs on GitBook](https://docs.trybadger.com/help/usage-tutorials)."
    }, {
        title: "Can I make my own frontend that users interact with Badger?",
        content: "Absolutely you can! Badger was built with a primitive-first mindset meaning the use of the app is entirely optional and only offered as a form of assistance. All required pieces that allow Badger to function are handled at the contract level!"
    }, {
        title: "Can I charge someone for a Badge?",
        content: "Yes you can! Badges can be gated behind the successful payment of any ERC20, ERC1155, or ERC721. A new user can deposit the asset into the Organization contract and gain the ability to claim the Badge."
    }, {
        title: "Will the Badger site update even if I use another app to run a transaction?",
        content: "Yes it does! We are running an indexer that is constantly listening for Badger related transactions and updating our records accordingly. If any transactions are not facilitated through the Badger app, the indexer should still catch it within a couple minutes."
    }, {
        title: "Is Badger integrated with xyz?",
        content: "Badger uses standards for a reason and is immediately interoperable with all DAO tools out of the box."
    }, {
        title: "Do Badges appear on marketplaces?",
        content: "Yes! Badges are ERC-1155 compatible and every major marketplace will display your Badges."
    }]})

    return (
        <>
            <SEO title={title} description={description} />

            <div className="faq">
                <LandingHero className="slim">
                    <div className="container">
                        <h2>Have questions about how Badger is the onchain badging solution for you?</h2>
                    </div>
                </LandingHero>

                <div className="container">
                    <Accordion accordionKey="faqs" items={accordions} onClick={setAccordions} />
                </div>
            </div>
        </>
    )
}

export { FAQ }