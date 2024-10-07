export const mockTiers: Array<{
  id: string;
  name: string;
  color: string;
  items: Array<{
    id: string;
    text: string;
    imageSrc: string | undefined;
  }>;
}> = [
  {
    id: "S",
    name: "S",
    color: "#DC2626",
    items: [
      {
        id: "Item 1",
        text: "Item 1",
        imageSrc:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
      },
      {
        id: "Item 2",
        text: "Item 2",
        imageSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QZ5W67MtcDA25ERyU7Z-Jd2pIp-aDVB_pg&s",
      },
      { id: "Item 3", text: "Item 3", imageSrc: undefined },
    ],
  },
  {
    id: "A",
    name: "A",
    color: "#EA580D",
    items: [
      { id: "Item 4", text: "Item 4", imageSrc: undefined },
      { id: "Item 5", text: "Item 5", imageSrc: undefined },
      { id: "Item 6", text: "Item 6", imageSrc: undefined },
    ],
  },
  {
    id: "B",
    name: "B",
    color: "#CA8A05",
    items: [
      { id: "Item 7", text: "Item 7", imageSrc: undefined },
      { id: "Item 8", text: "Item 8", imageSrc: undefined },
      { id: "Item 81", text: "Item 81", imageSrc: undefined },
      { id: "Item 82", text: "Item 82", imageSrc: undefined },
      { id: "Item 7", text: "Item 7", imageSrc: undefined },
      { id: "Item 8", text: "Item 8", imageSrc: undefined },
      { id: "Item 81", text: "Item 81", imageSrc: undefined },
      { id: "Item 82", text: "Item 82", imageSrc: undefined },
    ],
  },
  {
    id: "C",
    name: "C",
    color: "#12A34A",
    items: [
      { id: "Item 9", text: "Item 9", imageSrc: undefined },
      { id: "Item 10", text: "Item 10", imageSrc: undefined },
    ],
  },
  {
    id: "D",
    name: "D",
    color: "#2563EB",
    items: [{ id: "Item 11", text: "Item 11", imageSrc: undefined }],
  },
  {
    id: "F",
    name: "F",
    color: "#9333EA",
    items: [{ id: "Item 12", text: "Item 12", imageSrc: undefined }],
  },
];
