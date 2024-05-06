import { Request, Response } from "express";
import { cloudinaryInstance } from "../config/cloudinary";
import Course from "../models/courseModel";
import Instructor from "../models/instructorModel";

export const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.find();
  res.send(courses);
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    console.log("hitted");
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File not provided",
      });
    }
    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      const imageUrl = result?.url;
      const body = req.body;
      console.log(body, "body");

      const { title, description, price, instructorEmail } = body;

      const findInstructor = await Instructor.findOne({
        email: instructorEmail,
      });

      if (!findInstructor) {
        return res.send("please add instructor first");
      }

      const createCourse = new Course({
        title,
        description,
        price,
        instructor: findInstructor._id,
        image: imageUrl,
      });
      const newCourseCreated = await createCourse.save();
      if (!newCourseCreated) {
        return res.send("course is not created");
      }
      return res.send(newCourseCreated);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to create course");
  }
};
