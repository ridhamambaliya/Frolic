import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      unique: true
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    coordinator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    maxTeams: {
      type: Number,
      required: true,
      min: [2, "At least one team is required"],
    },

    participationType: {
      type: String,
      required: true,
      enum: {
        values: ["Individual", "Team"],
        message: "Participation type must be Individual or Team",
      },
    },
    minPlayersInTeam:{
        type: Number,
        min: 2,
        validate: {
        validator: function (value) {
          if (this.participationType === "Team") {
            return value != null;
          }
          return value == null;
        },
        message:
          "minPlayersInTeam is required only for Team events",
      },
    },
    maxPlayersInTeam: {
      type: Number,
      min: 2,
      validate: {
        validator: function (value) {
          if (this.participationType === "Team") {
            return (
              value != null &&
              this.minPlayersInTeam != null &&
              value >= this.minPlayersInTeam
            );
          }
          return value == null;
        },
        message:
          "maxPlayersInTeam must be >= minPlayersInTeam and only for Team events",
      },
    },

    registrationFees: {
      type: Number,
      required: true,
      min: [0, "Fees cannot be negative"],
    },

    registrationDeadline: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value < this.date;
        },
        message:
          "Registration deadline must be before event date",
      },
    },

    eventDescription: {
      type: String,
      trim: true,
    },

    rulesAndRegulation: {
      type: String,
      trim: true,
    },

    firstPrize: {
      type: Number,
      min: 0,
    },

    secondPrize: {
      type: Number,
      min: 0,
    },

    thirdPrize: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

eventSchema.index({ date: 1 });
eventSchema.index({ coordinator: 1 });
// eventSchema.virtual("eventStatus").get(function () {
//   const now = new Date();

//   if (this.date > now) return "Upcoming";
//   if (this.date <= now) return "Ongoing";

//   return "Completed";
// });

const Event = mongoose.model("Event", eventSchema);

export default Event;
