export const categoryValidator = {
  categoryName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "categoryName length greater than 3",
    },
  },
};
