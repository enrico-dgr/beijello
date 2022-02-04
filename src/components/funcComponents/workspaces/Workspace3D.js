import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

const Workspace3D = (props) => {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef();
	// Hold state for hovered and clicked events
	const [down, setDown] = useState(false);
	const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	useEffect(() => {
		document.addEventListener("mouseup", onPointerUp);
		document.addEventListener("mousemove", onPointerMove);

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
			<boxGeometry args={[4, 0.25, 3]} />
			<meshStandardMaterial color={props.colorTable} />
			<Leg
				position={[1.75, -1.125, 1.25]}
				color={props.colorTable}
			/>
			<Leg
				position={[1.75, -1.125, -1.25]}
				color={props.colorTable}
			/>
			<Leg
				position={[-1.75, -1.125, 1.25]}
				color={props.colorTable}
			/>
			<Leg
				position={[-1.75, -1.125, -1.25]}
				color={props.colorTable}
			/>
		</mesh>
	);
};

const Leg = ({ color, position }) => (
	<mesh position={position}>
		<boxGeometry args={[0.2, 2, 0.2]} />
		<meshStandardMaterial color={color} />
	</mesh>
);

Workspace3D.defaultProps = {
	colorTable: 0x995e22,
};

Workspace3D.propTypes = {
	colorTable: PropTypes.number,
};

export default Workspace3D;
