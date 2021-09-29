import { Image } from './image.model'

export class Illustration {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    description: string;
    featuredImage: Image;
    releaseDate: Date;
    name: string;
    slug: {_type: string, curent: string};
}
