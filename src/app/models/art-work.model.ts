export class ArtWork {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _updatedAt: Date;
    releaseDate: Date;
    album: { _ref: string, _type: string };
    category: { _ref: string, _type: string };
    description: Array<{_key: string, _type: string, children: Array<{marks:  Array<{}>, text: string }>, markDefs: Array<{_key: string, _type: string, href: string, style: string}>}>;
    name: string;
    featuredImage: Array<{_key: string, asset: Array<{_ref:  string, _type: string }>}>;
    mediaUrl: string;
    galleryview: boolean;
    slug: {_type: string, curent: string};
}
