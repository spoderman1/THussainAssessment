export interface SubdivisionInterface {
  id: number;
  code: string;
  name: string;
  longitude: number;
  latitude: number;
  fieldSurveyTerritoryId: number;
  marketId: number;
  subdivisionStatusId: number;
  surveyMethodId: number;
  activeSections: number;
  futureSections: number;
  builtOutSections: number;
  totalLots: number;
  fieldSurveyTerritoryName: string;
  marketName: string;
  marketAbbreviation: string;
  subdivisionStatusCode: string;
  surveyMethodCode: string;
  county: string;
  community: string | null;
  zoom17Date: string; // ISO Date string
  zoom18Date: string; // ISO Date string
  subdivisionGeometryId: number | null;
  subdivisionGeometryBoundingBoxId: number | null;
  subdivisionGeometryBoundaryId: number | null;
  subdivisionGeometryIntelligenceBoundaryId: number;
  subdivisionGeometryIntelligenceBoundaryStatusId: number;
  subdivisionGeometryIntelligenceBoundaryStatusCode: string;
  subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string; // ISO Date string
  nearMapImageDate: string; // ISO Date string
  imageBoxId: number;
  mostRecentIPointBatchDate: string; // ISO Date string
  iPoints: any | null;
  validatediPoints: any | null;
  subdivisionSpecificStatus: string;
}

export interface SubdivisionObjectInterface {
  subdivisions: SubdivisionInterface[];
}
