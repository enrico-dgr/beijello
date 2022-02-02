import "./index.css";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routing />
		</BrowserRouter>
		<ToastContainer />
	</React.StrictMode>,
	document.getElementById("root")
);
