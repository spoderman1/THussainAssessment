import { gql } from "apollo-server";

export const typeDefs = gql`
  type subdivisions {
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

  type Query {
    subdivisions(
      name: String
      subdivisionStatusCode: String
      nearMapImageDate: String
    ): [subdivisions]
  }
`;
