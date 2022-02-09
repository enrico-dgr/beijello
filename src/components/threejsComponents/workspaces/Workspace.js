import React, { useEffect, useRef, useState } from "react";

import { Box3 } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Mesh } from "three";
import PropTypes from "prop-types";
import Roboto from "../../../assets/fonts/RobotoPro_Regular.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const Workspace = (props) => {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef();
	const textRef = useRef(new Mesh());
	// Hold state for hovered and clicked events
	const [down, setDown] = useState(false);
	const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	useEffect(() => {
		document.addEventListener("mouseup", onPointerUp);
		document.addEventListener("mousemove", onPointerMove);

		let v = new Vector3();
		let boundingBox = new Box3().setFromObject(textRef.current);
		v = boundingBox.getCenter(v);
		v.addScaledVector({ x: 0, y: 1, z: 0 }, -v.y);
		textRef.current.position.sub(v);

		return () => {
			document.removeEventListener("mouseup", onPointerUp);
			document.removeEventListener("mousemove", onPointerMove);
		};
	}, []);
	// Subscribe this component to the render-loop
	useFrame((state, delta) => {
		if (down) {
			setLastCoords(coords);
			ref.current.rotation.x += coords.y - lastCoords.y;
			ref.current.rotation.y += coords.x - lastCoords.x;
		}
	});

	const font = new FontLoader().parse(Roboto);

	const onPointerDown = (e) => {
		setLastCoords(coords);
		setDown(true);
	};

	const onPointerUp = (e) => {
		setCoords({ x: e.clientX * 0.01, y: e.clientY * 0.01 });
		setDown(false);
	};

	const onPointerMove = (e) => {
		setCoords({ x: e.clientX * 0.01, y: e.clientY * 0.01 });
	};

	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			rotation={[0.3, -0.2, 0]}
			onPointerDown={onPointerDown}
		>
			<boxGeometry args={style.container.boxGeometryArgs} />
			<meshStandardMaterial
				color={style.container.color}
				opacity={style.container.opacity}
				transparent={true}
			/>
			<mesh position={[0, 0.13, 0]}>
				<boxGeometry args={style.header.boxGeometryArgs} />
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
	);
};

const style = {
	container: {
		boxGeometryArgs: [4, 0.15, 3],
		color: "black",
		opacity: 0.4,
	},
	header: {
		boxGeometryArgs: [3, 0.1, 2],
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
