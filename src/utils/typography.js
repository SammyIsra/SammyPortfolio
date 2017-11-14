import Typography from "typography";
import fairyGatesTheme from "typography-theme-fairy-gates";

fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "a": {
    textShadow: 0
  }
});

module.exports = new Typography(fairyGatesTheme);