import React from "react";
import {
  Input,
  Select,
  FormLabel,
  RadioGroup,
  VStack,
  Radio,
} from "@chakra-ui/react";
import { useGlobalContext } from "../context";

function Sidebar() {
  const {
    // search,
    sort,
    updateSort,
    filter,
    updateFilter,
    // updateSearch,
  } = useGlobalContext();

  return (
    <div className="sidebar">
      {/* <div className="input__field">
        <FormLabel marginTop="10px">Search</FormLabel>
        <Input
          type="text"
          name="search"
          value={search}
          onChange={updateSearch}
          placeholder="User name / Post"
        />
      </div> */}
      <div className="input__field">
        <FormLabel marginTop="10px">Sort by</FormLabel>
        <Select value={sort} onChange={updateSort}>
          <option value="date-recent">Date (Recent)</option>
          <option value="date-oldest">Date (Oldest)</option>
          <option value="likes-highest">Likes (Highest)</option>
          <option value="likes-lowest">Likes (Lowest)</option>
        </Select>
      </div>
      <div className="input__field">
        <FormLabel marginTop="10px">Filters</FormLabel>
        <RadioGroup defaultValue={filter} onChange={(e) => updateFilter(e)}>
          <VStack spacing={2} direction="row">
            <Radio colorScheme="green" value="all" name="filter">
              All
            </Radio>
            <Radio colorScheme="green" value="images" name="filter">
              With Images
            </Radio>
            <Radio colorScheme="green" value="text" name="filter">
              Text Only
            </Radio>
          </VStack>
        </RadioGroup>
      </div>
    </div>
  );
}

export default Sidebar;
