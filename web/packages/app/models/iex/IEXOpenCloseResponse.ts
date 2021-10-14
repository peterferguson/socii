
export interface IEXOpenCloseResponse {
  open: {
    price: number;
    time: number;
  };
  close: {
    price: number;
    time: number;
  };
}
