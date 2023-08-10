import { FormatRupiah } from '@arismun/format-rupiah';

export const CardProduct = ({ link, imgUrl, title, price }) => {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className="p-3 bg-[#1A1C1E] inline-block rounded-lg group"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={imgUrl}
          alt="img-product"
          className="h-[200px] w-full object-cover rounded-lg group-hover:scale-110 transition-all"
        />
      </div>

      <p className="mt-3 line-clamp-1">{title}</p>
      <p className="font-bold text-xl">
        <FormatRupiah value={price} />
      </p>
    </a>
  );
};
