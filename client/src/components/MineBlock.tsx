import React from "react";
import crypto from "crypto";
import { Card, Input, Button, Form } from "antd";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import "../stylesheets/MineBlock.scss";

interface MineBlockComponentProps {
	bclen: Number;
	latestBlock: blockObject;
	hashValidFn: (hash: String) => boolean;
}

interface blockObject {
	index: number;
	previoushash: string;
	timestamp: Date;
	data: string;
	hash: string;
	nonce: number;
}

class Block {
	index: Number;
	previousHash: String;
	timestamp: Date;
	data: String;
	hash: String;
	nonce: Number;
	constructor(
		index: Number,
		previousHash: String,
		timestamp: Date,
		data: String,
		hash: String,
		nonce: Number
	) {
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash;
		this.nonce = nonce;
	}
}

export const MineBlockComponent: React.FC<MineBlockComponentProps> = ({
	bclen,
	latestBlock,
	hashValidFn,
}) => {
	// New Hash Generator
	const generateHash = (
		index: Number,
		previousHash: string,
		timestamp: Date,
		data: String,
		nonce: Number
	) => {
		return crypto
			.createHash("sha256")
			.update(index + previousHash + timestamp + data + nonce)
			.digest("hex");
	};

	const generateNextBlock = (minedData: String) => {
		const nextIndex = latestBlock.index + 1;
		const previousHash = latestBlock.hash;
		let timestamp: Date = new Date(new Date().getTime());
		let nonce = 0;
		let nextHash = generateHash(
			nextIndex,
			previousHash,
			timestamp,
			minedData,
			nonce
		);
		while (!hashValidFn(nextHash)) {
			nonce = nonce + 1;
			timestamp = new Date(new Date().getTime());
			nextHash = generateHash(
				nextIndex,
				previousHash,
				timestamp,
				minedData,
				nonce
			);
		}
	};

	const addBlock = () => {};

	return (
		<Card hoverable className="minerblock">
			<Form>
				<div style={{ marginBottom: 16 }}>
					<Input addonBefore="DATA" prefix={<FileTextOutlined />} />
				</div>
				<Button
					className="addButton"
					type="primary"
					shape="round"
					icon={<PlusOutlined />}
					size="large"
					onClick={addBlock}
				>
					ADD NEW BLOCK
				</Button>
			</Form>
		</Card>
	);
};
