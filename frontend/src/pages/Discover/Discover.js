import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionButton, ActionTitle, Header, Input, OrgTable } from "@components";

const { useUser } = require("@hooks");

const Discover = () => {
    const navigate = useNavigate();

    const { organizations } = useUser();

    const [search, setSearch] = useState("");

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className="dashboard">
                <div className="dashboard__content">
                    <div className="dashboardContent">
                        <Header back={() => navigate("/dashboard/")} />

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            alignItems: "center",
                        }}>
                            <h2>Discover Organizations</h2>

                            <p style={{ textAlign: "right" }}>{organizations && organizations.length} results</p>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto min-content",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Input
                                    placeholder="Search..."
                                    value={search}
                                    onChange={onSearchChange}
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    append={
                                        <button
                                            className="primary"
                                            onClick={() => navigate("/dashboard/organization/new/")}>
                                            <span><FontAwesomeIcon icon={['fal', 'search']} /></span>
                                        </button>
                                    } />
                            </div>

                            <div className="form__group input__group">
                                <ActionButton
                                    className="secondary"
                                    beforeText="All"
                                    icon={['fal', 'sort']}
                                    onClick={() => navigate("/dashboard/organization/new/")} />
                            </div>
                        </div>
                    </div>

                    {organizations && organizations.length > 0 && <OrgTable organizations={organizations} />}
                </div>
            </div >
        </>
    )
}

export { Discover }