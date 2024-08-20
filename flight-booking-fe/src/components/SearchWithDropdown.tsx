import React, { 
  ChangeEvent, 
  useEffect, 
  useState 
} from "react";
import { 
  Dropdown, 
  DropdownItem,
  DropdownMenu, 
  DropdownToggle, 
  Input 
} from "reactstrap";

import { DropdownWithSearchOption } from "../types";

function SearchWithDropdown(props: {
  options: DropdownWithSearchOption[],
  defaultName: string,
  onClick: (selected: DropdownWithSearchOption) => void 
}): JSX.Element {
  const {
    options,
    defaultName,
    onClick
  } = props;

  const [ search, setSearch] = useState<string>("");
  const [ filterOptions, setFilterOptions ] = useState<DropdownWithSearchOption[]>([]);
  const [ selectedValue, setSelectedValue ] = useState<string>("");
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const onHandleclick = (option: DropdownWithSearchOption): void => {
    setSelectedValue(option.value);
    setFilterOptions(options);
    setSearch("");
    onClick(option);
  };

  const toggleHandle = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(search === "") {
      setFilterOptions(options);
    } else {
      const filter = options.filter((option: DropdownWithSearchOption) => option.value.toLowerCase().includes(search.toLowerCase()));
      setFilterOptions(filter);
    }
  }, [search, options]);

  return (
    <>
      <Dropdown isOpen={isOpen} toggle={ toggleHandle }>
        <DropdownToggle caret>
          { selectedValue || defaultName }
        </DropdownToggle>
        <DropdownMenu>
          <div className="px-2 py-1">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
            />
          </div>
          {filterOptions.length > 0 ? (
            filterOptions.map((option: DropdownWithSearchOption) => (
              <DropdownItem key={option.key} onClick={(): void => onHandleclick(option)}>
                { option.value}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>No options found</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default SearchWithDropdown;
