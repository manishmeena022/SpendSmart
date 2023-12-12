import mongoose,{Schema} from "mongoose"

const userSchema = new Schema(
    {
        fullname : {
            type: String,
            required: true,
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        hasCreatedAccount: {
            type: Boolean,
            default: false,
        },
        accounts: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Account",
            },
        ],
    },{
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

export const User = mongoose.model("User", userSchema);