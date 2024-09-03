import { IApi, Data, SendOrderData, orderResponse} from '../../types';

export class AppData {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getProducts(): Promise<Data> {
		return this._baseApi.get<Data>(`/product`).then((result: Data) => result);
	}

	postOrder(orderData: SendOrderData): Promise<orderResponse> {
        return this._baseApi.post<orderResponse>('/order', orderData)
            .then((result: orderResponse) => result);
    }
	
}