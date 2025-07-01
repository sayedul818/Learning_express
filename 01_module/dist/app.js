"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const filePath = path_1.default.join(__dirname, "../db/index.json");
app.use(express_1.default.json());
const todosRouter = express_1.default.Router();
app.use("/items", todosRouter);
// get all items from index.json db
app.get('/items/list', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
// create a new item
app.post('/items/createitem', (req, res) => {
    const data = req.body;
    // console.log(data);
    const allitems = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    const parseItems = JSON.parse(allitems);
    parseItems.push(data);
    console.log(parseItems);
    fs_1.default.writeFileSync(filePath, JSON.stringify(parseItems, null, 2), { encoding: "utf-8" });
    res.send("succesfully new item created");
});
// getSingleItem
app.get('/items/item/:name/:department', (req, res) => {
    console.log("from query", req.query);
    console.log("from params", req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
// using todosrouter to get item
todosRouter.get("/list", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json({
        message: "from todos router",
        data
    });
});
exports.default = app;
