import mongoose from 'mongoose';

const DailyRouteStatSchema = new mongoose.Schema(
  {
    date: {
      type: Date, // truncated to day (00:00:00)
      required: true,
      index: true,
      unique: true,
    },
    paths: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    weirdPaths: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

const DailyRouteStat = mongoose.model('DailyRouteStat', DailyRouteStatSchema);

export default DailyRouteStat;
