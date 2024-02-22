//custom Pagination Hook
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  };
  const paginationRange = useMemo(() => {
    // total pages count
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // pagecount = left + current + right + siblingPage + 2dots
    const totalPageNumbers = siblingCount + 5;

    //Case 1
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //case 2
    //no left dots, but right dots to be displayed
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftItemCount, DOTS, totalPageCount];
    }

    //case 3
    //lefts dots , but no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //case 4
    //both left and right dots are present
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middlerange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middlerange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
