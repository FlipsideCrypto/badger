import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";
import HolderTable from "../../Table/HolderTable";

// TODO: Table -- happy to do this but passing on it for now as it'll take me a while tbh
const Badge = () => {
    const { organization, id } = useParams();
    let navigate = useNavigate();

    const actions = [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        link: `/dashboard/badge/manage/${organization}&${id}`
    }]

    const badge = {
        name: "Curator",
        holders: [
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7278",
                receivedAt: "2022-01-01",
                nickname: "Mason",
                pod: "Operations",
                delegate: true
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7279",
                receivedAt: "2022-01-01",
                nickname: "Mason",
                pod: "Operations",
                delegate: false
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7270",
                receivedAt: "2022-01-01",
                nickname: "Mason",
                pod: "Operations",
                delegate: false
            },
        ]
    }

    return (
        <div id="badge">
            <Header back={-1} actions={actions} />

            <h1>{badge.name}</h1>

            <button 
                className="button-unstyled" 
                onClick={() => { navigate(`/dashboard/badge/analytics/${organization}&${id}`)}}
            >
                <FontAwesomeIcon icon={["fal", "fa-chart-simple"]} />
                <span>Analytics</span>
            </button>

            <HolderTable holders={badge.holders} />

        </div>
    )
}

export default Badge