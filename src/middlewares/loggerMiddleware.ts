import { Request, Response, NextFunction } from "express";

import { logger } from "../utils/winstonLogger";

const loggerMiddleware =(

    req: Request,
    res: Response,
    next: NextFunction
)=>{
    
const timestamp = new Date().toISOString();
    logger.info(`incoming request method is:"${req.method}", Endpoint is "${req.url}", timeStamp is ${timestamp}`, {
        method: req.method,
        url: req.url,
        query: req.query,
       
        ip: req.ip,
    });
   next()
}
export default loggerMiddleware