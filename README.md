# Кино

Кино - web-приложение, созданное для поиска фильмов и просмотра информации о них. Проект разработан в рамках тестового задания на стажировку. В качестве API было использовано [API Кинопоиска](https://kinopoisk.dev/).

## Содержание

1. [О проекте](#part_1)
2. [Технологии](#part_2)
3. [Запуск проекта](#part_3)

## 1. О проекте <a name="part_1"></a>

Данное SPA-приложение состоит из двух страниц: списка фильмов и карточки фильма. Проект имеет адаптивный дизан, что позволяет комфортно пользоваться сервисом как с ПК, так и с телефона или планшета.

**Страница списка фильмов** содержит фильтры, определяющие параметры подборки фильмов, а такж сам список фильмов. При изменении фильтров, их значения сохраняются в _query-параметрах_, что позволяет сохранять состояния фильтров и делиться ссылками без потери контекста. При рендере списка фильмов используется технология _виртуализации_, позволяющая хранить в DOM только те фильмы, которые видны на странице в данный момент, что существенно оптимизирует приложение.

**Страница фильма** содержит подробную информацию о самом фильме. Помимо основных свойств, она включает в себя _отзывы_ о фильме и _похожие фильмы_, если таковые имеются.

**Поиск.** В хедере есть поле поиска, которе используется для поиска фильма по названию. Реализовано сохранение истории, что позволяет пользователю заново не искать фильм, который он уже нашел. При вводе используется _debounce_, что позволяет не отправлять запрос на каждый введенный символ.

## 2. Технологии <a name="part_2"></a>

- Проект написан на связке **React + TypeScript**, в качестве сборщика используется **Webpack**.
- Для хранения состояния был выбран стейт-менеджер **Redux**.
- Стили написаны на **SCSS Modules**.
- В проекте используется **yarn** в качестве пакетного менеджера.
- Для отправки запросов к API использовал **axios**. Это также позволило реализовать повторную отправку запроса, если ответ не пришел в течение n секунд.
- Для написания виртуализованного списка использовал **react-window**.
- Функции и компоненты обернуты в **useCallback** и **useMemo**, что позволяет оптимизировать работу приложения.
- Проект задеплоен на [GitHub Pages]().

## 3. Запуск проекта <a name="part_3"></a>

1. Склонировать репозиторий.
2. Установить зависимости командой `yarn install`.
3. Запустить приложение командой `yarn run dev`.
4. Проект будет запущен на http://127.0.0.1:8000/.

## Связь со мной

- [ВК](https://vk.com/driveronlips)
- [Telegram](https://t.me/driver_on_lips)
