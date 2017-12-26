export class Post {
  id: string;
  from: string;
  fromId: string;
  message: string;
  createdAt: string;
  type: string = 'post';

  constructor(id: string, from: string, fromId: string, message: string, createdAt: string) {
    this.id = id;
    this.from = from;
    this.fromId = fromId;
    this.message = message;
    this.createdAt = createdAt;
  }
}
