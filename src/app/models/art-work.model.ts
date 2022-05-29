import { Image } from "./image.model";

export class ArtWork {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _updatedAt: Date;
    releaseDate: Date;
    album: { _ref: string, _type: string };
    category: { _ref: string, _type: string };
    description: [{
        _key: string,
        _type: string,
        children: [
            {marks: [],
            text: string }
        ], 
        markDefs: [{
            _key: string, 
            _type: string,
            href: string,
            style: string
        }]
    }];
    name: string;
    featuredImage: {
        _key: string,
        _type: string,
        asset: {
            _ref:  string,
            _type: string 
        }
    };
    mediaUrl: string;
    galleryview: boolean;
    slug: {_type: string, curent: string};
    metaDescription: string;
    metaInfo: {
        metaDescription: string;
        metaImage: Image,
        metaKeywords: string
    }
    keywords: string[];
}
