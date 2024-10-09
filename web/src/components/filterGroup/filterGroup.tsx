import { RadioGroup, Radio } from "@nextui-org/react";
import React from "react";
import { useState } from "react";

interface SubdivisionFilterProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

export const SubdivisionFilter: React.FC<SubdivisionFilterProps> = ({
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <RadioGroup
      label="Subdivision Status Code"
      color="secondary"
      defaultValue="Active"
      value={selectedStatus}
      orientation="horizontal"
      onValueChange={setSelectedStatus}
    >
      <Radio value="Active">Active</Radio>
      <Radio value="Future">Future</Radio>
      <Radio value="Builtout">Builtout</Radio>
    </RadioGroup>
  );
};
