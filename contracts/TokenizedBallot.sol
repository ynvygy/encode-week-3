// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IMyVotingToken {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    IMyVotingToken public tokenContract;
    Proposal[] public proposals;
    uint256 public targetBlockNumber;
    mapping(address => uint256) public votingPowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 blocksQuantity
    ) {
        tokenContract = IMyVotingToken(_tokenContract);
        targetBlockNumber = block.number + blocksQuantity;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint proposal, uint256 amount) external {
        require(
            proposal < proposals.length,
            "TokenizedBallot: invalid proposal"
        );

        require(
            votingPower(msg.sender) >= amount,
            "You have insufficient voting power"
        );
        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function votingPower(address account) public view returns (uint256) {
        return
            tokenContract.getPastVotes(account, targetBlockNumber) -
            votingPowerSpent[account];
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

    function listProposal() external view returns (bytes32[] memory) {
        bytes32[] memory proposalNames = new bytes32[](proposals.length);
        for (uint i = 0; i < proposals.length; i++) {
            proposalNames[i] = proposals[i].name;
        }
        return proposalNames;
    }
}
