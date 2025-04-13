export const MAX_FILE_SIZE = 1048576; // 1MB
export const DELIVERY_CHARGE = 5; //DOLLARS

export function convertToBase64(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const CustomerReviews = [
  {
    id: 1,
    name: "Sarah M.",
    content:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    content:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 4,
    name: "James L.",
    content:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 0,
    name: "Samantha D.",
    content:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
  },
  {
    id: 3,
    name: "Sarah M.",
    content:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
];
