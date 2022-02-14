import React, { useEffect, useRef } from "react";

import { Box3 } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import GyroscopeXY from "../controlledMotions/GyroscopeXY";
import { Mesh } from "three";
import Roboto from "../../../assets/fonts/RobotoPro_Regular.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Vector3 } from "three";

const Workspace = (props) => {
	const ref = useRef();
	const textRef = useRef(new Mesh());

	const font = new FontLoader().parse(Roboto);

	useEffect(() => {
		let v = new Vector3();
		let boundingBox = new Box3().setFromObject(textRef.current);
		v = boundingBox.getCenter(v);
		v.addScaledVector({ x: 0, y: 1, z: 0 }, -v.y);
		textRef.current.position.sub(v);
	}, []);

	return (
		<GyroscopeXY>
			<mesh {...props} ref={ref} rotation={[1.2, 0, 0]}>
				<boxGeometry args={style.container.boxGeometryArgs} />
				<meshStandardMaterial
					color={style.container.color}
					opacity={style.container.opacity}
					transparent={true}
				/>
				<mesh position={[0, 0.13, 0]}>
					<boxGeometry
						args={style.header.boxGeometryArgs}
					/>
					<meshStandardMaterial
						color={style.container.color}
						opacity={style.header.opacity}
						transparent={true}
					/>
					<mesh
						ref={textRef}
						geometry={
							new TextGeometry("3Dello", {
								font,
								size: 0.2,
								height: 0.1,
							})
						}
						position={style.header.text.position}
						rotation={style.header.text.rotation}
					>
						<meshStandardMaterial color={"white"} />
					</mesh>
				</mesh>
			</mesh>
		</GyroscopeXY>
	);
};

const style = {
	container: {
		boxGeometryArgs: [4, 0.15, 2.4],
		color: "black",
		opacity: 0.4,
	},
	header: {
		boxGeometryArgs: [3, 0.1, 1.7],
		opacity: 0.5,
		text: {
			position: [0, 0, 0],
			rotation: [-1.5708, 0, 0],
		},
	},
};

Workspace.defaultProps = {};

Workspace.propTypes = {};

export default Workspace;
