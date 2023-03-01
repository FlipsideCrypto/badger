import { Link } from "react-router-dom";

import { useStory } from "@hooks";

import { ArrowLink, Accordion, Metrics, StoryPreview, LandingHero, SEO } from "@components";

import "@style/pages/Landing.css";

const title = "The No-Code Badge Solution for Web3 Organizations | Badger";
const description = "Badger is the no-code solution that unlocks the power of onchain badges for everyone. Deploy and manage flexible group policies for your team's decentralized tool stack.";

const Landing = () => {
    const { story: talentdao } = useStory("talentdao");
    const { story: mdao } = useStory("mdao");

    return (
        <>
            <SEO title={title} description={description} />

            <div className="landing">
                <LandingHero className="slim">
                    <div className="container">
                        <h1>The no-code solution unlocking the power of onchain Badges.</h1>
                        <p>Unlock the power faster by creating your Organization and Badges in seconds with the help of an extremely simple interface.</p>

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
                    <h2>Badger is a decentralized solution streamlining onchain access policies with Badges - <span className="blue">no coding needed.</span></h2>

                    <div className="context">
                        <div className="blobs">
                            <div className="blob" />
                            <div className="blob" />
                        </div>
                    </div>

                    <div className="content">
                        <p>The Badger Dashboard lets you deploy an Organization, define rules, and mint badges just by clicking a few buttons; no smart contract experience required.</p>

                        <Link className="cta" to="/dashboard/">Get started - it's free</Link>

                        <Accordion start={1} items={[{
                            icon: ['fal', 'sitemap'],
                            title: 'Launch Organizations',
                            content: 'Get past the ground-zero phase and launch your onchain organization with badges in just a few clicks.'
                        },
                        {
                            icon: ['fal', 'chart-network'],
                            title: 'Distribute Badges',
                            content: 'Mint badges and distribute them to your members in a matter of seconds with the help of automated and bulk ERC-1155 minting tools.'
                        },
                        {
                            icon: ['fal', 'user-check'],
                            title: 'Delegate Permissions',
                            content: 'Delegate permissions to your team members, friends, family and more so that you can focus on the big picture while maintaining security and control of your organization.'
                        }]} />
                    </div>
                </div>

                <StoryPreview story={talentdao} className="left" />

                <div className="container section left">
                    <h2>Optimized to secure the next decade of on-chain protocols and builders.</h2>

                    <div className="content">
                        <p>Badger powers a world of better onchain operations by streamlining the way permissions are managed and accessed.</p>

                        <Link className="cta" to="/dashboard/">Create your Badges now</Link>

                        <Accordion start={0} items={[{
                            icon: ['fal', 'bolt'],
                            title: 'Power Complex Permissions',
                            content: 'With unopinionated Badges you can create organizations with nested permissions and even smart contract AND/OR access gates.'
                        }, {
                            icon: ['fal', 'lock'],
                            title: 'Secure onchain Activity',
                            content: 'The simple access control system of Badges lets you define rules for your team and mint badges that can be used to secure any onchain activity.'
                        }, {
                            icon: ['fal', 'tasks'],
                            title: 'Optimize Permission Management',
                            content: 'Forget the days of struggling to manage private keys and multi-sigs. With Badger organizations can unlock a world of more effective onchain operations.'
                        }]} />
                    </div>

                    <div className="context">
                        <div className="blobs">
                            <div className="blob" />
                            <div className="blob" />
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
                            <p>Bring your Organization onchain with Badger and harness the power your network.</p>
                        </div>

                        <div className="card learn">
                            <h3>Learn</h3>
                            <p>View tutorials and documentations to understand more about how Badger empowers you.</p>

                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/help/integration-tutorials/guild">Use Badges with Guild to control Discord</ArrowLink>
                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/help/integration-tutorials/snapshot">Empower operating pods with Snapshot votes</ArrowLink>
                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/help/integration-tutorials/jokedao">Run an onchain contest for Badge holders on JokeDAO</ArrowLink>
                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/help/integration-tutorials/opensea">Monetize the future of your organization with Badges</ArrowLink>
                        </div>

                        <div className="card explore">
                            <h3>Explore</h3>
                            <p>Connect with other Badger operators and developers to help you build your network.</p>
                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/what-is-badger">Documentation</ArrowLink>
                            <ArrowLink href="https://flipside-crypto.gitbook.io/badger/advanced/smart-contracts/badger.sol">Developers</ArrowLink>
                            <ArrowLink href="https://discord.com/invite/TASvMj4vyk">Community</ArrowLink>
                            <ArrowLink to="/stories/">Customer stories</ArrowLink>
                        </div>

                        <div className="card expert">
                            <h3><ArrowLink>Hire an Expert</ArrowLink></h3>
                            <p>The Badger Dashboard lets you deploy an Organization and build any use of dreams you can imagine.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Landing };