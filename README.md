# -smoothScroling
Эта конструкция позволяет перемещатся к выбранному элементу на странице, кликнув на один из пунктов меню

Когда мышь наведена на элемент, подсвечивается данный пункт меню

Пример: https://jsfiddle.net/igarok88/p916he2a/2/

В HTML нужному пункту меню присваиваем класс '.menu__link' и атрибут data-goto, со значением, которое позволяет найти элемент. 
Например пункт меню с аттрибутом data-goto=".page__section-1" будет искать на странице элемент с классом ".page__section-1" и т.д.

В JS файле, для переменной header находим элемент header и присваиваем его, в нашем случае элемент header находим по тегу header.
В переменную sections присваиваем массив из всех элементов с классом ".page__section"
