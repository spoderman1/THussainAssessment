import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { SubdivisionInterface } from "../models/subdivision";
dotenv.config();

const FILE_PATH =
  process.env.SAMPLE_DATA || "../../../sample_data/subdivision.json";

const readSubDivisionsFromFile = () => {
  try {
    const data = readFileSync(FILE_PATH, "utf8");
    if (!data) {
      console.log("No data found in file");
      return [];
    }
    const subdivisions = JSON.parse(data);
    return subdivisions.subdivisions;
  } catch (error) {
    console.log("error occurred in readSubDivisionsFromFile()");
    console.log(error);
    return [];
  }
};

export const test = (req: Request, res: Response): void => {
  try {
    res.json({ message: "test" });
    return;
  } catch (error) {
    console.log("error occurred in test()");
    res.json({ message: "error occurred in test()" });
    return;
  }
};

export const getAllSubdivisions = (req: Request, res: Response): void => {
  try {
    const subDivisions: SubdivisionInterface[] = readSubDivisionsFromFile();
    const index = subDivisions.findIndex(
      (element) => element.name === "Alexander Park"
    );
    console.log(index);
    res.json(subDivisions[index]);
    return;
  } catch (error) {
    console.log("error occurred in getSubdivision()");
    console.log(error);
    res.json({ message: "error occurred in getSubdivision()" });
    return;
  }
};

export const getFilteredSubdivisions = (req: Request, res: Response): void => {
  try {
    const {} = req.query;
  } catch {
    console.log("error occurred in getFilteredSubdivisions()");
    res.json({ message: "error occurred in getFilteredSubdivisions()" });
    return;
  }
};
