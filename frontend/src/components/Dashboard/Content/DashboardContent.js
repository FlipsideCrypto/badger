const DashboardContent = ({ children }) => {
    return (
        <div className="dashboard__content" style={{
            marginInline: "20px"
        }}>
            <div style={{
                height: "min-content",
                width: "100%",
                border: "2px solid #ccc",
                borderRadius: "10px",
                marginBottom: "20px"
            }}>
                <div style={{
                    padding: "20px",
                    borderRadius: "10px 10px 0 0",
                    textAlign: "center",
                }}>
                    <h3 style={{ color: "red" }}><strong>As of November 1, 2023, Flipside Crypto no longer hosts the Badger application for the Badger protocol.</strong></h3>
                    <p>IPFS hosting of the badge images and metadata will be deprecated shortly thereafter.</p>
                    <p>The code for the application and protocol are open source and may be utilized according to respective software licenses.</p>
                    <p>
                        <a href="https://github.com/FlipsideCrypto/badger"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#404040" }}
                        >
                            Badger App & Protocol Repository Github
                        </a>
                    </p>
                    <p>
                        <a href="https://polygonscan.com/address/0x218b3c623ffb9c5e4dbb9142e6ca6f6559f1c2d6"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#404040" }}
                        >
                            V1 Factory Deployment on Polygonscan
                        </a>
                    </p>
                    <p>
                        <a href="https://docs.trybadger.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#404040" }}
                        >
                            Documentation
                        </a>
                    </p>
                </div>
            </div>
            {children}
        </div>
    )
}

export default DashboardContent;