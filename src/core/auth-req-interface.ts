import { Request } from "express"
export interface AuthRequest extends Request {
  authorization: string // or any other type
}