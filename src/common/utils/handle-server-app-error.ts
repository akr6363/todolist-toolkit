import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { ResponseType } from "common/types";

/**
 Обрабатывает ошибки сервера и обновляет статус приложения и состояние ошибки
 @template D - Тип данных ответа
 @param {ResponseType<D>} data - Данные ответа от сервера
 @param {Dispatch} dispatch - Функция диспетчера Redux
 @param {boolean} [showError=true] - Флаг, указывающий, нужно ли показывать ошибку
 @returns {void}
 */

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
  showError: boolean = true
) => {
  if (showError) {
    dispatch(
      appActions.setAppErrorAC({
        error: data.messages.length ? data.messages[0] : "Some error occurred",
      })
    );
  }
};
