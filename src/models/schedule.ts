export interface Schedule {
  day: string; 
  start_time: string; 
  end_time: string;
  term: string;
  building?: string;
  room?: string;
}