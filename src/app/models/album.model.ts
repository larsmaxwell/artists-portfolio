import {Image} from './image.model'


export class Album {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    images: Array<Image>;
    name: string;
    galleryview: boolean;
}
