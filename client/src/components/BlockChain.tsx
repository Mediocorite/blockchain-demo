import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { BlockMiniComponent } from "./Block";
import { MineBlockComponent } from "./MineBlock";
import { Block } from "../logic/BlockType";
import crypto from "crypto";

interface bcProps {}
interface bcState {
	difficulty: number;
	bcArray: blockObject[];
}

export class BlockChainComponent extends React.Component<bcProps, bcState> {
	state: bcState = {
		bcArray: [Block.genesis],
		difficulty: 3,
	};

	// Function for generating valid hash
	isValidHashDifficulty = (hash: String) => {
		for (var i = 0; i < hash.length; i++) {
			if (hash[i] !== "0") {
				break;
			}
		}
		return i >= this.state.difficulty;
	};

	// New Hash Generator
	generateHash = (
		index: any,
		previoushash: any,
		timestamp: any,
		data: any,
		nonce: any
	) =>
		crypto
			.createHash("sha256")
			.update(index + previoushash + timestamp + data + nonce)
			.digest("hex");

	generateNextBlock = (minedData: string) => {
		console.log(minedData);
		const nextIndex: number =
			this.state.bcArray[this.state.bcArray.length - 1].index + 1;
		const previoushash: string = this.state.bcArray[
			this.state.bcArray.length - 1
		].hash;
		let timestamp: Date = new Date(new Date().getTime());
		let nonce: number = 0;
		let nextHash: string = this.generateHash(
			nextIndex,
			previoushash,
			timestamp,
			minedData,
			nonce
		);
		while (!this.isValidHashDifficulty(nextHash)) {
			nonce = nonce + 1;
			timestamp = new Date(new Date().getTime());
			nextHash = this.generateHash(
				nextIndex,
				previoushash,
				timestamp,
				minedData,
				nonce
			);
		}
		const newBlock = new Block(
			nextIndex,
			previoushash,
			timestamp,
			minedData,
			nextHash,
			nonce
		);
		let newBcArray = this.state.bcArray.concat(newBlock);
		this.setState({ bcArray: newBcArray });
	};

	errorCheck = (hash: string) => {
		if (this.isValidHashDifficulty(hash)) {
			return "green";
		} else {
			return "red";
		}
	};

	reCompileBlock = (changedIndex: number, changedData: string) => {
		const targetBlock = this.state.bcArray[changedIndex];
		// console.log(targetBlock);

		const newHashGenerated = this.generateHash(
			targetBlock.index,
			targetBlock.previoushash,
			targetBlock.timestamp,
			targetBlock.nonce,
			changedData
		);
		// console.log(newHashGenerated);

		const newBlockWithUpdatedHash = new Block(
			targetBlock.index,
			targetBlock.previoushash,
			targetBlock.timestamp,
			changedData,
			newHashGenerated,
			targetBlock.nonce
		);
		// console.log(newBlockWithUpdatedHash);

		const currArray = this.state.bcArray;
		currArray.splice(changedIndex, 1, newBlockWithUpdatedHash);
		console.log(currArray);

		this.setState({ bcArray: currArray });
	};

	onDataChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const targetListener =
			e.target.parentNode?.parentNode?.parentNode?.parentNode?.nextSibling
				?.nextSibling?.nextSibling?.firstChild?.firstChild?.textContent;
		// console.log(targetListener);
		let changedIndex: number;
		if (targetListener === `GENESIS BLOCK`) {
			changedIndex = 0;
		} else if (targetListener === undefined || targetListener === null) {
			return;
		} else {
			const eventArray = targetListener?.split("");
			changedIndex = parseInt(eventArray[eventArray?.length - 1]);
			// console.log(changedIndex);
			this.reCompileBlock(changedIndex, e.target.defaultValue);
		}
	};

	render() {
		return (
			<div>
				<BlockMiniComponent
					bcArray={this.state.bcArray}
					errorCheck={this.errorCheck}
					reCompileBlock={this.reCompileBlock}
					onDataChange={this.onDataChange}
				></BlockMiniComponent>
				<MineBlockComponent
					generateNextBlock={this.generateNextBlock.bind(this)}
				/>
			</div>
		);
	}
}
