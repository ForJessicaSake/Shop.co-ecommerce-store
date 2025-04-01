import Button from "../micro/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./schema";
import TextInput from "../micro/inputs/input";
import {
  useGetProductDetails,
  useUpdateProduct,
} from "../../lib/hooks/product";
import { useParams } from "react-router";
import { convertToBase64, SIZES } from "../utils/constants";
import FileInput from "../micro/inputs/file-input";
import SelectInput from "../micro/inputs/select";
import { ProductType } from "../../lib/types";
import { adminAuth } from "../../lib/hooks";

const EditProduct = () => {
  const { id } = useParams();
  const { data: product } = useGetProductDetails(id);
  const { mutate: updateProductMutation, isPending } = useUpdateProduct(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
      topSelling: product?.topSelling ?? false,
    },
  });

  const _onSubmit = (data: ProductType) => {
    updateProductMutation(data);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    const base64 = await convertToBase64(file);
    setValue("image", base64 as string);
  };

  return (
    <section className="container my-10 mx-auto px-10 lg:px-16 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(_onSubmit)}
        className="w-full space-y-10 rounded-xl p-5 max-w-3xl shadow-lg"
      >
        <h1 className="text-center font-bold text-xl sm:text-4xl">
          Edit a product
        </h1>
        <div className="grid sm:grid-cols-2 gap-10">
          <TextInput
            placeholder="Enter a product name"
            register={register("name")}
            error={errors.name?.message}
            name="name"
            defaultValue={product?.name ?? ""}
            label="Product Name"
          />
          <TextInput
            placeholder="Enter product description"
            register={register("description")}
            error={errors.description?.message}
            name="description"
            defaultValue={product?.description}
            label="Product Description"
          />
          <TextInput
            placeholder="Enter product price"
            register={register("price")}
            error={errors.price?.message}
            name="price"
            defaultValue={product?.price}
            label="Product Price"
          />
          <FileInput
            placeholder="Enter product image url"
            onFileChange={(files) => {
              if (files)
                handleFileUpload({
                  target: { files },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
            error={errors.image?.message}
            name="image"
            label="Product Image"
          />
          <SelectInput
            label="Product Size"
            register={register("size")}
            name="size"
            defaultValue="Select a size"
            options={SIZES.map((size) => ({
              value: size,
              label: size,
              selected: product?.size === size,
            }))}
          ></SelectInput>
          <SelectInput
            label="Top Selling?"
            register={register("topSelling")}
            name="topSelling"
            defaultValue="Top Selling?"
            options={[
              {
                value: "false",
                label: "No",
                selected: product?.topSelling === false,
              },
              {
                value: "true",
                label: "Yes",
                selected: product?.topSelling === true,
              },
            ]}
          ></SelectInput>
        </div>
        <Button isLoading={isPending} size="l" className="w-full" dark>
          Add Product
        </Button>
      </form>
    </section>
  );
};

export default adminAuth(EditProduct);
