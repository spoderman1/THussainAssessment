const { ApolloServer } = require("@apollo/server");
const resolvers = require("../src/graphql/resolver");

const typeDefs = gql`
  type Subdivision {
    id: Int
    code: String
    name: String
    longitude: Float
    latitude: Float
    fieldSurveyTerritoryId: Int
    marketId: Int
    subdivisionStatusId: Int
    surveyMethodId: Int
    activeSections: Int
    futureSections: Int
    builtOutSections: Int
    totalLots: Int
    fieldSurveyTerritoryName: String
    marketName: String
    marketAbbreviation: String
    subdivisionStatusCode: String
    surveyMethodCode: String
    county: String
    community: String
    zoom17Date: String # ISO Date string
    zoom18Date: String # ISO Date string
    subdivisionGeometryId: Int
    subdivisionGeometryBoundingBoxId: Int
    subdivisionGeometryBoundaryId: Int
    subdivisionGeometryIntelligenceBoundaryId: Int
    subdivisionGeometryIntelligenceBoundaryStatusId: Int
    subdivisionGeometryIntelligenceBoundaryStatusCode: String
    subdivisionGeometryIntelligenceBoundaryStatusChangeDate: String # ISO Date string
    nearMapImageDate: String # ISO Date string
    imageBoxId: Int
    mostRecentIPointBatchDate: String # ISO Date string
    iPoints: String
    validatediPoints: String
    subdivisionSpecificStatus: String
  }

  type SubdivisionInfo {
    subdivisions: [Subdivision]
    totalRecords: Int
  }

  type Query {
    subdivisions(
      name: String
      subdivisionStatusCode: String
      nearMapImageDate: String
      limit: Int
      offset: Int
    ): SubdivisionInfo
  }
`;

describe("subdivisions resolver", () => {
  let server;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it("should return filtered subdivisions based on the given arguments", async () => {
    const limit = 10;
    const offset = 1;
    const name = "Alexander Park"; // Replace with an actual name in your sample data
    const subdivisionStatusCode = "Active"; // Replace with an actual status code
    const nearMapImageDate = null; // Replace with an actual date if relevant

    const { data } = await server.executeOperation({
      query: `
        query GetSubdivisions($limit: Int, $offset: Int, $name: String, $subdivisionStatusCode: String, $nearMapImageDate: String) {
          subdivisions(limit: $limit, offset: $offset, name: $name, subdivisionStatusCode: $subdivisionStatusCode, nearMapImageDate: $nearMapImageDate) {
            subdivisions {
              name
              subdivisionStatusCode
              nearMapImageDate
            }
            totalRecords
          }
        }
      `,
      variables: {
        limit,
        offset,
        name,
        subdivisionStatusCode,
        nearMapImageDate,
      },
    });

    // Validate the response
    expect(data.subdivisions.subdivisions).toHaveLength(1); // Adjust based on expected results
    expect(data.subdivisions.totalRecords).toBe(1); // Adjust based on expected results
  });
});
