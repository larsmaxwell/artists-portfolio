export class Album {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    images: Array<{
        _key: string,
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    }>;
    name: string;
    galleryview: boolean;
}
