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
  query SubdivisionInfo(
    $name: String
    $subdivisionStatusCode: String
    $nearMapImageDate: String
    $limit: Int
    $offset: Int
  ) {
    subdivisions(
      name: $name
      subdivisionStatusCode: $subdivisionStatusCode
      nearMapImageDate: $nearMapImageDate
      limit: $limit
      offset: $offset
    ) {
      subdivisions {
        id
        code
        name
        longitude
        latitude
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
        subdivisionGeometryIntelligenceBoundaryStatusCode
        subdivisionGeometryIntelligenceBoundaryStatusChangeDate
        nearMapImageDate
        mostRecentIPointBatchDate
        iPoints
        validatediPoints
        subdivisionSpecificStatus
      }
      totalRecords
    }
  }
`;

export const SubdivisionDisplay = () => {
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [loadingState, setLoadState] = React.useState("loading");

  const limit = 10;

  useEffect(() => {
    // Fetch data from GraphQL server using client.query
    const fetchSubdivisions = async () => {
      try {
        setLoadState("loading");
        const { data } = await client.query({
          query: GET_SUBDIVISIONS,
          variables: {
            name: null,
            subdivisionStatusCode: "Active",
            nearMapImageDate: null,
            limit: limit,
            offset: limit * page,
          }, // Optional variable for filtering by name
        });
        console.log(data);
        setData(data.subdivisions.subdivisions);
        setTotalPages(Math.ceil(data.subdivisions.totalRecords / limit));
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubdivisions();
  }, [page]);

  const rowsPerPage = 20;

  return (
    <>
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
                total={totalPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="code">Code</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="longitude">Longitude</TableColumn>
          <TableColumn key="latitude">Latitude</TableColumn>
          <TableColumn key="activeSections">Active Sections</TableColumn>
          <TableColumn key="county">County</TableColumn>
          <TableColumn key="surveyMethodCode">Survey Method Code</TableColumn>
          <TableColumn key="community">Community</TableColumn>
          <TableColumn key="nearMapImageDate">Near Map Image Date</TableColumn>
          <TableColumn key="subdivisionSpecificStatus">
            Subdivision Specific Status
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
    </>
  );
};
