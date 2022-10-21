import StatusIndicators from './StatusIndicators/StatusIndicators';

const HelpCopy = (path) => {
    const pathArray = path.split('/');
    let statuses;

    switch (true) {
        case path === "/dashboard" || path === "/dashboard/":
            statuses = [{
                name: "Ready to create Organization",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Getting Started</h5>
                        <p>
                            Click the Create your first Organization card to get started using Badger.
                        </p>
                    </div>

                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case pathArray[3] === 'new': // Create Org Form
            statuses = [{
                name: "Ready to create Organization",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Creating an Organization</h5>
                        <p>You are defining an Organization. An Organization is a grouping of Badges all living in the same Organization contract.</p>
                        <p>Fill out the Name, Description, and Image metadata fields and then click "Create" to deploy your Organization's contract.</p>
                        <p>Once the Organization has been created, you can begin to design Badges for your team.</p>

                        <h5>What is a Badge?</h5>
                        <p>Badges are represented by ERC1155 token ID #s and allow Organizations to easily interoperate with tools such as Guild.xyz.</p>
                    </div>

                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case pathArray[5] === 'new': // Create Badge Form
            statuses = [{
                name: "Ready to create Badge",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>What is a Badge?</h5>
                        <p>Badges are represented by ERC1155 tokens to designate the credentials and roles of Organization members on chain.</p>
                        <p>Using Badges, Organizations can easily interoperate with tools such as Guild.xyz.</p>

                        <h5>What is a Manager?</h5>
                        <p>Managers are users that have the permission to manage a Badge.</p>
                        <p>A Manager of a Badge is able to mint to members, revoke from members, and edit the metadata of a Badge.</p>

                        <h5>What is Account Bound?</h5>
                        <p>Account Bound means that Badges are not able to be transferred by members.</p>
                        <p>An Account Bound Badge can only be transferred from a member by the Organization owner or a Badge Manager.</p>
                        <p>Members with an Account Bound Badge do have the ability to forfeit their Badge, which burns it and removes it from their wallet.</p>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case !isNaN(parseInt(pathArray[5])): // Badge Detail
            statuses = [
                {
                    name: "Ready to Mint Badge",
                    status: "can"
                },
                {
                    name: "Ready to Revoke Badge",
                    status: "can"
                },
            ]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>What is a Badge?</h5>
                        <p>Badges are represented by ERC1155 tokens to designate the credentials and roles of Organization members on chain.</p>
                        <p>Using Badges, Organizations can easily interoperate with tools such as Guild.xyz.</p>

                        <h5>What is a Manager?</h5>
                        <p>Managers are users that have the permission to manage a Badge.</p>
                        <p>A Manager of a Badge is able to mint to members, revoke from members, and edit the metadata of a Badge.</p>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            )
        case pathArray[3] !== 'new': // Org Detail
            statuses = [{
                name: "",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5></h5>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            )
        default:
            return (
                <></>
            )
    }
}

export default HelpCopy;