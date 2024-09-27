import { useEffect, useCallback, RefObject } from "react";

interface UseInfiniteScrollProps {
  targetRef: RefObject<HTMLElement>;
  onLoadMore: () => void;
  isTheLastPage: boolean;
  loading: boolean;
}

const useInfiniteScroll = ({
  targetRef,
  onLoadMore,
  isTheLastPage,
  loading,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(async () => {
    if (!targetRef.current || isTheLastPage || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = targetRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      onLoadMore();
    }
  }, [targetRef, onLoadMore, isTheLastPage, loading]);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement) return;

    targetElement.addEventListener("scroll", handleScroll);

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
    };
  }, [targetRef, handleScroll]);

  return { loading };
};

export default useInfiniteScroll;
