import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepages() {
  return (
    <>
      <PageNav />
      <AppNav/>
      <h1>WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </>
  );
}
