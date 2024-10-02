export interface IEntry {
  id: number;
  title: string;
  description: string;
  img: string;
  date: string;
  location: {
    continent?: string;
    country?: string;
    location: string;
    type?: string;
  };
}
