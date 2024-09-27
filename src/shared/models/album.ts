import { useCallback, useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/api/useApiRequest";
import { useToast } from "../../hooks/common/use-toast";
import { RestMethods, Endpoints } from "../api/api-constants";
import { PaginatedAnswer } from "../common-types/paginated-answer";
import { AutocompleteItem } from "../../components/Auto-complete/types";

export interface AlbumModel {
  id: string;
  title: string;
  totalImages: number;
}

export interface SearchArgs {
  page: number;
  perPage: number;
  title?: string;
  shouldReset?: boolean;
}

export interface LoadDataArgs {
  query?: string;
  nextPage?: boolean;
  shouldReset?: boolean;
}

const PER_PAGE = 20;

export const useAlbumsState = () => {
  const [albumsData, setAlbumsData] = useState<PaginatedAnswer<AlbumModel>>({
    data: [],
    currentPage: 1,
    total: 0,
  });
  const [isDataLoading, setDataLoading] = useState(false);
  const [currentlySelectedAlbum, setCurrentlySelectedAlbum] =
    useState<AlbumModel>();

  const { fetch } = useApiRequest();
  const { toast } = useToast();

  const getAlbums = useCallback(
    async ({ page, perPage, title, shouldReset }: SearchArgs) => {
      try {
        setDataLoading(true);

        const data = await fetch<PaginatedAnswer<AlbumModel>>({
          method: RestMethods.Get,
          route: Endpoints.GetAlbums,
          query: {
            page,
            perPage,
            title: !title ? undefined : title,
          },
        });
        if (data) {
          setAlbumsData((prevState) => ({
            currentPage: page,
            data: shouldReset ? data.data : [...prevState.data, ...data.data],
            total: data.total,
          }));
        } else {
          toast({
            variant: "success",
            title: "Failed to get autocomplete data",
            description: "Please, try again later",
          });
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Failed to get autocomplete data",
          description: "Please, try again later",
        });
      } finally {
        setDataLoading(false);
      }
    },
    [fetch, setAlbumsData, setDataLoading, toast]
  );

  const loadData = useCallback(
    async ({ query, nextPage, shouldReset }: LoadDataArgs) => {
      let page = albumsData.currentPage;
      if (nextPage) {
        page += 1;
      }

      if (shouldReset) {
        page = 1;
      }
      await getAlbums({
        page: page,
        perPage: PER_PAGE,
        title: query,
        shouldReset,
      });
    },
    [albumsData.currentPage, getAlbums]
  );

  useEffect(() => {
    loadData({ shouldReset: true });
    // eslint-disable-next-line
  }, []);

  const onSelectCurrentAlbum = (item: AutocompleteItem) => {
    setCurrentlySelectedAlbum(albumsData.data.find((el) => el.id === item.id));
  };

  const autocompleteItems = albumsData?.data?.map((el) => ({
    id: el.id,
    label: `${el.title} (${el.totalImages})`,
  }));

  const isTheLastPage = albumsData.data.length >= albumsData.total;

  const onClear = () => {
    loadData({ shouldReset: true });
  };

  return {
    loadData,
    isDataLoading,
    currentlySelectedAlbum,
    onSelectCurrentAlbum,
    autocompleteItems,
    isTheLastPage,
    onClear,
  };
};
