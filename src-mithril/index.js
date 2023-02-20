import { routes } from "./config/routes";
import { setup as settingSetup } from "./config/settings";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.scss";
routes.setup();
settingSetup();
