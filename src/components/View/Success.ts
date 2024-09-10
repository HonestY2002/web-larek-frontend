import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface ISuccess {
    total: number;
}

interface SuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLButtonElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, actions: SuccessActions) {
        super(container);

        this._close = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this._total = ensureElement<HTMLElement>('.order-success__description', container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(total: number) {
        this._total.textContent = 'Cписано '+ total.toString() + ' синапсов';
    }
}