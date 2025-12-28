function DocumentCard({
  title,
  image,
  onClick,
}: {
  title: string
  image: string
  onClick: (img: string) => void
}) {
  return (
    <div className="bg-[#111] rounded-xl p-4">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <img
        src={image}
        alt={title}
        className="rounded-lg cursor-pointer hover:opacity-90"
        onClick={() => onClick(image)}
      />
    </div>
  )
};
export default  DocumentCard