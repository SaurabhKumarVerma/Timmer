import { Theme } from "@react-navigation/native";
import { color } from "./appColor";

const LightTheme:Theme = {
    colors: {
        background: '#F2F0F7',
        text: color.black,
        primary: "",
        card: "",
        border: "",
        notification: ""
    },
    dark: false,
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

  export default LightTheme;