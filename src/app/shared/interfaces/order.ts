export interface orderRes {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface address {
  details: string;
  phone: string;
  city: string;
}

export interface orderResError {
  statusMsg: string;
  message: string;
}
