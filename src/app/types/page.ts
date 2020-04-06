export class Page {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    name: string;
    slug: {_type: string, curent: string};
    pageContent: Array<{_key: string, _type: string, children: Array<{marks:  Array<{}>, text: string }>, markDefs: Array<{_key: string, _type: string, href: string, style: string}>}>;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: {_type: string, asset: {_ref: string, _type: string}}
}