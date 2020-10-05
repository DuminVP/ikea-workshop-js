// получение данных

const getResponse = async (url) => {
    const response =  await fetch(url);  // ответ от сервера
    if (!response.ok) { // ответ от сервера
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }
    return response.json();
};

//const data = getResponse('https://jsonplaceholder.typicode.com/todos/1').then((data) => console.log(data))
//const data = getResponse('database/dataBase.json').then((data) => console.log(data))

// отправка данных

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    })
    if (!response.ok) { // ответ от сервера
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }
    return await response.json();
};
