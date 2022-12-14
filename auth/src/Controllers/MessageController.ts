import { Request, Response } from "express";
import { Updatelastmsg } from "../Models/ChatModel";
import { createMessage, GetMessagesByChatId } from "../Models/MessageModel";


export const addMessage = async(req:Request,res:Response)=>{
    const response =await createMessage(req.body.chatId,req.body.senderId,req.body.text)
    if(response)
    {
     const result = await Updatelastmsg(response)
     if(result) return res.status(200).send(response)
    }
    res.sendStatus(500)
}

export const getMessage  = async (req:Request,res:Response) =>{
    const response = await  GetMessagesByChatId (req.params.chatId)
    if(response)return res.status(200).send(response)
    res.sendStatus(500)
}
