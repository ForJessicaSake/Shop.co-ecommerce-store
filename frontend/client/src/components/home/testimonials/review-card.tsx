import { IoIosStar } from "react-icons/io";
import checkIcon from "../../../assets/images/check.svg";
import clsx from "clsx";

type ReviewCardProps = {
  name: string;
  content: string;
  rating: number;
  className?: string;
  key: string;
};

const ReviewCard = ({
  name,
  content,
  className,
  rating,
  key,
}: ReviewCardProps) => {
  return (
    <div
      key={key}
      className={clsx(
        className,
        "rounded-xl lg:max-w-[400px] border border-black/10 space-y-3 p-5 sm:min-h-72 md:min-h-56 h-full"
      )}
    >
      <div className="flex items-center text-xl text-yellow-400 gap-2">
        {Array.from({ length: rating }).map((_, index) => (
          <div key={index}>
            <IoIosStar />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <p className="text-headerText text-lg font-medium">{name}</p>
        <img src={checkIcon} alt="verified" className="h-6 w-6" />
      </div>
      <p className="lg:max-w-md max-w-full text-sm text-black/60">{content}</p>
      <div className="flex items-center gap-x-2"></div>
    </div>
  );
};

export default ReviewCard;
