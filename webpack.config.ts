import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

interface CustomConfiguration extends Configuration {
  devServer?: {
    static: string;
    port: number;
    historyApiFallback: boolean;
  };
}

const config: CustomConfiguration = {
  mode: "development", // or 'production'
  entry: "./src/index.tsx", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output file name
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Allow importing .ts, .tsx, .js, and .jsx files without specifying the extension
  },
  module: {
    rules: [
      {
        // test: /\.tsx?$/,
        test: /\.(ts|tsx)$/,
        use: "swc-loader", // Use swc-loader to transpile TypeScript/JSX files but way faster than ts/babel loader
        exclude: /node_modules/,
      },

      {
        test: /\.(png|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
    }),
    new CleanWebpackPlugin(), // Cleans the 'dist' folder before each build
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), // Use 'static' instead of 'contentBase' and specify the directory to serve content from
    port: 8080,
    historyApiFallback: true,
  },
};

export default config;
