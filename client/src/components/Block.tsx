import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { Card, Input, Tag } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import "../stylesheets/Block.scss";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
interface BlockMiniComponentProps {
	bcArray: blockObject[];
	generateHash: (
		index: any,
		previoushash: any,
		timestamp: any,
		data: any,
		nonce: any
	) => string;
	isValidHashDifficulty: (hash: String) => boolean;
}

export const BlockMiniComponent: React.FC<BlockMiniComponentProps> = ({
	bcArray,
	generateHash,
	isValidHashDifficulty,
}) => {
	const errorCheck = (hash: string) => {
		if (isValidHashDifficulty(hash)) {
			return "green";
		} else {
			return "red";
		}
	};

	// const onDataChange: React.ChangeEventHandler<HTMLInputElement> = (
	// 	blockObject: blockObject
	// ) => {
	// 	bcArray.splice(blockObject.index, 1, blockObject);
	// };

	const onDataChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const targetListener =
			e.target.parentNode?.parentNode?.parentNode?.parentNode?.nextSibling
				?.nextSibling?.nextSibling?.firstChild?.firstChild?.textContent;
		let changedIndex: number;
		if (targetListener === `GENESIS BLOCK`) {
			changedIndex = 0;
			console.log(changedIndex);
		} else if (targetListener === undefined || targetListener === null) {
			return;
		} else {
			const eventArray = targetListener?.split("");
			changedIndex = parseInt(eventArray[eventArray?.length - 1]);
			console.log(changedIndex);
		}
	};

	let renderBlockChain = bcArray.map((blockObject) => {
		return (
			<React.Fragment key={blockObject.index}>
				<Card hoverable className="container">
					<div style={{ marginBottom: 16 }}>
						<Input
							key={blockObject.index}
							addonBefore="DATA"
							defaultValue={blockObject.data}
							prefix={<FileTextOutlined />}
							onChange={onDataChange}
						/>
					</div>
					<div className="previoushash">
						<span className="label">PREVIOUS HASH</span>
						<Tag color="green" className="data">
							{blockObject.previoushash}
						</Tag>
					</div>
					<div className="hash">
						<span className="label">HASH</span>
						<Tag color={errorCheck(blockObject.hash)} className="data">
							{blockObject.hash}
						</Tag>
					</div>
					<div className="index">
						<div className="bottext">
							<span className="indextext">
								{blockObject.index === 0
									? `GENESIS BLOCK`
									: `BLOCK #` + blockObject.index}
							</span>{" "}
							on {blockObject.timestamp.toUTCString()}
						</div>
						<div className="nonce">
							<Tag color="default">{blockObject.nonce}</Tag>
						</div>
					</div>
				</Card>
				<DownOutlined className="downArrowSperator" />
			</React.Fragment>
		);
	});

	return <div>{renderBlockChain}</div>;
};
