import { Route, Routes } from "react-router-dom";

import { Navbar, Footer } from "@components";

import { Landing, FAQ, Stories, Story } from "@pages";

import "@style/pages/Page.css"

const Page = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/faq/" element={<FAQ />} />
                <Route path="/stories/" element={<Stories />} />
                <Route path="/stories/:slug/" element={<Story />} />
                <Route exact path="/" element={<Landing />} />
            </Routes>

            <Footer />
        </>
    )
}

export { Page }