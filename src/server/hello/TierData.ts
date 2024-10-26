export type TierData = {
  id: string;
  name: string;
  color: string;
  items: Array<{
    id: string;
    text: string;
    imageSrc: string | null;
  }>;
};
