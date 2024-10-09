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
import { SubdivisionFilter } from "../filterGroup/filterGroup";
import { useAsyncList } from "@react-stately/data";

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
  const [selectedStatus, setSelectedStatus] = React.useState("Active");
  const limit = 10;

  const list = useAsyncList({
    async load({ signal }) {
      try {
        const { data } = await client.query({
          query: GET_SUBDIVISIONS,
          variables: {
            name: null,
            subdivisionStatusCode: "Future",
            nearMapImageDate: null,
            limit: limit,
            offset: limit * 1, // Start at page 1
          },
          context: { signal },
        });
        return {
          items: data.subdivisions.subdivisions,
          // You can add any other properties here if necessary
        };
      } catch (err) {
        console.error(err);
        return { items: [] }; // Return an empty array on error
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (first || "").localeCompare(second || "");

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const handleStatusChange = (newStatus: React.SetStateAction<string>) => {
    setSelectedStatus(newStatus);
  };

  return (
    <>
      <SubdivisionFilter
        selectedStatus={selectedStatus}
        setSelectedStatus={handleStatusChange}
      />
      <Table
        aria-label="Example table with client async pagination and sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="code">Code</TableColumn>
          <TableColumn key="name" allowsSorting>
            Name
          </TableColumn>
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
        <TableBody items={list.items} loadingContent={<Spinner />}>
          {(item) => (
            <TableRow key={item.code}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={1} // Handle pagination logic as necessary
        total={Math.ceil(list.items.length / limit)}
        onChange={(page) => {
          // Update the page and refetch data if necessary
        }}
      />
    </>
  );
};
