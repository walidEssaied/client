export const commonFilters = (next: any) => {
  return {
    initialPageSize: 5,
    metaData: {
      cursor: {
        next,
      },
    },
  };
};
