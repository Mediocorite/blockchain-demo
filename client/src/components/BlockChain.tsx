import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { BlockMiniComponent } from "./Block";
import { MineBlockComponent } from "./MineBlock";
import crypto from "crypto";

interface bcProps {}
interface bcState {
	difficulty: number;
	bcArray: blockObject[];
}

class Block {
	index: number;
	previoushash: string;
	timestamp: Date;
	data: string;
	hash: string;
	nonce: number;
	constructor(
		index: number,
		previoushash: string,
		timestamp: Date,
		data: string,
		hash: string,
		nonce: number
	) {
		this.index = index;
		this.previoushash = previoushash;
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash;
		this.nonce = nonce;
	}
	static get genesis() {
		return new Block(
			0,
			"0",
			new Date(1508270000000),
			"Welcome to Blockchain Demo 2.0!",
			"000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
			604
		);
	}
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

	render() {
		return (
			<div>
				<BlockMiniComponent
					bcArray={this.state.bcArray}
					generateHash={this.generateHash}
					isValidHashDifficulty={this.isValidHashDifficulty}
				></BlockMiniComponent>
				<MineBlockComponent
					generateNextBlock={this.generateNextBlock.bind(this)}
				/>
			</div>
		);
	}
}
