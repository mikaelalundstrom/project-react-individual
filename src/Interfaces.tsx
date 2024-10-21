export interface IEntry {
  id: number;
  title: string;
  description: string;
  img: string;
  imgPosition?: { x: string; y: string };
  date: string;
  location: {
    continent?: string;
    country?: string;
    location: string;
    type?: string;
  };
}

export interface IProfile {
  name?: string;
  birthday?: string;
  from?: string;
  favoriteDestination?: string;
  dreamDestination?: string;
  favoriteEntry?: string;
}

export interface IMessage {
  message: string;
  link?: { link: string; label: string };
}
