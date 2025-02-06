import { Theme } from "@react-navigation/native";
import { color } from "./appColor";

const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: 'orange',
        background: color.black,
        card: '#262626',
        text: color.white,
        border: '#262626',
        notification: ""
    },
    fonts: {
        regular: {
            fontFamily: "",
            fontWeight: "bold"
        },
        medium: {
            fontFamily: "",
            fontWeight: "bold"
        },
        bold: {
            fontFamily: "",
            fontWeight: "bold"
        },
        heavy: {
            fontFamily: "",
            fontWeight: "bold"
        }
    }
};
  
  export default DarkTheme;
