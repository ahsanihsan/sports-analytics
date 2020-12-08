export const getFlagImages = (team) => {
  switch (team) {
    case "Pakistan":
      return require("../assets/flags/Pakistan.png");
      break;
    case "India":
      return require("../assets/flags/India.png");
      break;
    case "Afghanistan":
      return require("../assets/flags/Afghanistan.png");
      break;
    case "Australia":
      return require("../assets/flags/Australia.png");
      break;
    case "Bangladesh":
      return require("../assets/flags/Bangladesh.png");
      break;
    case "Bermuda":
      return require("../assets/flags/Bermuda.png");
      break;
    case "Canada":
      return require("../assets/flags/Canada.png");
      break;
    case "England":
      return require("../assets/flags/England.png");
      break;
    case "Eritrea":
      return require("../assets/flags/Eritrea.png");
      break;
    case "Hong Kong":
      return require("../assets/flags/HongKong.png");
      break;
    case "Ireland":
      return require("../assets/flags/Ireland.png");
      break;
    case "Kenya":
      return require("../assets/flags/Kenya.png");
      break;
    case "Namibia":
      return require("../assets/flags/Namibia.png");
      break;
    case "Nepal":
      return require("../assets/flags/Nepal.png");
      break;
    case "Netherlands":
      return require("../assets/flags/Netherlands.png");
      break;
    case "New Zealand":
      return require("../assets/flags/NewZealand.png");
      break;
    case "Oman":
      return require("../assets/flags/Oman.png");
      break;
    case "Papua New Guinea":
      return require("../assets/flags/PapuaNewGuinea.png");
      break;
    case "Scotland":
      return require("../assets/flags/Scotland.png");
      break;
    case "South Africa":
      return require("../assets/flags/SouthAfrica.png");
      break;
    case "Sri Lanka":
      return require("../assets/flags/SriLanka.png");
      break;
    case "United Arab Emirates":
      return require("../assets/flags/UnitedArabEmirates.png");
      break;
    case "Zimbabwe":
      return require("../assets/flags/Zimbabwe.png");
      break;
    case "West Indies":
      return require("../assets/flags/WestIndies.png");
      break;

    default:
      return require("../assets/flags/Pakistan.png");
      break;
  }
};
