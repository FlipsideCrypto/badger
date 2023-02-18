// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface BadgerHook {
    function beforeMintingHook(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;

    function beforeRevokeHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external;

    function beforeForfeitHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external;

    function beforeTransferHook(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external;

    function afterTransferHook(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external;
}

// TODO: Need to add `badges` and `managerKeys` to the BadgerScout interface

contract BadgerHooks {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The hook contracts being used for minting.
    BadgerHook[] private _beforeMintingHooks;

    BadgerHook[] private _beforeRevokingHooks;

    BadgerHook[] private _beforeForfeitHooks;

    BadgerHook[] private _beforeTransferHooks;

    BadgerHook[] private _afterTransferHooks;

    // function _beforeMintHook(
    //     address _to,
    //     uint256 _id,
    //     uint256 _amount,
    //     bytes memory _data
    // ) internal {
    //     /// @dev Load the stack.
    //     uint256 i;

    //     /// @dev Loop through the hooks and call them.
    //     for (i = 0; i < _beforeMintingHooks.length; i++) {
    //         _beforeMintingHooks[i].beforeMintingHook(_to, _id, _amount, _data);
    //     }
    // }

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
        BadgerHook[] storage _hooks,
        bytes memory _data,
        bytes memory _key
    ) internal {
        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the hooks and call them.
        for (i; i < _hooks.length; i++) {
            // Make the low level call the hook using the supplied data.
            (bool success, ) = address(_hooks[i]).call(_data);
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
