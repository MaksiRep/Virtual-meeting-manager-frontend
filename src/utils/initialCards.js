const newYear = new URL('https://restoranoka.ru/wp-content/uploads/2020/10/Idealnyy-korporativ-na-Novyy-God-kakoy-on-1.jpg', import.meta.url);
const mediana = new URL('https://sun9-12.userapi.com/impg/bwo1fT4l26LO3_ISqztGKoUmfi02WtbAU1wMMQ/Qb9jCXsyz_I.jpg?size=1527x2160&quality=95&sign=e5be688799d2d4cf5a334e1ff8b0fd91&type=album', import.meta.url);
const subbotnik = new URL('https://tsaritsyno-museum.ru/uploads/2023/03/Subbotnik_2-1080x720.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Новогодний корпоратив компании большой компании большой компании большой большой компании большой большой большой компании большой',
        link: newYear,
        startDate: '31.12.23',
        endDate: '02.01.23',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Vel pharetra vel turpis nunc eget lorem dolor. Risus quis varius quam quisque id diam vel quam. Elit scelerisque mauris pellentesque pulvinar. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Et egestas quis ipsum suspendisse ultrices. Sed arcu non odio euismod lacinia. Dictum non consectetur a erat nam at lectus urna. Netus et malesuada fames ac turpis egestas. Sodales ut etiam sit amet nisl. Vitae proin sagittis nisl rhoncus mattis rhoncus.',
        willGo: true,
        owner: {
            name: 'Виктор Баклажанов',
            email: 'victorbaklazhan@gmail.com',
            phone: '+7-913-875-34-87'
        },
        _id: 1
    },
    {
        name: 'Медиана ФИТ',
        link: mediana,
        startDate: '10.04.24',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Vel pharetra vel turpis nunc eget lorem dolor. Risus quis varius quam quisque id diam vel quam. Elit scelerisque mauris pellentesque pulvinar. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Et egestas quis ipsum suspendisse ultrices. Sed arcu non odio euismod lacinia. Dictum non consectetur a erat nam at lectus urna. Netus et malesuada fames ac turpis egestas. Sodales ut etiam sit amet nisl. Vitae proin sagittis nisl rhoncus mattis rhoncus. Justo laoreet sit amet cursus. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. A pellentesque sit amet porttitor eget. Purus gravida quis blandit turpis cursus. Ipsum consequat nisl vel pretium lectus quam id leo in. Pharetra pharetra massa massa ultricies. Faucibus purus in massa tempor nec feugiat nisl pretium. Euismod lacinia at quis risus sed vulputate odio ut. Augue eget arcu dictum varius duis at consectetur lorem. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Ornare lectus sit amet est placerat in egestas erat. Fermentum posuere urna nec tincidunt praesent semper.',
        willGo: true,
        owner: {
            name: 'Максим Максимов',
            email: 'maksimov@gmail.com',
            phone: '+7-919-365-78-90'
        },
        _id: 2
    },
    {
        name: 'Субботник',
        link: subbotnik,
        startDate: '28.10.23',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames. Viverra tellus in hac habitasse.',
        willGo: false,
        owner: {
            name: 'Ольга Овулева',
            email: 'olgaovul@gmail.com',
            phone: '+7-913-943-65-11'
        },
        _id: 3
    }
]