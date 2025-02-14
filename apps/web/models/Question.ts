// models/Question.ts
import mongoose, { Document, Model, Schema } from "mongoose";

// Define the nested interfaces
export interface IFile {
  name: string;
  language: "javascript" | "css" | "html";
  content: string;
}

export interface IQuestionerInfo {
  name: string;
  profilePic: string;
  additionalInfo?: string;
}

export interface IQuestionDetails {
  name: string;
  questionaerInfo: IQuestionerInfo;
  techStack: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  time: number;
  questionDescription: string;
  requirements: string[];
  notes: string[];
  companies: string[];
  questionType: "ui" | "logical";
}

// Main document interface
export interface IQuestion extends Document {
  initialVanillaFiles: IFile[];
  initialReactFiles: IFile[];
  solutionVanillaFiles: IFile[];
  solutionReactFiles: IFile[];
  questionDetails: IQuestionDetails;
}

// Define the schemas
const FileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  language: {
    type: String,
    enum: ["javascript", "css", "html"],
    required: true,
  },
  content: { type: String, required: true },
});

const QuestionerInfoSchema = new Schema<IQuestionerInfo>({
  name: { type: String, required: true },
  profilePic: { type: String, required: true },
  additionalInfo: { type: String },
});

const QuestionSchema = new Schema<IQuestion>({
  initialVanillaFiles: [FileSchema],
  initialReactFiles: [FileSchema],
  solutionVanillaFiles: [FileSchema],
  solutionReactFiles: [FileSchema],
  questionDetails: {
    name: { type: String, required: true },
    questionaerInfo: { type: QuestionerInfoSchema, required: true },
    techStack: {
      type: [String],
      enum: ["html", "css", "js", "react"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    time: { type: Number, required: true },
    questionDescription: { type: String, required: true },
    requirements: [String],
    notes: [String],
    companies: {
      type: [String],
      enum: ["Google", "Facebook", "Twitter", "Apple", "Microsoft"],
    },
    questionType: {
      type: String,
      enum: ["ui", "logical"],
      required: true,
    },
  },
});

// Use type assertion for model to avoid issues with existing models
const modelName = "Question";
const QuestionModel: Model<IQuestion> =
  (mongoose.models[modelName] as Model<IQuestion>) ||
  mongoose.model<IQuestion>(modelName, QuestionSchema);

export default QuestionModel;
