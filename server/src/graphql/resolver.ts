import { subdivisions } from "../../../sample-data/subdivision.json";

export const resolvers = {
  Query: {
    subdivisions: (parent, args) => {
      // Filter subdivisions based on args
      const { name, subdivisionStatusCode, nearMapImageDate } = args;
      return subdivisions.filter((subdivision) => {
        let match = true;
        if (name && subdivision.name !== name) match = false;
        if (
          subdivisionStatusCode &&
          subdivision.subdivisionStatusCode !== subdivisionStatusCode
        )
          match = false;
        if (
          nearMapImageDate &&
          subdivision.nearMapImageDate !== nearMapImageDate
        )
          match = false;
        return match;
      });
    },
  },
};
