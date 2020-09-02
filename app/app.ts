'use strict'

import * as dotenv from "dotenv"
import db from "./lib/db"
import Router from "./lib/Router"

dotenv.config();
db.init();

const router = new Router();
router.init();