import { useConnect } from 'wagmi';
import { useEffect } from 'react';

const AUTOCONNECTED_CONNECTOR_IDS = ['safe'];

function useAutoConnect() {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    let inSafe = false;

    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const connectorInstance = connectors.find((c) => c.id === connector && c.ready);

      if (connectorInstance) {
        inSafe = true;
        connect({ connector: connectorInstance });
      }
    });
  }, [connect, connectors]);
}

export { useAutoConnect };