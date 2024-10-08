import { subdivisions } from "../../../sample-data/subdivision.json";

export const resolvers = {
  Query: {
    subdivisions: (parent, { limit, offset }, args) => {
      // Filter subdivisions based on args
      const { name, subdivisionStatusCode, nearMapImageDate } = args;
      const data = subdivisions.filter((subdivision) => {
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
      const page = data.slice(offset, offset + limit);
      return {
        subdivisions: page,
        totalRecords: data.length,
      };
    },
  },
};
