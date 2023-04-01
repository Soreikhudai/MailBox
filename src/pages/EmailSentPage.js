import MainSentPage from "../components/email/MainSentPage";
import SideBar from "../components/email/SideBar";
import Header from "../components/header/Header";

const EmailSentPage = () => {
  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{ display: "flex", boxShadow: "grey 0px 2px 6px 5px" }}
      >
        <SideBar />
        <MainSentPage />
      </div>
    </>
  );
};
export default EmailSentPage;
