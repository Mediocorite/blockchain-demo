import React, { Ref } from "react";
// import { blockObject } from "../models/BlockObjectType";
import { Card, Input, Button, Form } from "antd";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import "../stylesheets/MineBlock.scss";

interface MineBlockComponentProps {
	generateNextBlock: (minedData: string) => void;
}

export const MineBlockComponent: React.FC<MineBlockComponentProps> = ({
	generateNextBlock,
}) => {
	const formRef: Ref<any> | undefined = React.createRef();
	const addBlock = (values: any) => {
		// console.log(values);
		generateNextBlock(values.minedData);
	};

	return (
		<Card hoverable className="minerblock">
			<Form name="basic" ref={formRef} onFinish={addBlock}>
				<Form.Item name="minedData">
					<Input addonBefore="DATA" prefix={<FileTextOutlined />} />
				</Form.Item>
				<Button
					className="addButton"
					type="primary"
					shape="round"
					icon={<PlusOutlined />}
					size="large"
					htmlType="submit"
				>
					ADD NEW BLOCK
				</Button>
			</Form>
		</Card>
	);
};
