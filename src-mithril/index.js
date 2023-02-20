import { routes } from "./config/routes";
import { setup as settingSetup } from "./config/settings";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/construct-ui/lib/index.css";

import "./index.scss";
routes.setup();
settingSetup();
