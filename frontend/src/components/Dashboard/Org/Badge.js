import { useParams } from "react-router-dom";

import Header from "../Header/Header";

const Badge = () => {
    const { organization, id } = useParams();

    const actions = [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        link: `/dashboard/badge/manage/${organization}&${id}`
    }]

    return (
        <div id="badge">
            <Header back={-1} actions={actions} />
            <h1>Badge</h1>
            <h2>{organization}</h2>
            <h2>{id}</h2>
        </div>
    )
}

export default Badge