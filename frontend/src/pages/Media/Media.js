import { LandingHero } from "@components"

import { logo } from "@static"

import "@style/pages/Media.css"

const Media = () => {
    const colors = [
        "#00FF94",
        "#00FFE0",
        "#000000",
        "#577088",
        "#F6FFFE",
        "#E1FEF9"
    ]

    return (
        <div className="media">
            <LandingHero className="slim">
                <div className="container">
                    <h2>Media Kit</h2>
                    <p>Here you can find all the assets you need to promote Badger.</p>
                </div>
            </LandingHero>

            <div className="container">
                <div className="granular">
                    <div>
                        <h2>Fonts</h2>

                        <div className="fonts">
                            <p className="seven">Gopher, 700 - rgba(0, 0, 0, 1.00)</p>
                            <p className="four">Gopher, 400 - rgba(0, 0, 0 , 0.65)</p>
                        </div>
                    </div>

                    <div>
                        <h2>Colors</h2>

                        <div className="colors">
                            {colors.map((color, index) => (
                                <div key={index} onClick={() => navigator.clipboard.writeText(color)}>
                                    <div key={index} className="color" style={{ backgroundColor: color }} />
                                    <p>{color}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="resources">
                    <div className="logo">
                        <h2>Logo</h2>

                        <div className="logos">
                            <img src={logo} />
                            <img src="/badger-logo-black.png" />
                        </div>
                    </div>

                    <div>
                        <h2>Images</h2>

                        <div className="images">
                            <img src="/opengraph.png" />
                            <img src="/empty-opengraph.png" />
                            <img src="/interoperable.png" />
                            <img src="/interoperable-simple.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Media }