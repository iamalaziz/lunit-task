export interface ICircle {
	id: string;
	points: IPoint[];
}

export interface IPoint {
	x: number;
	y: number;
}

export interface ISettings {
	deleteMode: boolean;
	theme: 'light' | 'dark';
}
