import { Request, Response } from "express";
import PostModel, { viewAll,fethPostsByUser,DeletePost as PostDelete } from "../Models/postRepository";
import { addLike as like  } from "../Models/postRepository";
export const createPost = async (req: Request, res: Response) => {
  console.log(req.body, "ldkd");
  const { caption, image } = req.body;
  const { id } = req.body.user;
  const Post = new PostModel({
    caption,
    image,
    userid: id,
  })
    .save()
    .then((data) => {
      res.status(201).send({ success: true, data: data });
    });
};
export const fetchAll = async (req: Request, res: Response) => {
  const response = await viewAll(req.body.user.id);
  console.log(response)
  res.status(200).send(response);
};


export const addLike =async (req:Request,res:Response) => {
  console.log(req.body);
  const { id } = req.body.user;
  const {postid} = req.body
const response =  await like(postid,id)
console.log(response,"res");
res.status(200).send("success")
}
export const UserPosts =async (req:Request,res:Response) => {
  const response = await fethPostsByUser(req.body.user.id)  
  res.status(200).send(response)
}

export const DeletePost = async (req:Request,res:Response) =>{
  try {
   await PostDelete(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(402)
  }
}
