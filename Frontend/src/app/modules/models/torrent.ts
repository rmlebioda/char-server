
export interface Torrent {
  hash: string,
  name: string,
  size: number,
  progress: number,
  completedSize: number,
  incompletedSize: number,
  addedOn: string,
  completedOn: string,
  state: string,
  seedingTime: string,
  contentPath: string,
  percentageCompletion: string
}
