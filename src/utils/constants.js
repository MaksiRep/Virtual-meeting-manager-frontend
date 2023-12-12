export const recoveryBtnDefault = 'Отправить';
export const recoveryBtn = 'Отправление...';
export const saveBtnDefault = 'Сохранить';
export const saveBtn = 'Сохранение...';
export const editPopupStyle = 'popup-form__container';
export const createMeetingTitle = 'Создание мероприятия';
export const editMeetingTitle = 'Изменение мероприятия';
export const baseUrl = 'https://virtual-meeting-manager.af-dev.ru/api';
export function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate();
    return year + '-' + month + '-' + date;
}
export const getDateFormat = (date) => {
    const dateTemp = date.split('-');
    return dateTemp[2].slice(0, 2) + '.' + dateTemp[1] + '.' + dateTemp[0].slice(-2);
}
export const baseMeetingsRequest = {
    skip: 0,
    take: 30,
}
export const authMessageSuccess = {
    img: 'success',
    title: 'Вы успешно зарегистрировались!'
};

export const authMessageFailure = {
    img: 'failure',
    title: 'Что-то пошло не так! Попробуйте ещё раз.'
};
