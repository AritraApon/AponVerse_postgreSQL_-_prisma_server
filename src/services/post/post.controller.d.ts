import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
export declare const create: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAll: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSingle: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const update: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const remove: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMine: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=post.controller.d.ts.map