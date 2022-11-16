import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ActionButton from "@components/Button/ActionButton";
import Header from "@components/Dashboard/Header/Header";
// import OrgStats from "@components/Dashboard/Org/OrgStats";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import "@style/Dashboard/Org/OrgProfile.css";

const OrgProfile = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { orgData, setOrgData } = useContext(OrgContext);
    
    const navigate = useNavigate();
    const { orgId } = useParams();

    const headerActions = [
        {
            text: "Settings",
            icon: ['fal', 'fa-gear'],
            event: () => navigate(`/dashboard/organization/${orgId}/edit`)
        }
    ]

    return (
        <>
            <Header back={() => navigate("/dashboard")} actions={headerActions} />

            {/* <OrgStats orgData={orgData} /> */}

            <div className="header div__header">
                <h2 className="dashboard__margin__left">
                    Organization Badges
                </h2>
                <div className="header__actions">
                    <ActionButton 
                        icon={['fal', 'plus']}
                        afterText="Create badge"
                        onClick={() => navigate(`/dashboard/organization/${orgId}/badge/new`)}
                    />
                </div>
            </div>

            {/* Badge Table */}

            {/* <div className="header">
                <h2>Organization Assets</h2>
                <div className="header__actions div__actions">
                    <ActionButton
                        icon={['fal', 'fa-money-bill-transfer']}
                        afterText="Deposit"
                        onClick={() => console.log('not set up yet')}
                        style={{ marginRight: '10px' }}
                    />

                    <ActionButton
                        icon={['fal', 'fa-money-simple-from-bracket']}
                        afterText="Withdraw"
                        onClick={() => console.log('not set up yet')}
                    />
                </div>
            </div> */}
            { /* Asset Table */}
        </>
    )
}

export default OrgProfile;