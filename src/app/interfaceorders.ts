export interface InterfaceOrders {
  [x: string]: any;
  id: number;
  building_name: string;
  unit_name: string;
  user_name: string;
  user_id: string;
  user_classe: string;
  service_name: string;
  status: string;

  description_created: string;
  description_process: string;
  description_closed: string;
  description_approved: string;

  date_created: string;
  date_process: string;
  date_closed: string;
  date_approved: string;

  date_created_string: string;
  date_process_string: string;
  date_closed_string: string;
  date_approved_string: string;

  accessTokens: any[];
}
