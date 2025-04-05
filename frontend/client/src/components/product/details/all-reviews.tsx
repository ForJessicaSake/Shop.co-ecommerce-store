import { useState } from "react";
import ReviewCard from "../../home/testimonials/review-card";
import Button from "../../micro/button";
import ModalComponent from "../../micro/modal";
import TextAreaInput from "../../micro/inputs/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productReviewschema,
  ProductReviewSchemaType,
  ProductReviewType,
} from "../schema";
import { useForm } from "react-hook-form";
import TextInput from "../../micro/inputs/input";
import {
  useCreateProductReview,
  useGetProductDetails,
  useGetProductReviews,
} from "../../../lib/hooks";
import { useParams } from "react-router";
import { toast } from "sonner";
import { getCurrentToken } from "../../../lib/api-client";
import Rating from "@mui/material/Rating";

const AllReviews = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { mutate: createProductReviewMutation, isPending } =
    useCreateProductReview();
  const { data: product } = useGetProductDetails(id);
  const { data: productReviews } = useGetProductReviews(id);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductReviewSchemaType>({
    resolver: zodResolver(productReviewschema),
  });

  const _onSubmit = (data: ProductReviewSchemaType) => {
    const payload = { ...data, product };
    createProductReviewMutation(payload, {
      onSuccess: () => {
        reset();
        setShowModal(false);
      },
    });
  };

  const handleOpen = () => {
    if (!getCurrentToken()) {
      return toast.error("You must be logged in to write a review");
    }
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <p className="text-xl font-bold">All Reviews</p>
        <Button dark size="m" onClick={handleOpen}>
          Write a Review
        </Button>
      </div>

      {productReviews ? (
        <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
          {productReviews?.map((review: ProductReviewType) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              content={review.review}
              rating={review.rating}
              className="w-full lg:max-w-full"
            />
          ))}
        </div>
      ) : (
        <p>No Reviews</p>
      )}
      <ModalComponent
        title="Write a Review"
        open={showModal}
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(_onSubmit)} className="space-y-5">
          <div className="flex justify-center text-5xl">
            <Rating
              name="rating"
              onChange={(_, newValue) => {
                setValue("rating", Number(newValue ?? 0));
              }}
              // size="large"
              sx={{ fontSize: "3rem" }}
              defaultValue={1}
            />
          </div>
          <TextInput
            error={errors.name?.message}
            register={register("name")}
            name="name"
            placeholder="Enter your name"
          />

          <div className="pt-2">
            <TextAreaInput
              error={errors.review?.message}
              register={register("review")}
              name="review"
              placeholder="Enter your review here"
              rows={3}
            />
          </div>

          <div className="w-full flex justify-center">
            <Button dark size="l" isLoading={isPending} className="max-w-xs">
              Submit
            </Button>
          </div>
        </form>
      </ModalComponent>
    </section>
  );
};

export default AllReviews;
