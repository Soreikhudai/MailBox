import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EmailList.css";

function Primary() {
  return (
    <div className="primary">
      <h5>
        <FontAwesomeIcon icon={faMailBulk} /> primary
      </h5>
    </div>
  );
}

export default Primary;
