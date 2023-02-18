// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

// TODO: Need to add `badges` and `managerKeys` to the BadgerScout interface

contract BadgerHooks {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    address[] private _beforeMintingHooks;

    address[] private _beforeRevokingHooks;

    address[] private _beforeForfeitHooks;

    address[] private _beforeTransferHooks;

    ////////////////////////////////////////////////////////
    ///                 INTERNAL SETTERS                 ///
    ////////////////////////////////////////////////////////

    function _setHooks(address[] storage _hooks, address[] memory _newHooks)
        internal
    {
        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the new hooks and add them.
        for (i; i < _newHooks.length; i++) {
            // Add the new hook.
            _hooks.push(_newHooks[i]);
        }
    }

    function _setBeforeMintingHooks(address[] memory _newHooks) internal {
        _setHooks(_beforeMintingHooks, _newHooks);
    }

    function _setBeforeRevokingHooks(address[] memory _newHooks) internal {
        _setHooks(_beforeRevokingHooks, _newHooks);
    }

    function _setBeforeForfeitHooks(address[] memory _newHooks) internal {
        _setHooks(_beforeForfeitHooks, _newHooks);
    }

    function _setBeforeTransferHooks(address[] memory _newHooks) internal {
        _setHooks(_beforeTransferHooks, _newHooks);
    }

    function _beforeMintHook(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) internal {
        // Build the data to be passed to the hooks.
        bytes memory data = abi.encodeWithSignature(
            "beforeMintingHook(address,uint256,uint256,bytes)",
            _to,
            _id,
            _amount,
            _data
        );

        // Call the hooks.
        _hook(_beforeMintingHooks, data, "beforeMintingHook");
    }

    function _beforeRevokeHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeRevokeHook(address,uint256,uint256)",
            _from,
            _id,
            _amount
        );

        _hook(_beforeRevokingHooks, data, "beforeRevokeHook");
    }

    function _beforeForfeitHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeForfeitHook(address,uint256,uint256)",
            _from,
            _id,
            _amount
        );

        _hook(_beforeForfeitHooks, data, "beforeForfeitHook");
    }

    function _beforeTransferHook(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeTransferHook(address,address,address,uint256[],uint256[],bytes)",
            _operator,
            _from,
            _to,
            _ids,
            _amounts,
            _data
        );

        _hook(_beforeTransferHooks, data, "beforeTransferHook");
    }

    function _hook(
        address[] storage _hooks,
        bytes memory _data,
        bytes memory _key
    ) internal {
        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the hooks and call them.
        for (i; i < _hooks.length; i++) {
            // Make the low level call the hook using the supplied data.
            (bool success, ) = _hooks[i].call(_data);

            /// @dev If the hook fails, revert the transaction.
            require(
                success,
                string(
                    abi.encodePacked(
                        "BadgerHooks::",
                        _key,
                        ": Hook failed to allow execution."
                    )
                )
            );
        }
    }
}
