// React must be imported in each tsx file
import * as React from "react";
import * as ReactDOM from "react-dom";

// tslint:disable-next-line no-import-side-effect
import "./index.scss";

import { App } from "./App";

// JSX syntax is fully supported
ReactDOM.render(<App />, document.getElementById("app"));
