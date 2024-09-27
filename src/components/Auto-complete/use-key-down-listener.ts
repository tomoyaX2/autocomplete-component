import { useHotkeyControl } from "../../hooks/common/use-hotkey-control";
import { AutocompleteItem } from "./types";

interface Args {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSelection: (value: AutocompleteItem) => void;
  data: AutocompleteItem[];
}

export const useAutocompleteKeydownListener = ({
  activeIndex,
  setActiveIndex,
  setIsOpen,
  setSearchTerm,
  onSelection,
  data,
}: Args) => {
  const handleEnterPress = () => {
    if (activeIndex >= 0) {
      const selectedItem = data[activeIndex];
      setSearchTerm(selectedItem.id);
      setIsOpen(false);
      onSelection(selectedItem);
    }
  };

  const handleArrowDownPress = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleEscapePress = () => {
    setIsOpen(false);
  };

  const handleArrowUpPress = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
  };

  const { handleKeyDown } = useHotkeyControl({
    Enter: handleEnterPress,
    ArrowDown: handleArrowDownPress,
    Escape: handleEscapePress,
    ArrowUp: handleArrowUpPress,
  });

  return { handleKeyDown };
};
