import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";
import client from "../apollo/Apollo";

// use effect calls api on first load to get initial data (pagination get first set of results only)
// then have a use effect to call api again when the filter changes
// cnsider memoizing the api call to prevent multiple calls when the filter changes

const GET_SUBDIVISIONS = gql`
  query Subdivisions(
    $name: String
    $subdivisionStatusCode: String
    $nearMapImageDate: String
  ) {
    subdivisions {
      id
      code
      name
      longitude
      latitude
      fieldSurveyTerritoryId
      marketId
      subdivisionStatusId
      surveyMethodId
      activeSections
      futureSections
      builtOutSections
      totalLots
      fieldSurveyTerritoryName
      marketName
      marketAbbreviation
      subdivisionStatusCode
      surveyMethodCode
      county
      community
      zoom17Date
      zoom18Date
      subdivisionGeometryId
      subdivisionGeometryBoundingBoxId
      subdivisionGeometryBoundaryId
      subdivisionGeometryIntelligenceBoundaryId
      subdivisionGeometryIntelligenceBoundaryStatusId
      subdivisionGeometryIntelligenceBoundaryStatusCode
      subdivisionGeometryIntelligenceBoundaryStatusChangeDate
      nearMapImageDate
      imageBoxId
      mostRecentIPointBatchDate
      iPoints
      validatediPoints
      subdivisionSpecificStatus
    }
  }
`;

export const SubdivisionDisplay = () => {
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [loadingState, setLoadState] = React.useState("loading");

  useEffect(() => {
    // Fetch data from GraphQL server using client.query
    const fetchSubdivisions = async () => {
      try {
        setLoadState("loading");
        const { data } = await client.query({
          query: GET_SUBDIVISIONS,
          variables: { name: "Alexander Park" }, // Optional variable for filtering by name
        });
        console.log({ data });
        setData(data.subdivisions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubdivisions();
  }, []);

  const rowsPerPage = 20;

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        page > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={page}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="code">code</TableColumn>
        <TableColumn key="name">name</TableColumn>
        <TableColumn key="longitude">longitude</TableColumn>
        <TableColumn key="latitude">latitude</TableColumn>
        <TableColumn key="activeSections">activeSections</TableColumn>
        <TableColumn key="county">county</TableColumn>
        <TableColumn key="surveyMethodCode">surveyMethodCode</TableColumn>
        <TableColumn key="community">community</TableColumn>
        <TableColumn key="nearMapImageDate">nearMapImageDate</TableColumn>
        <TableColumn key="subdivisionSpecificStatus">
          subdivisionSpecificStatus
        </TableColumn>
      </TableHeader>
      <TableBody
        items={data ?? []}
        loadingContent={<Spinner />}
        //loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
