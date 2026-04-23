export interface LogEntry {
  id: string;
  action: string;
  entity: string;
  entity_id?: string;
  user_id?: string;
  details?: Record<string, unknown>;
  created_at: string;
}
