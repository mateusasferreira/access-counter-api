import { NextFunction, Request, Response } from 'express'

function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	const statusCode =
    err instanceof Error
    	? res.statusCode === 200
    		? 400
    		: res.statusCode
    	: res.statusCode 
    		? res.statusCode
    		: 500

	res.status(statusCode).json({ error: err.message })
}
export default errorHandler
