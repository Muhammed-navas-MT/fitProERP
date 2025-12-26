import mongoose from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { Schema } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";


export const gymAdminSchema = new mongoose.Schema({
    gymName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Roles), required: true },
    subdomain: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    tagline: { type: String, required: true },
    businessLicense: { type: String, required: true },
    insuranceCertificate: { type: String, required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Subscription", default:"" },
    paymentStatus: { type: String,enum:Object.values(PaymentStatus), default: PaymentStatus.PENDING },
    packageStart: { type: Date },
    packageEnd: { type: Date },
    logo: { type: String, required: true },
    status: { type: String, enum:Object.values(Status), default: Status.PENDING },
    branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
  },
  {timestamps:true}
)