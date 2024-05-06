import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        mecaGrayBodyText: "#4B5565",
        mecaInputBgColor: "#EEF2F6",
        mecaBluePrimaryColor: "#095AD3",
        mecaErrorInputColor: "#F04438",
        mecaVerificationCodeColor: "#CDD5DF",
        mecaIconsFooterColor: "#98A2B3",
        mecaSuccessBackgroundColor: "#ECFDF3",
        mecaIconSuccessColor: "#079455",
        mecaDarkBlueBackgroundOverlay: "#101828",
        mecaActiveIconsNavColor: "#0852C0",
        mecaActiveBackgroundNavColor: "#EFF4FF",
        mecaTableTextSuccessColor: "#067647",
        mecaTableTextErrorColor: "#B42318",
        mecaTableTextErrorBackgroundColor: "#FEF3F2",
        mecaBorderColor: "#EAECF0",
        mecaGoBackText: "#202939",
        mecaGoBackArrow: "#697586",
        mecaBgDisableColor: "#9AA4B2",
        mecaLightBackgroundColor: "#F9FAFB",
        mecaLightGrayText: "#475467",
        mecaTagColor: "#528BFF",
        mecaBottomBorder: "#CDD5DF",
        mecaCartColor: "#84ADFF",
        mecaSearchColor: "#F8FAFC",
        mecaGrayBackgroundColor:'#F8FAFC',
        mecaYellowStarColor:'#FEC84B',
        mecaGrayLightBg:'#FCFCFD',
      },
      fontFamily: {
        nunito: ["var(--font-nunito_sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
