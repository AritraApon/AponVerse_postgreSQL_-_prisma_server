import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
export declare const toggle: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getReactions: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=reaction.controller.d.ts.map