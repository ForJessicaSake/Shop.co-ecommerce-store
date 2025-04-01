import Button from "../micro/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../micro/inputs/input";
import { useCreateProduct } from "../../lib/hooks/product";
import FileInput from "../micro/inputs/file-input";
import { convertToBase64, SIZES } from "../utils/constants";
import { ProductType } from "../../lib/types";
import SelectInput from "../micro/inputs/select";
import { productSchema, ProductSchemaType } from "./schema";
import { adminAuth } from "../../lib/hooks";

const NewProduct = () => {
  const { mutate: createProductMutation, isPending } = useCreateProduct();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
  });

  const _onSubmit = (data: ProductType) => {
    createProductMutation(data);
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
    <section className="my-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(_onSubmit)}
        className="w-full space-y-10 rounded-xl p-5 max-w-3xl shadow-lg"
      >
        <h1 className="text-center font-bold text-xl sm:text-4xl">
          Add a new product
        </h1>
        <div className="grid sm:grid-cols-2 gap-10">
          <TextInput
            placeholder="Enter a product name"
            register={register("name")}
            error={errors.name?.message}
            name="name"
          />
          <TextInput
            placeholder="Enter product description"
            register={register("description")}
            error={errors.description?.message}
            name="description"
          />
          <TextInput
            placeholder="Enter product price"
            register={register("price")}
            error={errors.price?.message}
            name="price"
            type="number"
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
          />
          <SelectInput
            label="Size"
            error={errors.size?.message}
            register={register("size")}
            name="size"
            defaultValue="S"
            options={SIZES.map((size) => ({ value: size, label: size }))}
          ></SelectInput>
          <SelectInput
            label="Top Selling"
            error={errors.topSelling?.message}
            register={register("topSelling")}
            name="topSelling"
            defaultValue="No"
            options={[
              { value: "false", label: "No" },
              { value: "true", label: "Yes" },
            ]}
          ></SelectInput>
        </div>
        <div className="flex justify-center">
          <Button isLoading={isPending} size="l" className="max-w-sm my-5" dark>
            Add Product
          </Button>
        </div>
      </form>
    </section>
  );
};

export default adminAuth(NewProduct);
