import React from "react";
import { blockObject } from "../models/BlockObjectType";
import { Card, Input, Button, Form } from "antd";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import "../stylesheets/MineBlock.scss";

interface MineBlockComponentProps {
	generateNextBlock: (minedData: string) => blockObject;
}

export const MineBlockComponent: React.FC<MineBlockComponentProps> = ({
	generateNextBlock,
}) => {
	const addBlock = (values: any) => generateNextBlock(values.minedData);

	return (
		<Card hoverable className="minerblock">
			<Form name="basic">
				<Form.Item name="minedData">
					<div style={{ marginBottom: 16 }}>
						<Input addonBefore="DATA" prefix={<FileTextOutlined />} />
					</div>
				</Form.Item>
				<Button
					className="addButton"
					type="primary"
					shape="round"
					icon={<PlusOutlined />}
					size="large"
					htmlType="submit"
					onClick={addBlock}
				>
					ADD NEW BLOCK
				</Button>
			</Form>
		</Card>
	);
};
