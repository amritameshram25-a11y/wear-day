import Icon from "../shared/Icon.jsx";
import "../../styles/components/Announcement.css";

function Announcement() {
  return (
    <div className="announcement">
      <div className="announcement-inner">
        <span>
          <Icon name="truck" size={14} /> Free Shipping on Orders Over $50
        </span>
        <span className="announcement-center">
          <Icon name="return" size={14} /> 30-Day Money Back Guarantee
        </span>
        <span className="announcement-rating">
          <Icon name="star" size={14} /> Excellent 4.9 out of 5
        </span>
      </div>
    </div>
  );
}
export default Announcement;
