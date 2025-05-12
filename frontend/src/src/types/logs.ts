export interface LogItem {
  id: number;
  inserted_at: string;
  json: {
    [key: string]: any;
  };
}
