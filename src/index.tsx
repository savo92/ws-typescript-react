// React must be imported in each tsx file
import * as React from "react";
import * as ReactDOM from "react-dom";

// eslint-disable-next-line import/no-unassigned-import
import "./index.scss";

import { App } from "./app";

// JSX syntax is fully supported
ReactDOM.render(<App />, document.getElementById("app"));
