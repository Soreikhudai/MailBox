import MainInboxPage from "../components/email/MainInboxPage";
import SideBar from "../components/email/SideBar";
import Header from "../components/header/Header";

const EmailPage = () => {
  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{ display: "flex", boxShadow: "grey 0px 2px 6px 5px" }}
      >
        <SideBar />
        <MainInboxPage />
      </div>
    </>
  );
};
export default EmailPage;
