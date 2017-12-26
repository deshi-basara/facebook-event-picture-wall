export class Image {
  id: string;
  url: string;
  from: string;
  fromId: string;
  name: string;
  createdAt: string;
  type: string = 'image';

  constructor(id: string, url: string, from: string, fromId: string, name: string, createdAt: string) {
    this.id = id;
    this.url = url;
    this.from = from;
    this.fromId = fromId;
    this.name = name;
    this.createdAt = createdAt;
  }
};
