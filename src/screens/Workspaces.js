import { Canvas } from "@react-three/fiber";
import React from "react";
import Workspace from "../components/threejsComponents/workspaces/Workspace";

const Workspaces = () => (
	<Canvas
		style={{
			...style,
		}}
	>
		<ambientLight />
		<pointLight position={[10, 10, 10]} />
		<Workspace position={[0, 0, 0]} />
	</Canvas>
);

const style = { height: "100vh", width: "100vw" };

export default Workspaces;
