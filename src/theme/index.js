import colours from "./colours";
import grid from "./grid";

import mediaQueries from "../helpers/mediaQueries";

const theme = { colours, grid, media: mediaQueries(grid.breakpoints) };

export default theme;
