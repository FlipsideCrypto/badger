import { useState } from "react";
import { Link } from "react-router-dom";

import { useStory } from "@hooks";

import {
    ArrowLink,
    Accordion,
    Metrics,
    StoryPreview,
    LandingHero,
    SEO
} from "@components";

import delegatePermissions from "../../static/images/delegate-permissions.gif"
import distributeBadges from "../../static/images/distribute-badges.gif"
import launchOrganizations from "../../static/images/launch-organizations.gif"
import onchainPermissions from "../../static/images/onchain-permissions.gif"
import privateKeys from "../../static/images/private-keys.gif"
import whatMatters from "../../static/images/what-matters.gif"

import "@style/pages/Landing.css";

const title = "The No-Code Badge Solution for Web3 Organizations | Badger";
const description = "Badger is the no-code solution that unlocks the power of onchain badges for everyone. Deploy and manage flexible group policies for your team's decentralized tool stack.";

const Landing = () => {
    const { story: talentdao } = useStory("talentdao");
    const { story: mdao } = useStory("mdao");

    const [accordions, setAccordions] = useState({
        process: [{
            selected: true,
            img: launchOrganizations,
            icon: ['fal', 'sitemap'],
            title: 'Launch Organizations',
            content: 'Get past the ground-zero phase and launch your onchain organization with badges in just a few clicks.'
        },
        {
            img: distributeBadges,
            icon: ['fal', 'chart-network'],
            title: 'Distribute Badges',
            content: 'Mint badges and distribute them to your members in a matter of seconds with the help of automated and bulk ERC-1155 minting tools.'
        },
        {
            img: delegatePermissions,
            icon: ['fal', 'user-check'],
            title: 'Delegate Permissions',
            content: 'Delegate permissions to your team members, friends, family and more so that you can focus on the big picture while maintaining security and control of your organization.'
        }],
        benefits: [{
            selected: true,
            img: privateKeys,
            icon: ['fal', 'lock'],
            title: 'Stop Sharing Private Keys',
            content: 'Forget the days of being worried about a wallet key being leaked. Create nested permissions using AND/OR logic with Badges and unlock the power of an onchain network.'
        }, {
            img: onchainPermissions,
            icon: ['fal', 'handshake'],
            title: 'Securely Grant Onchain Access',
            content: 'Keep unwanted guests out while keeping your protocol and Organization nimble. With Badges, permissions can be managed onchain, offchain and even respond to the state of a protocol.'
        }, {
            img: whatMatters,
            icon: ['fal', 'bolt'],
            title: 'Focus on What Matters Most',
            content: 'Stop struggling to manage private keys, multi-sigs, assigning permission in 10 places. Mint permissions with Badger and save yourself the time so that you have time to devote the more important things.'
        }]
    })

    return (
        <>
            <SEO title={title} description={description} />

            <div className="landing">
                <LandingHero className="slim">
                    <div className="container">
                        <h1>The no-code solution unlocking the power of onchain Badges.</h1>
                        <p>Experience the power of onchain Badges and permissions in seconds with the help of an extremely simple interface.</p>

                        <Link to="/dashboard/">
                            <button className="primary">
                                <span>Mint badges now</span>
                            </button>
                        </Link>
                    </div>
                </LandingHero>

                <div className="container">
                    <Metrics />
                </div>

                <div className="container section">
                    <h2>Badger is a protocol streamlining onchain access policies with Badges - <span className="blue">no coding needed.</span></h2>

                    <div className="context">
                        <div className="color">
                            <div className="blobs">
                                <div className="blob" />
                                <div className="blob" />
                                <div className="blob" />
                                <div className="blob" />
                            </div>
                        </div>

                        <div className="content">
                            {accordions.process
                                .filter(item => item.selected)
                                .map(item => <img key={item.img} src={item.img} width={"100%"} height={"auto"} />)}
                        </div>
                    </div>

                    <div className="content">
                        <p>The Badger Dashboard lets you deploy an Organization, define rules, and mint badges just by clicking a few buttons; no smart contract experience required.</p>

                        <Link className="cta" to="/dashboard/">Get started - it's free</Link>

                        <Accordion accordionKey="process" items={accordions} onClick={setAccordions} />
                    </div>
                </div>

                <StoryPreview story={talentdao} className="left" />

                <div className="container section left">
                    <h2>Optimized to secure the next decade of onchain protocols and builders.</h2>

                    <div className="content">
                        <p>Step into the 21st century of the blockchain with access permissions and experience a world of secure, simple-to-manage and decentralized access management.</p>

                        <Link className="cta" to="/dashboard/">Issue Badges now</Link>

                        <Accordion accordionKey="benefits" items={accordions} onClick={setAccordions} />
                    </div>

                    <div className="context">
                        <div className="color">
                            <div className="blobs">
                                <div className="blob" />
                                <div className="blob" />
                            </div>
                        </div>

                        <div className="content">
                            {accordions.benefits
                                .filter(item => item.selected)
                                .map(item => <img key={item.img} src={item.img} width={"100%"} height={"auto"} />)}
                        </div>
                    </div>
                </div>

                <StoryPreview story={mdao} />

                <div className="help">
                    <div className="blobs">
                        <div className="blob" />
                        <div className="blob" />
                        <div className="blob" />
                        <div className="blob" />
                    </div>

                    <div className="container">
                        <div className="title">
                            <h2>We're here to help you get started.</h2>
                            <p>Unlock the power of onchain Badges and permissions with Badger and harness the power your network today.</p>
                        </div>

                        <div className="card learn">
                            <h3>Learn</h3>
                            <p>View tutorials and documentations to understand more about how Badger empowers you.</p>

                            <ArrowLink href="https://docs.trybadger.com/help/integration-tutorials/guild">Use Badges with Guild to control Discord</ArrowLink>
                            <ArrowLink href="https://docs.trybadger.com/help/integration-tutorials/snapshot">Empower operating pods with Snapshot votes</ArrowLink>
                            <ArrowLink href="https://docs.trybadger.com/help/integration-tutorials/jokedao">Run an onchain contest for Badge holders on JokeDAO</ArrowLink>
                            <ArrowLink href="https://docs.trybadger.com/help/integration-tutorials/opensea">Personalize your collection on OpenSea</ArrowLink>
                        </div>

                        <div className="card explore">
                            <h3>Explore</h3>
                            <p>Connect with other Badger operators and developers to help you build your network.</p>
                            <ArrowLink href="https://docs.trybadger.com/what-is-badger">Documentation</ArrowLink>
                            <ArrowLink href="https://docs.trybadger.com/advanced/smart-contracts">Developers</ArrowLink>
                            <ArrowLink href="https://twitter.com/trybadger">Community</ArrowLink>
                            <ArrowLink to="/stories/">Customer stories</ArrowLink>
                        </div>

                        <div className="card expert">
                            <h3><ArrowLink>Hire an Expert</ArrowLink></h3>
                            <p>Don't have the time or team to build a solution? We can solve your problem and save you the headache.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Landing };