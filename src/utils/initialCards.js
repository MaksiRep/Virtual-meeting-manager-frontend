const newYear = new URL('https://restoranoka.ru/wp-content/uploads/2020/10/Idealnyy-korporativ-na-Novyy-God-kakoy-on-1.jpg', import.meta.url);
const mediana = new URL('https://sun9-12.userapi.com/impg/bwo1fT4l26LO3_ISqztGKoUmfi02WtbAU1wMMQ/Qb9jCXsyz_I.jpg?size=1527x2160&quality=95&sign=e5be688799d2d4cf5a334e1ff8b0fd91&type=album', import.meta.url);
const subbotnik = new URL('https://tsaritsyno-museum.ru/uploads/2023/03/Subbotnik_2-1080x720.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Новогодний корпоратив',
        link: newYear,
        date: '31.12.2023'
    },
    {
        name: 'Медиана ФИТ',
        link: mediana,
        date: '10.04.24'
    },
    {
        name: 'Субботник',
        link: subbotnik,
        date: '28.10.23'
    }
]