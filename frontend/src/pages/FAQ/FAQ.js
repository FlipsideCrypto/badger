import { LandingHero, Footer, Accordion } from "@components";

import "@style/pages/FAQ.css";

const FAQ = () => { 
    const faqs = [{
        title: "What problem of mine does Badger solve?",
        content: "For so long, the ability to deploy and manage an on-chain organization has been limited to developers and highly-technical individuals. Badger lowers the barrier and empowers every individual with the ability to issue, manage and revoke on-chain permissions in seconds for free.",
    }, { 
        title: "Who is Badger for?",
        content: "Badger was specifically designed for normal people like you. Avoiding the land of complexity, Badger is focused on bringing the power of on-chain organization management to every person while removing the mountainous technical and investment barrier.",  
    }, { 
        title: "What can I use a Badge for?",
        content: "Once you have deployed Badges with Badger, your team can integrate with the leading solutions in Web3 management. Take a look at our [integration docs](https://flipside-crypto.gitbook.io/badger/help/integration-tutorials) to learn more.",
    }, { 
        title: "How do I get started?",
        content: "All you have to do is connect your wallet and you can instantly deploy an Organization and the Badges for free + gas.",
    }, { 
        title: "How does Badger work?",
        content: "Badger is a EVM-Based smart contract factory that deploys new instances of Organizations and Badges for personal use and management."
    }, { 
        title: "Is there anything I need to do or pay for?",
        content: "At this time, all Badger use is free and comes at no additional charge to the cost of gas."
    }, { 
        title: "What blockchains are supported?",
        content: "Currently only Polygon is supported. Badger goes where it is needed. Need the protocol running on another chain? Let us know."
    }, { 
        title: "Why should I choose Badger instead of one of the other great options?",
        content: "Badger is designed to be the simplest and most future-looking solution for every operator. Without the need of writing custom-coded solutions, every organization and operator can get to action in seconds."
    }, { 
        title: "What other options are there besides Badger?",
        content: "Namely, you can choose from Otterspace which is heavily focused on consensual minting due to their tokens being true-soulbound, Rep3 who is focused on tracking individual contributions such as work, and Sismo leading with a privacy-driven approach."
    }, { 
        title: "What is the hardest part of using Badger?",
        content: "Like any DAO, the hardest part of using Badger is finding people for your Organization and designing a structure. Badger can help you bring your organization design on-chain and enable you to access tools available to networked organizations."  
    }, { 
        title: "What type of tokens are the minted Badges?",
        content: "Badger is built using ERC-1155 tokens designed to serve as credential badges."
    }, { 
        title: "How does adopting Badger improve my organizations operations?",
        content: "With the use of Badger, operators no longer have hire developers, create custom solutions, or rebuild the wheel. Badger allows every organization and operator to adopt the wisdom of those before them and immediately get to action."
    }, { 
        title: "Can I use Badger to power my idea?",
        content: "Totally! If you have any questions about how to do so, join the Discord and one of our team members can answer every question you have."
    }, { 
        title: "What permission levels are available in Badger organizations?",
        content: "Within a Badger organization there is an Owner with admin control, Badge managers that have the ability to mint, manage and revoke specific Badges and your end-users that are holding the Badges."
    }, { 
        title: "Are Badges soulbound?",
        content: "Badger Badges may or may not be Account Bound. Account Bound tokens cannot be sold or transfered to other users. Regardless of whether or not a Badge is Account Bound, a holder may always forfeit their Badge."
    }, { 
        title: "Can I use the Badges I have from another platform?",
        content: "Unfortunately Badger does not have the ability to wrap existing tokens or collections. However, migration from a platform is straightforward. If you would like personal help please join our Discord and a team member can help you migrate in seconds."
    }, { 
        title: "Is there a way I can get a custom built solution?",
        content: "Yes! The Badger team does support custom integration requests. If you are in need and don't want to hire a full development team, reach out to get all your needs taken care of!"
    }, { 
        title: "Is there a place I can find documentation for the Badger app?",
        content: "Of course! You can find all documentation regarding the app and smart contract at: http://docs.trybadger.com -- If you have a question not answered here, reach out and a Badger team member will get you the answer."
    }, { 
        title: "Are there any tutorials to guide me through?",
        content: "Yes there are! You can find all the tutorial videos in our [Docs on GitBook](https://flipside-crypto.gitbook.io/badger/help/usage-tutorials)."
    }, { 
        title: "Has the smart contract been audited?",
        content: "The Badger smart contract is in the process of being audited by QuantStamp. Until audits and all changes needed have been completed, the contracts will remain unverified however you can find all the open source code on our [GitHub](http://github.com/flipsidecrypto/badger)."
    }, { 
        title: "Can I make my own frontend that users interact with Badger through?",
        content: "Absolutely you can! Badger was built with a primitive-first mindset meaning the use of the app is entirely optional and only offered as a form of assistance. All required pieces that allow Badger to function are handled at the contract level!"
    }, { 
        title: "Can I make an interface for users to claim their Badge?",
        content: "You can! Just wrap the contract with a front-end that calls claimMint() as outlined in the documentation and you will be up and running!"
    }, { 
        title: "Are there any official Badger packages that make frontend integration easier?",
        content: "Right now the Badger team is focused on proving the MVP and integrations packages have been made public. If this is something that interests you, please let us know as it helps contribute to that proof!",
    }, { 
        title: "Am I allowed to fork Badger and make changes?",
        content: "Go for it! Badger lives under the Apache-2.0 license and all use under those guidelines is allowed. If you do want to fork it and make changes, please do reach out first as there may be an update that accomplishes what you want; or even may be something that the team chooses the prioritize."
    }, { 
        title: "Can I run an API that implements my own minting requirements?/What is a 'Signer'?",
        content: "Badger has implemented `signer` functionality that enables precisely this! All you have to do is provide the address that is used to sign the signatures. With that, a user will be able to mint the token anytime your API provides a valid signature and meets the rest of the established minting requirements."
    }, { 
        title: "How does 'Claimable' work?",
        content: "The Claimable option on a Badge enables more customization of how your members can receive their Badge. A pure Claimable Badge will allow anyone to mint it at will, and using Claimable with a Payment Token can require a user to pay before minting the Badge."
    }, { 
        title: "Can I charge someone for a Badge?",
        content: "Yes you can! Badges can be gated behind the successful payment of any ERC20, ERC1155, or ERC721. A new user can deposit the asset into the Organization contract and gain the ability to claim the Badge."
    }, { 
        title: "What if I need even more custom functionality?",
        content: "Join our Discord and tell us what customization you need! We are always prioritizing development to support our users."
    }, { 
        title: "Will the Badger site update even if I use another app to run a transaction?",
        content: "Yes it does! We are running an indexer that is constantly listening for Badger related transactions and updating our records accordingly. If any transactions are not facilitated through the Badger app, the indexer should still catch it within a couple minutes."
    }, { 
        title: "I received an error message, how do I fix it?",
        content: "Note down your error message and post it in the Discord. If you still have the page pulled up, right click on it and hit inspect element. The browser dev tools should show up on the right side of your screen, and you want to find the 'Console' tab. Providing us with these messages in the console will make it easier to fix your problem!"
    }, { 
        title: "Is Badger integrated with xyz?",
        content: "Badger uses standards for a reason and is immediately interoperable with all DAO tools out of the box."
    }, { 
        title: "Do Badges appear on marketplaces?",
        content: "Yes! Badges are built as ERC-1155s which means every major marketplace will display your Organization and Badges. This includes Opensea, Blur, etc."
    }]

    return (
        <div className="faq">
            <LandingHero className="slim">
                <div className="container">
                    <h2>Have questions about how Badger is the on-chain badging solution for you?</h2>
                </div>
            </LandingHero>

            <div className="container">
                <Accordion items={faqs} />
            </div>

            {/* <div className="container">
                <div className="faq">
                    {faqs.map((faq, i) => (
                        <div className="faq-item" key={i}>
                            <h3>{faq.q}</h3>
                            <p>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export { FAQ }