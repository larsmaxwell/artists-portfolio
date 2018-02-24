export class Album {
    id: number;
    title: string;
    workId: number;
    images: Array<{ id: number, url: string }>;
}