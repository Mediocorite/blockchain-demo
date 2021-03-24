import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { Card, Input, Tag } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import "../stylesheets/Block.scss";
interface BlockMiniComponentProps {
	bcArray: blockObject[];
	errorCheck: (hash: string) => "green" | "red";
	reCompileBlock: (changedIndex: number, changedData: string) => void;
	onDataChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const BlockMiniComponent: React.FC<BlockMiniComponentProps> = ({
	bcArray,
	errorCheck,
	reCompileBlock,
	onDataChange,
}) => {
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
