import { AutocompleteItem } from "./types";

interface Props {
  filteredList: AutocompleteItem[];
  listRef: React.RefObject<HTMLDivElement>;
  selectItem: (item: AutocompleteItem) => void;
  isDataLoading: boolean;
}

export const AutocompleteList = ({
  listRef,
  filteredList,
  selectItem,
  isDataLoading,
}: Props) => {
  if (!filteredList.length) {
    return (
      <div className="no-data-text">
        <span>No data found</span>
      </div>
    );
  }

  return (
    <div className="autocomplete-list" ref={listRef}>
      <ul>
        {filteredList.map((item) => (
          <li
            key={item.id}
            className="autocomplete-item"
            onClick={() => selectItem(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      {isDataLoading && <span>Loading...</span>}
    </div>
  );
};
