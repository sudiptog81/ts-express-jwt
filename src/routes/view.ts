
import { Router, Request, Response } from "express";

const viewRouter: Router = Router();

viewRouter.get("/", (req: Request, res: Response): void => res.render("index", {
    year: new Date().getFullYear()
}));
viewRouter.get("/profile", (req: Request, res: Response): void => res.render("profile"));

export default viewRouter;