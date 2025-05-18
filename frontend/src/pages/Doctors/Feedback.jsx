import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

//import avatar from "../../assets/images/avatar-icon.png";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews?.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={review?.user?.photo} alt="" className="w-full" />
              </figure>

              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review?.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formatDate(review?.createdAt)}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">
                  {review.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {/* Array(n)	Creates an empty array of length n
              .keys()	Returns an index iterator (0 → n-1)
              [...Array(n).keys()]	Creates an array like [0, 1, 2, ..., n-1]
              _ means “I’m ignoring the actual value” (it's just an index array).
               */}
              {[...Array(review?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#ffd700" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {!showFeedbackForm && (
        <div className="text-center ">
          <button className="btn " onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
