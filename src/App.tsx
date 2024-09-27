import AutoComplete from "./components/Auto-complete";
import { useAlbumsState } from "./shared/models/album";

function App() {
  const {
    loadData,
    isDataLoading,
    currentlySelectedAlbum,
    onSelectCurrentAlbum,
    autocompleteItems,
    isTheLastPage,
    onClear,
  } = useAlbumsState();

  return (
    <div className="App">
      <AutoComplete
        data={autocompleteItems ?? []}
        isDataLoading={isDataLoading}
        onSelection={onSelectCurrentAlbum}
        loadData={loadData}
        isTheLastPage={isTheLastPage}
        onClear={onClear}
      />
      {currentlySelectedAlbum && (
        <span className="selected-text">
          Currently selected item: {currentlySelectedAlbum.title}
        </span>
      )}
    </div>
  );
}

export default App;
