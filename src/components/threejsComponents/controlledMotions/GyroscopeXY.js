import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

const GyroscopeXY = (props) => {
	const ref = useRef();

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

	useFrame(() => {
		if (down) {
			setLastCoords(coords);
			ref.current.rotation.x += (coords.y - lastCoords.y) * 0.008;
			ref.current.rotation.y += (coords.x - lastCoords.x) * 0.008;
		}
	});

	const onPointerDown = () => {
		setLastCoords(coords);
		setDown(true);
	};

	const onPointerUp = (e) => {
		setCoords({ x: e.clientX, y: e.clientY });
		setDown(false);
	};

	const onPointerMove = (e) => {
		setCoords({ x: e.clientX, y: e.clientY });
	};

	return (
		<mesh ref={ref} onPointerDown={onPointerDown}>
			{props.children}
		</mesh>
	);
};

GyroscopeXY.defaultProps = {};

GyroscopeXY.propTypes = { children: PropTypes.node };

export default GyroscopeXY;
