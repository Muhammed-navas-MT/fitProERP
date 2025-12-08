import { Schema } from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";

export const trainerSchema = new Schema(
    {
        gymId: {
            type: Schema.Types.ObjectId,
            ref: "GymAdmin",
            required: true,
            index: true
        },
        branchId: {
            type: Schema.Types.ObjectId,
            ref: "Branch"
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        role: { 
            type: String,
            enum: Object.values(Roles),
            required: true 
        },
        specialization: {
            type: [String],
            required: true,
            default: []
        },
        experience: {
            type: Number,
            required: true,
            min: 0
        },
        baseSalary: {
            type: Number,
            min: 0
        },
        commisionRate: {
            type: Number,
            min: 0,
        },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.IN_ACTIVE
        },
        dutyTime: {
            startTime: {
                type: String,
            },
            endTime: {
                type: String,
            }
        },
    },
    {
        timestamps: true,
    }
);