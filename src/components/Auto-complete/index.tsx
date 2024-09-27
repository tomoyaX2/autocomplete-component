import React, { useState, ChangeEvent, useRef, useMemo } from "react";
import useClickOutside from "../../hooks/common/use-click-outside";
import "./styles.css";
import { useAutocompleteKeydownListener } from "./use-key-down-listener";
import { AutocompleteItem } from "./types";
import useInfiniteScroll from "../../hooks/common/use-infinite-scroll";
import { useDebouncedCallback } from "../../hooks/common/use-debounced-callback";
import { LoadDataArgs } from "../../shared/models/album";
import { AutocompleteList } from "./List";

interface AutoCompleteProps {
  data: AutocompleteItem[];
  onSelection: (value: AutocompleteItem) => void;
  isDataLoading: boolean;
  loadData: (args: LoadDataArgs) => void;
  isTheLastPage: boolean;
  onClear?: () => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  data,
  onSelection,
  isDataLoading,
  isTheLastPage,
  loadData,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const debouncedCallback = useDebouncedCallback();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    if (value) {
      debouncedCallback(() => {
        loadData({ query: value, shouldReset: true });
      }, 1000);
    } else {
      onClear?.();
    }
  };

  const selectItem = (value: AutocompleteItem) => {
    onSelection(value);
    setSearchTerm(value.label);
  };

  useClickOutside<HTMLDivElement>(containerRef, () => setIsOpen(false));

  useInfiniteScroll({
    targetRef: listRef,
    onLoadMore: () => {
      if (!isDataLoading) {
        loadData({ query: searchTerm, nextPage: true });
      }
    },
    isTheLastPage,
    loading: isDataLoading,
  });

  const { handleKeyDown } = useAutocompleteKeydownListener({
    activeIndex,
    setActiveIndex,
    setIsOpen,
    setSearchTerm,
    data,
    onSelection,
  });

  const filteredList = useMemo(() => {
    if (searchTerm) {
      return data.filter((el) =>
        el.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }, [data, searchTerm]);

  return (
    <div className="autocomplete" ref={containerRef}>
      <div className="autocomplete-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="autocomplete-input"
          placeholder="Type something to search"
        />
      </div>
      {isOpen && (
        <AutocompleteList
          filteredList={filteredList}
          listRef={listRef}
          isDataLoading={isDataLoading}
          selectItem={selectItem}
        />
      )}
    </div>
  );
};

export default AutoComplete;
