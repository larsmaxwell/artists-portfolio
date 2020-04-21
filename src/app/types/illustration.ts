export class Illustration {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    description: string;
    featuredImage: Array<{_key: string, asset: Array<{_ref:  string, _type: string }>}>;
    releaseDate: Date;
    name: string;
    slug: {_type: string, curent: string};
}
