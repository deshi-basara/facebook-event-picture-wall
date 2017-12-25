export class Image {
  id: string;
  url: string;
  from: string;
  createdAt: string;

  wasDisplayed: boolean = false;

  constructor(id: string, url: string, from: string, createdAt: string) {
    this.id = id;
    this.url = url;
    this.from = from;
    this.createdAt = createdAt;
  }
};
