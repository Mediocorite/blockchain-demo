import React from "react";
import { BlockMiniComponent } from "./Block";
import { SampleBlockchain } from "../shared/sampleBlockChain";
import { MineBlockComponent } from "./MineBlock";
interface BlockChainComponentProps {}

export const BlockChainComponent: React.FC<BlockChainComponentProps> = () => {
	// Declaring some universals
	const difficulty = 3; // difficulty for generating hash
	const bclen = SampleBlockchain.length; // BlockChain Length
	const latestBlock = SampleBlockchain[bclen - 1];
	// Function for generating valid hash
	const isValidHashDifficulty = (hash: String) => {
		for (var i = 0; i < hash.length; i++) {
			if (hash[i] !== "0") {
				break;
			}
		}
		return i >= difficulty;
	};
	const blockChainArray = SampleBlockchain.map((blockObject) => {
		return (
			<React.Fragment>
				<BlockMiniComponent
					blockData={blockObject}
					hashValidFn={isValidHashDifficulty}
				></BlockMiniComponent>
			</React.Fragment>
		);
	});
	return (
		<div>
			{blockChainArray}
			<MineBlockComponent
				bclen={bclen}
				latestBlock={latestBlock}
				hashValidFn={isValidHashDifficulty}
			/>
		</div>
	);
};
