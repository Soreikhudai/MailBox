import EmailList from "./EmailList";
import Leftbar from "./LeftBar";
import ViewMessage from "./ViewMessage";

const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        marginTop: "4rem",
      }}
    >
      <div>
        <Leftbar />
      </div>
      <div>
        <EmailList />
      </div>
      <div>
        <ViewMessage />
      </div>
    </div>
  );
};
export default Main;
