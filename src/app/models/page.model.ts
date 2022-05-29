import { Image } from "./image.model";

export class Page {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    name: string;
    slug: {_type: string, curent: string};
    pageContent: [{
        _key: string,
        _type: string,
        children: [{marks:  [{}], text: string }], 
        markDefs: [{_key: string, _type: string, href: string, style: string}]
    }];
    metaInfo: {
        metaDescription: string;
        metaImage: Image,
        metaKeywords: string
    };
    featuredImage: {_type: string, asset: {_ref: string, _type: string}}
}