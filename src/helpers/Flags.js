export const getFlagImages = (team) => {
  switch (team) {
    case "Pakistan":
      return require("public/flags/Pakistan.png");
      break;

    default:
      return require("public/flags/Pakistan.png");
      break;
  }
};
