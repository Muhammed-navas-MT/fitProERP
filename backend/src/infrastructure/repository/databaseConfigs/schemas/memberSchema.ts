import { Schema } from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { Gender } from "../../../../domain/enums/gender";

export const memberSchema = new Schema(
    {
        gymId: {
            type: Schema.Types.ObjectId,
            ref: "GymAdmin",
            required: true,
        },
        branchId: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
        },
        trainerId: {
            type: Schema.Types.ObjectId,
            ref: "Trainer",
            required: true,
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
        profileImg: {
            type: String,
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(Roles),
            required: true,
            default: Roles.MEMBER
        },
        emergencyNumber: {
            type: String,
            required: true,
            trim: true
        },
        healthDetails: {
            gender: {
                type: String,
                enum: Object.values(Gender),
                required: true,
            },
            dateOfBirth: {
                type: Date,
                required: true
            },
            weight: {
                value: {
                    type: Number,
                    required: true,
                    min: 0
                },
                unit: {
                    type: String,
                    required: true,
                    enum: ["kg", "lbs"],
                    default: "kg"
                }
            },
            height: {
                value: {
                    type: Number,
                    required: true,
                    min: 0
                },
                unit: {
                    type: String,
                    required: true,
                    enum: ["cm", "ft"],
                    default: "cm"
                }
            },
            targetWeight: {
                value: {
                    type: Number,
                    required: true,
                    min: 0
                },
                unit: {
                    type: String,
                    default: "kg"
                }
            },
            medicalConditions: {
                type: String,
                default: ""
            },
            allergies: {
                type: String,
                default: ""
            },
            fitnessGoal: {
                type: String,
                required: true
            }
        },
        package: {
            planId: {
                type: Schema.Types.ObjectId,
                ref: "Plan",
            },
            startDate: {
                type: Date,
            },
            endDate: {
                type: Date,
            },
            price: {
                type: Number,
                min: 0
            },
            status: {
                type: String,
               enum: Object.values(PaymentStatus),
                default: PaymentStatus.PENDING
            }
        },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.PENDING
        }
    },
    {
        timestamps: true,
    }
);