export class Album {
    id: number;
    title: string;
    workId: number;
    galleryview: boolean;
    images: Array<{ _key: string, _type: string, asset: {_ref: string, _type: string} }>;
}