import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { Card, Input, Tag } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import "../stylesheets/Block.scss";
interface BlockMiniComponentProps {
	blockData: blockObject;
	hashValidFn: (hash: String) => boolean;
}

export const BlockMiniComponent: React.FC<BlockMiniComponentProps> = (
	props
) => {
	return (
		<React.Fragment>
			<Card hoverable className="container">
				<div style={{ marginBottom: 16 }}>
					<Input
						addonBefore="DATA"
						defaultValue={props.blockData.data}
						prefix={<FileTextOutlined />}
						// onChange=''
					/>
				</div>
				<div className="previoushash">
					<span className="label">PREVIOUS HASH</span>
					<Tag color="green" className="data">
						{props.blockData.previoushash}
					</Tag>
				</div>
				<div className="hash">
					<span className="label">HASH</span>
					<Tag color="green" className="data">
						{props.blockData.hash}
					</Tag>
				</div>
				<div className="index">
					<div className="bottext">
						<span className="indextext">
							{props.blockData.index === 0
								? `GENESIS BLOCK`
								: `BLOCK #` + props.blockData.index}
						</span>{" "}
						on {props.blockData.timestamp.toUTCString()}
					</div>
					<div className="nonce">
						<Tag color="default">{props.blockData.nonce}</Tag>
					</div>
				</div>
			</Card>
			<DownOutlined className="downArrowSperator" />
		</React.Fragment>
	);
};
