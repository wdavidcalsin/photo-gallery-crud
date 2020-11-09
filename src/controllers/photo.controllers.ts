import { Request, Response } from "express";
import path from "path";
import fs, { promises } from "fs-extra";

import Photo from "../models/photo";

export async function getPhotos(
   req: Request,
   res: Response
): Promise<Response> {
   const photos = await Photo.find();
   console.log(photos);

   return res.json({
      message: "geting Photo",
      photos,
   });
}

export async function getPhoto(req: Request, res: Response) {
   const photo = await Photo.findById(req.params.id);
   console.log(photo);

   return res.json({
      photo,
   });
}

export async function createPhoto(req: Request, res: Response) {
   console.log("Saving photo");
   const { title, description } = req.body;
   const newPhoto = {
      title: title,
      description: description,
      imagePath: req.file.path,
   };
   const photo = new Photo(newPhoto);
   await photo.save();

   return res.json({
      message: "Photo succesfully saved",
      photo,
   });
}

export async function deletePhoto(req: Request, res: Response) {
   const photo = await Photo.findByIdAndDelete(req.params.id);

   if (photo) {
      await fs.unlink(path.resolve(photo.imagePath));
   }

   return res.json({
      message: "Photo delete succesfull",
      photo,
   });
}

export async function updatePhoto(
   req: Request,
   res: Response
): Promise<Response> {
   const { title, description } = req.body;
   const photo = await Photo.findByIdAndUpdate(
      req.params.id,
      {
         title,
         description,
      },
      { new: true }
   );

   return res.json({
      message: "Succesfully update",
      photo,
   });
}
