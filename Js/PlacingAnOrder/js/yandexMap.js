ymaps.ready(init);
function init() {
    let map = new ymaps.Map("map", {
        center: [54.1961, 37.6182],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    map.events.add('click', function(e) {
       let coords = e.get('coords'); //Координаты клика на карте

        // Создание маркера
        let placemark = new ymaps.Placemark(coords, {
            hintContent: coords.join(', ') //Подсказка с координатами точки
        });
        map.geoObjects.add(placemark);
    });
}


