module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  overrides: [
    {
      files: '*.sol',
      options: {
        tabWidth: 4,
      },
    },
  ],
};
