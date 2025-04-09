import Button from "../micro/button";
import { Breadcrumbs } from "../micro/bread-crumbs";
import Product from "../micro/product";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaChevronUp } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { useGetProducts } from "../../lib/hooks/product";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import NoProduct from "../../assets/images/no product.avif";

const Products = () => {
  const [size, setSize] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [value, setValue] = useState<number[] | number>([0, 5000]);
  const { data: products, isLoading } = useGetProducts({
    size: size,
    price: Array.isArray(value) ? value : [value],
  });
  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleChange = (_: Event, newValue: number[] | number) => {
    setValue(newValue);
  };
  return (
    <section className="mx-auto container px-8 lg:px-16">
      <Breadcrumbs crumbs={[{ title: "Home", link: "/" }, { title: "Shop" }]} />
      <div className="flex md:flex-row flex-col gap-5 pt-5">
        {showFilter && (
          <div className="border border-black/10 rounded-xl md:max-w-[295px] w-full h-fit p-4">
            <div className="flex items-center justify-between">
              <p className=" font-bold">Filters</p>
              <MdOutlineFilterList
                className="text-lg text-black/60 cursor-pointer"
                onClick={handleToggleFilter}
              />
            </div>
            <div className="mt-5">
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaChevronUp />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <p>Size</p>
                </AccordionSummary>
                <AccordionDetails className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    size="s"
                    dark={size === ""}
                    onClick={() => setSize("")}
                  >
                    All
                  </Button>
                  <Button
                    size="s"
                    dark={size === "XS"}
                    onClick={() => setSize("XS")}
                  >
                    X-Small
                  </Button>
                  <Button
                    size="s"
                    dark={size === "S"}
                    onClick={() => setSize("S")}
                  >
                    Small
                  </Button>
                  <Button
                    size="s"
                    dark={size === "M"}
                    onClick={() => setSize("M")}
                  >
                    Medium
                  </Button>
                  <Button
                    size="s"
                    dark={size === "L"}
                    onClick={() => setSize("L")}
                  >
                    Large
                  </Button>
                  <Button
                    size="s"
                    dark={size === "XL"}
                    onClick={() => setSize("XL")}
                  >
                    X-Large
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="mt-5">
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaChevronUp />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Price
                </AccordionSummary>
                <AccordionDetails className="grid gap-5 cursor-pointer">
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={5000}
                    sx={{
                      color: "black",
                      "& .MuiSlider-thumb": { backgroundColor: "black" },
                      "& .MuiSlider-track": { backgroundColor: "black" },
                      "& .MuiSlider-rail": { backgroundColor: "gray" },
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        )}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pb-5">
            <p className="text-2xl font-bold">Catalog</p>
            <div className="flex flex-wrap items-center gap-5 justify-between">
              <p className="gap-1 text-sm text-black/60 flex items-center">
                Showing 1-10 of 100 Products
                <span className="sm:block hidden">Sort by:</span>
                <span className="font-medium text-black md:block hidden">
                  Newest
                </span>
              </p>
              {!showFilter && (
                <MdOutlineFilterList
                  className="text-lg text-black bg-black/5 w-8 h-8 p-1 rounded-full cursor-pointer"
                  onClick={handleToggleFilter}
                />
              )}
            </div>
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className="w-full grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={200}
                    height={200}
                    className="animate-pulse rounded-xl"
                  />
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="w-full flex flex-col text-center items-center justify-center h-full gap-2">
                <img
                  src={NoProduct}
                  alt="No product found"
                  className="h-72 w-72"
                />
                <p className="font-medium text-lg">No product found</p>
                <p className="max-w-sm text-sm">
                  Try changing the filters or the price range
                </p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {products?.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
