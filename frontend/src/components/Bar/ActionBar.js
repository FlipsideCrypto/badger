import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useENSProfile, useNavigateAddress, useUser } from '@hooks';

import { ActionButton, ConnectButton, LogoutButton, OrgView, ProfileView } from '@components';

import { sliceAddress } from '@utils';

import '@rainbow-me/rainbowkit/styles.css';
import '@style/Bar/ActionBar.css';

const ActionBar = () => {
    const navigate = useNavigateAddress();

    const orgRegex = /\/dashboard\/organization\/(\w+)\/(\w+)/;

    const { pathname } = useLocation();

    const chainId = orgRegex.test(pathname) && orgRegex.exec(pathname)[1];

    const orgAddress = orgRegex.test(pathname) && orgRegex.exec(pathname)[2];

    const { address, isConnected, isLoaded, organization } = useUser({
        chainId,
        orgAddress,
    });

    const { ensAvatar, ensName } = useENSProfile(address);

    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setCollapsed(true);
    }, [pathname]);

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!isConnected && <ConnectButton />}

                {isConnected && (!orgAddress || (orgAddress && !organization)) && (
                    <ProfileView ensAvatar={ensAvatar} ensName={ensName} address={sliceAddress(address)} />
                )}

                {isConnected && isLoaded && orgAddress && <OrgView organization={organization} />}
            </div>

            <div className="action_bar__toggle">
                <ActionButton
                    className="tertiary"
                    icon={['fal', 'bars']}
                    afterText="Menu"
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>

            <div className={`action_bar__actions ${collapsed ? 'collapsed' : ''}`}>
                <div className="actions">
                    <ActionButton
                        className="tertiary"
                        icon={['fal', 'globe']}
                        afterText="Discover"
                        onClick={() => {
                            navigate('/discover/');
                        }}
                    />

                    {isConnected && address && <LogoutButton />}
                </div>
            </div>
        </div>
    );
};

export { ActionBar };
