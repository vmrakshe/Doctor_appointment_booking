import { faqs } from "../../assets/data/faqs";
import FaqItem from "./FaqItem";

const FaqList = () => {
  return (
    <ul className="mt-[38px]">
      {faqs.map((quest, index) => (
        <FaqItem item={quest} key={index} />
      ))}
    </ul>
  );
};

export default FaqList;
