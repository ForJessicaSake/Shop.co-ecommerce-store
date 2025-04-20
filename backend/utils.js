const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$&_+";

export const generatePassword = () => {
  return [...Array(8)]
    .map(() =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$&_+".charAt(
        Math.floor(Math.random() * chars.length)
      )
    )
    .join("");
};
